"use client";

import ResultPage from "../../../components/dashbord/ResultPage";
import FormPage from "../../../components/findPlan/findForm";
import { useState } from "react";


export default function ResPage() {
  const [results, setResults] = useState<any[]>([]); // State to store results

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left: Results */}
      <div className="flex-1 bg-white overflow-y-auto">
        <ResultPage results={results} />
      </div>

      {/* Right: Search Form */}
      <div className="w-1/3 bg-gray-50 p-6 overflow-y-auto mt-11">
        <FormPage setResults={setResults} />
      </div>
    </div>
  );
}
