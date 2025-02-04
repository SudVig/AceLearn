import axios from "axios"
import {LANGUAGE_VERSIONS} from "./Constants/Constant"

const API=axios.create(

   {
     baseURL: "https://emkc.org/api/v2/piston"
   } 
   
)

export const executeCode =async (language, sourceCode,cmdargs)=>
{
    const response=await API.post("/execute",{
        "language": language,
  "version": LANGUAGE_VERSIONS[language],
  "files": [
    {
      
      "content": sourceCode
    }
  ],
  "args": [cmdargs],
    })

    return response.data;
}


const DB_API=axios.create(
  {
    //  baseURL:"https://lexor-1.onrender.com/"
     baseURL:"http://127.0.0.1:8000/"
    //  baseURL:"https://95lxh9ph-8000.inc1.devtunnels.ms/"
   
  }
)




export const getProblems=async ()=>{

  const response=await DB_API.get("problems/")
  console.log(response.data);
  return response.data

}


export const getQuestion=async (qid)=>{

  const response=await DB_API.get("problems/"+qid+"/")
  console.log(response.data);
  return response.data

}

export const getTestcaseById=async (qid)=>{

  const response=await DB_API.get("testcases/"+qid+"/")
  console.log(response.data);
  return response.data

}

export const getSnippetById=async (qid,lang)=>{

  const response=await DB_API.get("snippets/"+qid+"/"+lang+"/")
  console.log(response.data);
  return response.data

}


export const savecode =async (language, sourceCode,pid,uid,issolved)=>
  {

    console.log({
      "pid":pid,
      "uid":uid,
      "code":sourceCode,
      "lang":language,
      "issolved":issolved
  });
      const response=await DB_API.post("solved/",{
          "pid":pid,
          "uid":uid,
          "code":sourceCode,
          "lang":language,
          "issolved":issolved
      })
  
      return response.data;
  }


  export const verifyUser=async (email,password)=>
  {
    const response = await DB_API.get("verify/"+email+"/"+password+"/")

    return response.data

  }


  export const createUser = async (name,email,password)=>{

    const response=await DB_API.post("user/",{
      "name":name,
      "email":email,
      "password":password
    })

    return response.data;

  }


  export const getProfileById=async (qid)=>{

    const response=await DB_API.get("profile/"+qid+"/")
    console.log(response.data);
    return response.data
  
  }


  export const getProblemswithStatus=async (uid)=>{

    const response=await DB_API.get("problem-status/"+uid+"/")
    console.log(response.data);
    return response.data
  
  }

  export const getisSolved=async (uid,pid)=>{

    const response=await DB_API.get("issolved/"+uid+"/"+pid+"/")
    
    return response.data
  
  }

  const GEMINI_API_KEY = "AIzaSyBHTnvC5tT88M5Zpi4cx5RWzi-dB8a-QIQ";

// Creating Axios instance for Gemini API
const GEMINI_API = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
});
export const getAISuggestions = async (code) => {
  try {
    const response = await GEMINI_API.post(
      `?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Please analyze the following function and provide:

1. **Time Complexity**: Estimate the time complexity (Big O notation).
2. **Space Complexity**: Estimate the space complexity.
3. **Suggestions**: Provide a one-line suggestion for improvement.

Here is the function to analyze:
${code}`,
              },
            ],
          },
        ],
      }
    );
    return response.data; // Return the AI-generated response
  } catch (error) {
    console.error("Error fetching suggestions from Gemini API:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};
