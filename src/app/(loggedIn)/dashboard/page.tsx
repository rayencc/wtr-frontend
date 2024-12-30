
"use client";

import { useState } from "react";
import SearchForm from "../../../components/dashbord/SearchForm";


export default function DashboardPage() {
  const [results, setResults] = useState<any[]>([]); // State to store results

  return (
    <div className="flex items-center justify-center w-full h-full " >

      <SearchForm  setResults={setResults}  />
    </div>
  );
}
