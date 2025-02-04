import React, { useState, useEffect, useCallback } from 'react';
import { RingLoader } from 'react-spinners';
import { FaTimes } from 'react-icons/fa';
import Testcase from './Testcase';
import Chip from './Chip';
import { getAISuggestions } from '../Api';
import { ShimmerThumbnail } from "react-shimmer-effects";
const Output = ({ code, resp, iserr, isLoading, isRun, setRun, testcase, testCasepassed, totalTestCases }) => {
  const sampleTestCases = testcase.filter(tc => tc.status === "sample");
  const [selectedChip, setSelectedChip] = useState(sampleTestCases[0]?.tid);
  const [currentTestCase, setCurrentTestCase] = useState(sampleTestCases[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  const suggestionsetter = async (code) => {
    setIsFetchingSuggestions(true);
    try {
      const data = await getAISuggestions(code);
      const suggestionText = data.candidates[0]?.content?.parts[0]?.text;
      setSuggestions(suggestionText || "No suggestions available.");
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      setSuggestions("Failed to fetch suggestions.");
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  const handleChipClick = useCallback((testcase_no, index) => {
    setSelectedChip(testcase_no);
    setCurrentTestCase(sampleTestCases[index]);
    setCurrentIndex(index);
  }, [sampleTestCases]);

  useEffect(() => {
    if (sampleTestCases.length > 0) {
      handleChipClick(sampleTestCases[currentIndex].tid, currentIndex);
    }
  }, [currentIndex, sampleTestCases, handleChipClick]);

  const formatSuggestions = (text) => {
    if (typeof text !== 'string') return "";
    return `<ul>${text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*\s/g, "<li>")  // Handle list items
      .replace(/\n/g, "<br/>")
      .replace(/<\/li><br\/>/g, "</li><br/><li>")}</ul>`;
  };

  return (
    <div
      className={`bg-slate-800 w-full absolute z-50 md:bottom-0 -bottom-8 p-10 rounded-t-2xl shadow-sm transition-transform duration-300 ${isRun ? 'translate-x-0' : 'translate-x-full'} custom-scrollbar-hidden output-container`}
    >
      {/* Header */}
      <div className="flex flex-row justify-between my-2">
        <p className="text-white font-bold text-2xl">Output</p>
        <FaTimes
          className="hover:text-orange-400 text-white cursor-pointer"
          size={30}
          onClick={() => setRun(false)}
        />
      </div>

      {/* Test Case Status */}
      <div className="text-lg text-slate-400">
        {"Testcases passed: " + testCasepassed + "/" + totalTestCases}
      </div>

      {/* Result Message */}
      {!isLoading && (
        <div className="mt-2">
          {testCasepassed === totalTestCases ? (
            <h1 className="text-green-500 font-semibold text-xl">Congratulations!</h1>
          ) : (
            <h1 className="text-red-500 text-xl font-semibold">Wrong Answer</h1>
          )}
        </div>
      )}

      {/* AI Suggestions Section */}
      <div className="mt-4">
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none"
          onClick={() => {
            if (!showAISuggestions) suggestionsetter(code);
            setShowAISuggestions(!showAISuggestions);
          }}
        >
          {showAISuggestions ? "Hide AI Suggestions" : "Show AI Suggestions"}
        </button>

        {showAISuggestions && (
          <div className="mt-2 p-4 bg-slate-700 rounded-md text-white">
            <h2 className="text-lg font-bold text-orange-400">AI Suggestions:</h2>
            {isFetchingSuggestions ? (
              <div className="mt-4 animate-pulse opacity-70">
                <ShimmerThumbnail height={250} rounded />
              </div>
            ) : (
              <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: formatSuggestions(suggestions) }}
                style={{
                  height: '7rem', 
                  overflowY: 'scroll', 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Test Case Selector (Chips) */}
      <div className="scroll-hidden flex gap-2 text-white">
        {sampleTestCases.map((t, index) => (
          <Chip
            ispass={t.iscorrect}
            key={t.tid}
            testcase_no={index + 1}
            isSelected={selectedChip === t.tid}
            onClick={() => handleChipClick(t.tid, index)}
          />
        ))}
      </div>

      {/* Display Current Test Case */}
      {currentTestCase && <Testcase tcase={currentTestCase} />}
    </div>
  );
};

export default Output;
