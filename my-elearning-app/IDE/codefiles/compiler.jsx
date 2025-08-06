import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { autocompletion } from "@codemirror/autocomplete";
import { Play, Code, Coffee } from "lucide-react";

const languageOptions = [
  { id: 63, name: "JavaScript (Node.js)", extension: javascript },
  { id: 71, name: "Python 3", extension: python },
];

export default function CodeEditor() {
  const [code, setCode] = useState("# Write your Python or JS code here");
  const [languageId, setLanguageId] = useState(71);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const currentLang = languageOptions.find((lang) => lang.id === languageId);

  const runCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("http://localhost:3000/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
        }),
      });

      const data = await response.json();

      if (data.stdout) {
        setOutput(atob(data.stdout));
      } else if (data.stderr) {
        setOutput(atob(data.stderr));
      } else if (data.compile_output) {
        setOutput(atob(data.compile_output));
      } else {
        setOutput("No output received.");
      }
    } catch (error) {
      setOutput("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen transition-all duration-500 ease-in-out px-0 sm:px-0 lg:px-0 "
      style={{
        backgroundColor: "#dad9e8",
        backgroundImage: `
         
          linear-gradient(to right, #3b82f6 0%, #60a5fa 100%),
          radial-gradient(circle at 30% 50%, rgba(255,255,255,0.05), transparent 60%)
        `,
        backgroundBlendMode:"overlay",
        
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
       
      }}
    >
      <div className="gap-10 relative "

      >
       <img src="/public/images/StockCake-Coding Coffee Break_1754419391.jpg"
                      style={{position:"absolute", height:"600px",width:"100%",margin:0,backgroundBlendMode:"overlay"}} alt="" />     
         <div className="container mx-auto max-w-7xl py-4 sm:py-6 lg:py-8"
>
        {/* Animated Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in  abs"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6   ">
            <div className="flex items-center gap-2 sm:gap-4 absolute">
              <Coffee className="w-12 h-6 sm:w-8 md:w-12 lg:w-12 lg:h-12 text-amber-400 animate-bounce " />
              <h1
                className="font-extrabold text-transparent bg-clip-text animate-gradient-text leading-tight tracking-tight text-10xl sm:text-3xl md:text-12xl lg:text-12xl"
                style={{
                  backgroundImage:
                    
                    "linear-gradient(270deg, #3b82f6, #60a5fa, #2563eb, #1d4ed8, #3b82f6)",
                    
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize:"36px",
                  
                }}
              >
                Coffee and Code
              </h1>
              <Code className="w-6 h-6 sm:w-12 md:w-12 lg:w-10 lg:h-12 text-blue-700 animate-pulse " />
            </div>
          </div>
        </div>
        
        {/* Main Editor Container */}
         
        <div className= " relative bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-3xl hover:bg-white/20">
                
          {/* Language Selector */}
          <div className="mb-6 sm:mb-8 ">
            
                    
                        
            <label 
              className="inline-block text-sm font-bold mb-3 px-3 py-2 text-blue-950 rounded-lg"
              style={{
                backgroundColor: "#aeaeae",
              }}
            >
              Choose Language
            </label>
            <div className="mt-3">
              <select
                value={languageId}
                onChange={(e) => setLanguageId(Number(e.target.value))}
                style={{ backgroundColor: "#a2adb6", color: "#ffffff" }}
                className="w-1/2 sm:w-auto min-w-0 sm:min-w-64 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-white/20 backdrop-blur-sm text-gray-900 font-bold transition-all duration-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              >
                {languageOptions.map((lang) => (
                  <option key={lang.id} value={lang.id} className="text-gray-900 bg-slate-600 font-bold">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
          </div>

      </div>
     
          {/* Code Editor */}
          <div className="mb-6 sm:mb-8">
            <label className="inline-block text-lg font-bold mb-4 py-2 px-3 bg-slate-600 text-white rounded-lg">
              Code Editor
            </label>
            <div
              className="rounded-xl overflow-hidden border-2 border-white/20 transition-all duration-300 hover:border-white/40 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/50 shadow-lg"
              style={{ backgroundColor: "#60a5fa" }}
            >
              <CodeMirror
                value={code}
                height="400px"
                className="text-lg sm:text-xl"
                extensions={[currentLang.extension(), autocompletion()]}
                onChange={(value) => setCode(value)}
                theme="dark"
                style={{
                  fontSize: '18px'
                }}
              />
            </div>
          </div>

          {/* Run Button */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <button
              onClick={runCode}
              disabled={loading}
              className={`
                group px-6 sm:px-8 lg:px-10 py-3 sm:py-4 w-full sm:w-auto max-w-sm rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400/50 flex items-center justify-center text-sm sm:text-base lg:text-lg
                ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                }
              `}
            >
              {loading ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Running...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-4">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                  <span>Run Code</span>
                </div>
              )}
            </button>
          </div>

          {/* Output Area */}
          <div>
            <label className="inline-block text-sm font-bold text-white mb-3 px-3 py-2 bg-gray-700 rounded-lg">
              Output
            </label>
            <div
              className="rounded-xl p-4 sm:p-6 min-h-[150px] sm:min-h-[200px] border-2 border-white/20 transition-all duration-300 hover:border-white/40 shadow-inner overflow-auto"
              style={{ backgroundColor: "#e7e8d9" }}
            >
              <pre className="text-gray-800 font-bold text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">
                {output || "Output will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-text {
          animation: gradient-shift 8s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .cm-editor {
          border-radius: 12px;
        }

        .cm-focused {
          outline: none !important;
        }

        /* Mobile-specific adjustments */
        @media (max-width: 640px) {
          .cm-editor {
            font-size: 16px !important;
          }
          
          .cm-content {
            padding: 12px !important;
          }
          
          .cm-line {
            padding: 0 4px !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 641px) and (max-width: 1024px) {
          .cm-editor {
            font-size: 18px !important;
          }
        }

        /* Desktop adjustments */
        @media (min-width: 1025px) {
          .cm-editor {
            font-size: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}