'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

const ResultPage = () => {
 
  const searchParams = useSearchParams();
  const data = searchParams.get("data"); // Get data from query string

  // Parse the data if it's available
  const parsedData = data ? JSON.parse(data) : null;

  return (
    <div className="relative w-full h-full">
      {/* Top Right Header */}
      <div className="absolute top-0 left-0 p-6 text-left">
  <h1 className="text-3xl font-bold mb-2">Ergebnisse</h1>
  <p className="text-gray-500">
    {parsedData?.length || 0} Pläne gefunden
  </p>
</div>


      {/* Centered Content */}
      <div className="flex items-center justify-center h-full">
        {parsedData ? (
          <div>
            {/* Example: Render parsedData */}
            {/* <pre>{JSON.stringify(parsedData, null, 2)}</pre> */}
          </div>
        ) : (
          <p className="text-[32px] font-normal leading-40 text-center">No results found</p>
        )}
      </div>
    </div>
  );
};


export default ResultPage;
