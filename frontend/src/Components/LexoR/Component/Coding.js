import React, { useState, useRef, useEffect, useContext } from "react";
import Ide from "./widgets/Ide";
import Question from "./widgets/Question";
import { executeCode, getTestcaseById, savecode, getSnippetById } from "./Api";
import { useParams } from "react-router";
import { UserContext } from "../../../App"; // Import context


function Coding() {  
  const loginId  = localStorage.getItem('loginid'); // Use loginId directly from context
  const { pblm_id } = useParams();
  const [qid, setqid] = useState(pblm_id);
  const [value, setValue] = useState("");
  const [Language, setLanguage] = useState("java");
  const editorRef = useRef();
  const [resp, setResp] = useState(null);
  const [isErr, setErr] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isRun, setRun] = useState(false);
  const [testcase, setTestcase] = useState([]);
  const [result, setResult] = useState([]);
  const [testCasepassed, setTestcasepassed] = useState(0);
  const [totalTestCases, setTotalTestCases] = useState(0);
  const [solved, setSolved] = useState(false);
  const { NavHeight } = useContext(UserContext);

  useEffect(() => {
    const fetchCases = async () => {
      const temp = await getTestcaseById(qid);
      setTestcase(temp);
      setTotalTestCases(temp.length);
      
      try {
        const val = await getSnippetById(qid, Language);
        setValue(val.snippets);
      } catch (e) {
        setValue(Language === "python" ? "# write your code" : "// write your code");
      }
    };
  
    fetchCases();
  }, [qid, Language]);

  const compile = async (sourceCode, cmdargs) => {
    try {
      const res = await executeCode(Language, sourceCode, cmdargs);
      if (res.run.code === 0) {
        setErr(false);
        return res;
      } else {
        setErr(true);
        return res;
      }
    } catch (err) {
      setErr(true);
      console.error(err);
    }
  };

  const runCode = async () => {
    setRun(false);
    setTestcasepassed(0);
    setRun(true);
    setLoading(true);
    
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      setLoading(false);
      return;
    }

    const results = [];
    let localPassed = 0;
    
    for (const element of testcase) {
      const tempObj = { ...element, output: "", err: false, iscorrect: false };

      try {
        const resp = await compile(sourceCode, element.tinput);
        tempObj.output = resp.run.output;
        tempObj.iscorrect = tempObj.output.trim() === element.toutput.trim();
        
        if (tempObj.iscorrect) {
          localPassed++;
          setTestcasepassed(localPassed);
        }
      } catch (error) {
        console.error(error);
        tempObj.err = true;
        setErr(true);
      }

      results.push(tempObj);
    }

    setResult(results);
    setLoading(false);
    setRun(true);

    if (localPassed === totalTestCases) {
      console.log("Saving code:", { Language, value, qid, userId: loginId });
      await savecode(Language, value, qid, loginId, true);
      setSolved(true);
      console.log("Saved the code");
    }
  };

  return (
    <div className="min-w-screen bg-slate-900" style={{paddingTop: NavHeight}}>
      <div className="flex flex-col md:flex-row h-screen md:overflow-hidden">
        <div className="flex-1 border-gray-200 md:border-b-0">
          <Question qid={qid} testcase={testcase} solved={solved} setSolved={setSolved}/>
        </div>
        <div className="flex-1 h-full bg-slate-600">
          <Ide
            value={value}
            setValue={setValue}
            Language={Language}
            solved={solved} 
            setSolved={setSolved}
            qid={qid}
            setLanguage={setLanguage}
            editorRef={editorRef}
            totalTestCases={totalTestCases}
            runCode={() => {
              runCode();
              setResult([]);
            }}
            resp={resp}
            isErr={isErr}
            isLoading={isLoading}
            isRun={isRun}
            setLoading={setLoading}
            setRun={setRun}
            testcase={result}
            settestcase={setTestcase}
            testCasepassed={testCasepassed}
          />
        </div>
      </div>
    </div>
  );
}

export default Coding;
