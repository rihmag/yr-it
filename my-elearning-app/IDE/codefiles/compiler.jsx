import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";
import { sql } from "@codemirror/lang-sql";
import { autocompletion } from "@codemirror/autocomplete";
import { Play, Code, Coffee, Terminal, Zap, Sparkles, FileCode, Settings } from "lucide-react";

const languageOptions = [
  { id: 63, name: "JavaScript (Node.js)", extension: javascript, color: "from-yellow-400 to-orange-500", icon: "" },
  { id: 71, name: "Python 3", extension: python, color: "from-blue-400 to-green-500", icon: "" },
  { id: 62, name: "Java", extension: java, color: "from-red-400 to-orange-500", icon: "" },
  { id: 54, name: "C++ (GCC 9.2.0)", extension: cpp, color: "from-blue-400 to-purple-500", icon: "" },
  { id: 50, name: "C (GCC 9.2.0)", extension: cpp, color: "from-gray-400 to-blue-500", icon: "" },
  { id: 51, name: "C# (Mono 6.6.0)", extension: java, color: "from-purple-400 to-blue-500", icon: "#️⃣" },
  { id: 68, name: "PHP (7.4.1)", extension: php, color: "from-purple-400 to-pink-500", icon: "" },
  { id: 73, name: "Rust (1.40.0)", extension: rust, color: "from-orange-400 to-red-500", icon: "" },
  { id: 60, name: "Go (1.13.5)", extension: go, color: "from-cyan-400 to-blue-500", icon: "" },
  { id: 72, name: "Ruby (2.7.0)", extension: python, color: "from-red-400 to-pink-500", icon: "" },
  { id: 82, name: "SQL (SQLite 3.27.2)", extension: sql, color: "from-green-400 to-blue-500", icon: "" },
  { id: 74, name: "TypeScript (3.7.4)", extension: javascript, color: "from-blue-400 to-indigo-500", icon: "" },
  { id: 78, name: "Kotlin (1.3.70)", extension: java, color: "from-purple-400 to-orange-500", icon: "" },
  { id: 83, name: "Swift (5.2.3)", extension: java, color: "from-orange-400 to-red-500", icon: "" },
];

export default function CodeEditor() {
  const [code, setCode] = useState("# Welcome to the Advanced Code Editor\n# Write your Python or JavaScript code here\n\nprint('Hello, World!')");
  const [languageId, setLanguageId] = useState(71);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const currentLang = languageOptions.find((lang) => lang.id === languageId);

  const runCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("https://backend-1-bn9o.onrender.com/compile", {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
                <Code className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x leading-tight py-4">
              Code Playground
            </h1>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse animation-delay-1000"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experience the future of coding with our advanced, interactive development environment
          </p>
        </div>

        {/* Main Editor Container */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 hover:bg-white/10 transition-all duration-500">
          
          {/* Language Selector */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-purple-400" />
              <label className="text-lg font-semibold text-white">
                Choose Your Language
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {languageOptions.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguageId(lang.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    languageId === lang.id
                      ? 'border-purple-400 bg-gradient-to-r ' + lang.color + ' shadow-lg'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.icon}</span>
                    <div className="text-left">
                      <div className={`font-semibold ${languageId === lang.id ? 'text-white' : 'text-gray-300'}`}>
                        {lang.name}
                      </div>
                      <div className={`text-sm ${languageId === lang.id ? 'text-white/80' : 'text-gray-500'}`}>
                        Ready to execute
                      </div>
                    </div>
                  </div>
                  {languageId === lang.id && (
                    <div className="absolute top-2 right-2">
                      <Zap className="w-5 h-5 text-white animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileCode className="w-5 h-5 text-blue-400" />
              <label className="text-lg font-semibold text-white">
                Code Editor
              </label>
              <div className="flex-1"></div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Ready</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-400 font-mono">
                    {currentLang.name.toLowerCase().replace(/\s+/g, '.')}.{languageId === 71 ? 'py' : languageId === 62 ? 'java' : languageId === 54 ? 'cpp' : languageId === 50 ? 'c' : languageId === 51 ? 'cs' : languageId === 68 ? 'php' : languageId === 73 ? 'rs' : languageId === 60 ? 'go' : languageId === 72 ? 'rb' : languageId === 82 ? 'sql' : languageId === 74 ? 'ts' : languageId === 78 ? 'kt' : languageId === 83 ? 'swift' : 'js'}
                  </div>
                </div>
                <CodeMirror
                  value={code}
                  height="400px"
                  className="text-lg"
                  extensions={[currentLang.extension(), autocompletion()]}
                  onChange={(value) => setCode(value)}
                  theme="dark"
                />
              </div>
            </div>
          </div>

          {/* Run Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={runCode}
              disabled={loading}
              className={`
                group relative px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 flex items-center gap-3 text-lg min-w-[200px] justify-center
                ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl"
                }
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>Run Code</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Output Area */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-green-400" />
              <label className="text-lg font-semibold text-white">
                Output Console
              </label>
              <div className="flex-1"></div>
              {output && (
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Execution Complete</span>
                </div>
              )}
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400 font-mono">console</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {output ? `${output.split('\n').length} lines` : 'Waiting for execution...'}
                  </div>
                </div>
                <div className="p-6 min-h-[200px] max-h-[400px] overflow-auto">
                  <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {output || (
                      <span className="text-gray-500 italic">
                        Output will appear here after running your code...
                        <span className="animate-pulse">|</span>
                      </span>
                    )}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
          background-size: 200% 200%;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .cm-editor {
          background: transparent !important;
        }

        .cm-focused {
          outline: none !important;
        }

        .cm-content {
          padding: 20px !important;
        }

        .cm-line {
          padding: 0 8px !important;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
}