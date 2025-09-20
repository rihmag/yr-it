import React, { useState, useRef, useEffect, useContext } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

import { cpp } from "@codemirror/lang-cpp";


import { autocompletion } from "@codemirror/autocomplete";
import { useTheme } from "../../src/contexts/ThemeContext";
import { 
  Play, 
  Code2, 
  Terminal, 
  Zap, 
  FileCode, 
  Settings, 
  ChevronDown,
  Save,
  Download,
  Upload,
  RefreshCw,
  Maximize2,
  Minimize2,
  Copy,
  Share2,
  Folder,
  File,
  Plus,
  X,
  Menu,
  Sun,
  Moon,
  Palette,
  Activity,
  Layers,
  Monitor,
  Smartphone,
  Tablet,
  RotateCcw,
  Bug,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

const languageOptions = [
  { id: 63, name: "JavaScript", fullName: "JavaScript (Node.js)", extension: javascript, color: "bg-gradient-to-r from-yellow-400 to-orange-500", icon: "", ext: "js" },
  { id: 71, name: "Python", fullName: "Python 3", extension: python, color: "bg-gradient-to-r from-blue-400 to-green-500", icon: "", ext: "py" },

  { id: 54, name: "C++", fullName: "C++ (GCC 9.2.0)", extension: cpp, color: "bg-gradient-to-r from-blue-400 to-purple-500", icon: "", ext: "cpp" },
  { id: 50, name: "C", fullName: "C (GCC 9.2.0)", extension: cpp, color: "bg-gradient-to-r from-gray-400 to-blue-500", icon: "", ext: "c" },




  { id: 72, name: "Ruby", fullName: "Ruby (2.7.0)", extension: python, color: "bg-gradient-to-r from-red-400 to-pink-500", icon: "", ext: "rb" },

  { id: 74, name: "TypeScript", fullName: "TypeScript (3.7.4)", extension: javascript, color: "bg-gradient-to-r from-blue-400 to-indigo-500", icon: "", ext: "ts" },
];

const getDefaultCode = (languageId) => {
  const codeTemplates = {
    63: `// Welcome to Yr-IT Code Playground
// JavaScript (Node.js) Environment

console.log("Hello, World! ");

// Example: Working with arrays
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);

// Example: Async function
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Data loaded!"), 1000);
    });
}

fetchData().then(console.log);`,
    71: `# Welcome to Yr-IT Code Playground
# Python 3 Environment

print("Hello, World! ")

# Example: List comprehension
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print(f"Doubled numbers: {doubled}")

# Example: Function definition
def greet(name):
    return f"Hello, {name}! Welcome to Python coding."

print(greet("Developer"))

# Example: Working with dictionaries
student = {"name": "Alice", "grade": 95}
print(f"Student: {student['name']}, Grade: {student['grade']}")`,
    62: `// Welcome to Yr-IT Code Playground
// Java Environment

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World! ");
        
        // Example: Array operations
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.print("Numbers: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // Example: Method call
        String greeting = greet("Developer");
        System.out.println(greeting);
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "! Welcome to Java coding.";
    }
}`,
    54: `// Welcome to Yr-IT Code Playground
// C++ Environment

#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    cout << "Hello, World! " << endl;
    
    // Example: Vector operations
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Numbers: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Example: String operations
    string name = "Developer";
    cout << "Hello, " << name << "! Welcome to C++ coding." << endl;
    
    return 0;
}`
  };
  
  return codeTemplates[languageId] || codeTemplates[71];
};

export default function CodeEditor() {
  const [code, setCode] = useState(getDefaultCode(71));
  const [languageId, setLanguageId] = useState(71);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [executionTime, setExecutionTime] = useState(null);
  const [executionStatus, setExecutionStatus] = useState('idle'); // idle, running, success, error
  
  const dropdownRef = useRef(null);
  const currentLang = languageOptions.find((lang) => lang.id === languageId);
  const { theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLanguageId) => {
    setLanguageId(newLanguageId);
    setCode(getDefaultCode(newLanguageId));
    setIsLanguageDropdownOpen(false);
    setOutput("");
    setExecutionStatus('idle');
    setExecutionTime(null);
  };

  const runCode = async () => {
    const startTime = Date.now();
    setLoading(true);
    setOutput("");
    setActiveTab('output');
    setExecutionStatus('running');

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
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);

      if (data.stdout) {
        setOutput(atob(data.stdout));
        setExecutionStatus('success');
      } else if (data.stderr) {
        setOutput(atob(data.stderr));
        setExecutionStatus('error');
      } else if (data.compile_output) {
        setOutput(atob(data.compile_output));
        setExecutionStatus('error');
      } else {
        setOutput("No output received.");
        setExecutionStatus('success');
      }
    } catch (error) {
      setOutput("Error connecting to backend. Please try again.");
      setExecutionStatus('error');
      setExecutionTime(null);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `code.${currentLang.ext}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearOutput = () => {
    setOutput("");
    setExecutionStatus('idle');
    setExecutionTime(null);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        
        {/* Modern Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-full px-6 py-4">
            <div className="flex items-center justify-between">
              
              {/* Left Section - Logo & Title */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                      Yr-IT Studio
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Professional Code Editor
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Section - Language Selector */}
              <div className="flex-1 max-w-md mx-8">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{currentLang.icon}</span>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {currentLang.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {currentLang.fullName}
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isLanguageDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => handleLanguageChange(lang.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl ${
                            languageId === lang.id ? 'bg-indigo-50 dark:bg-indigo-900/20 border-r-4 border-indigo-500' : ''
                          }`}
                        >
                          <span className="text-lg">{lang.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {lang.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {lang.fullName}
                            </div>
                          </div>
                          {languageId === lang.id && (
                            <CheckCircle className="w-4 h-4 text-indigo-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>







              {/* Right Section - Actions */}
              <div className="flex items-center space-x-3">











                <button
                  onClick={runCode}
                  disabled={loading}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Run Code</span>
                    </>





                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-5rem)]">
          
          {/* Sidebar */}
          <div className={`${sidebarCollapsed ? 'w-16' : 'w-72'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
            
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-2 animate-fade-in-right">
                    <Folder className="w-5 h-5 text-indigo-500 dark:text-white animate-bounce-subtle" />
                    <span className="font-semibold text-gray-900 dark:text-white">Explorer</span>
                  </div>
                )}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 transform"
                >
                  <Menu className="w-4 h-4 text-gray-600 dark:text-white" />
                </button>
              </div>
            </div>

            {/* File Explorer */}
            <div className="flex-1 p-4">
              <div className={`flex items-center space-x-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 hover:shadow-md transition-all duration-300 hover:scale-[1.02] transform animate-scale-in ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <FileCode className="w-4 h-4 text-indigo-600 dark:text-white animate-pulse-subtle" />
                {!sidebarCollapsed && (
                  <div className="flex-1 animate-fade-in-right animation-delay-200">
                    <div className="text-sm font-medium text-indigo-900 dark:text-white">
                      main.{currentLang.ext}
                    </div>
                    <div className="text-xs text-indigo-700 dark:text-gray-300">
                      Active File
                    </div>
                  </div>
                )}








              </div>
            </div>


            {/* Sidebar Footer */}
            {!sidebarCollapsed && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-800">
                <div className="space-y-2">
                  <button
                    onClick={copyCode}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-white rounded-lg transition-all duration-200 transform"
                  >
                    <Copy className="w-4 h-4 text-gray-600 dark:text-white" />
                    <span>Copy Code</span>
                  </button>
                  <button
                    onClick={downloadCode}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-white rounded-lg transition-all duration-200 transform"
                  >
                    <Download className="w-4 h-4 text-gray-600 dark:text-white" />
                    <span>Download</span>
                  </button>
                </div>








              </div>
            )}
          </div>

          {/* Editor and Output Container */}
          <div className="flex-1 flex flex-col">
            
            {/* Editor Section */}
            <div className="flex-1 flex">
              
              {/* Code Editor */}
              <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
                
                {/* Editor Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      main.{currentLang.ext}
                    </div>


                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                      executionStatus === 'idle' ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400' :
                      executionStatus === 'running' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                      executionStatus === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {executionStatus === 'idle' && <Activity className="w-3 h-3" />}
                      {executionStatus === 'running' && <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin" />}
                      {executionStatus === 'success' && <CheckCircle className="w-3 h-3" />}
                      {executionStatus === 'error' && <AlertCircle className="w-3 h-3" />}
                      <span className="capitalize">{executionStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 relative">
                  <CodeMirror
                    value={code}
                    height="100%"
                    className="h-full text-base"
                    extensions={[currentLang.extension(), autocompletion()]}
                    onChange={(value) => setCode(value)}
                    theme={theme === 'dark' ? "dark" : "light"}
                  />
                </div>
              </div>

              {/* Output Panel */}
              <div className="w-1/2 flex flex-col bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
                
                {/* Output Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center space-x-3">
                    <Terminal className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">Console</span>
                    {executionTime && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{executionTime}ms</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {output && (
                      <button
                        onClick={clearOutput}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Clear Output"
                      >
                        <RotateCcw className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Output Content */}
                <div className="flex-1 p-6 overflow-auto bg-gray-900 dark:bg-black font-mono text-sm">
                  {loading ? (
                    <div className="flex items-center space-x-2 text-blue-400">
                      <div className="w-4 h-4 border border-blue-400 border-t-transparent rounded-full animate-spin" />
                      <span>Executing code...</span>
                    </div>
                  ) : output ? (
                    <pre className={`whitespace-pre-wrap break-words ${
                      executionStatus === 'error' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {output}
                    </pre>
                  ) : (
                    <div className="text-gray-500 italic flex items-center space-x-2">
                      <Terminal className="w-4 h-4" />
                      <span>Output will appear here after running your code...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>


        <style>{`
          .cm-editor {
            background: transparent !important;
            font-size: 14px !important;
            font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace !important;

          }






          .cm-focused {
            outline: none !important;







          }










          .cm-content {
            padding: 24px !important;
            min-height: 100% !important;
            line-height: 1.6 !important;
          }

          .cm-line {
            padding: 0 8px !important;
          }

          .cm-gutters {
            background: rgba(0, 0, 0, 0.03) !important;
            border-right: 1px solid rgba(0, 0, 0, 0.08) !important;
            padding-right: 8px !important;
          }

          .dark .cm-gutters {
            background: rgba(255, 255, 255, 0.03) !important;
            border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
          }

          .cm-lineNumbers .cm-gutterElement {
            color: rgba(0, 0, 0, 0.4) !important;
            font-size: 12px !important;
          }



          .dark .cm-lineNumbers .cm-gutterElement {
            color: rgba(255, 255, 255, 0.4) !important;
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 4px;
          }

          .dark ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(99, 102, 241, 0.4);
            border-radius: 4px;
          }


          ::-webkit-scrollbar-thumb:hover {
            background: rgba(99, 102, 241, 0.6);
          }


          /* Selection styles */
          .cm-editor .cm-selectionBackground {
            background: rgba(99, 102, 241, 0.2) !important;
          }

          .dark .cm-editor .cm-selectionBackground {
            background: rgba(99, 102, 241, 0.3) !important;
          }
        `}</style>
      </div>
    </div>
  );
}