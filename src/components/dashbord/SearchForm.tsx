"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchWithProject } from '../../api/search/search-api';

const SearchForm = () => {
  const [projectName, setProjectName] = useState('');
  const [planType, setPlanType] = useState('');
  const [planContent, setPlanContent] = useState('');
  const [workPhase, setWorkPhase] = useState('');
  const [scale, setScale] = useState('');
  const [openSearch, setOpenSearch] = useState('');

  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call SearchWithProject with project name
      const data = await SearchWithProject(projectName);
      if (data === null) {
        console.log('Project not found');
        // You can display a message or handle the absence of project here
      } else {
        console.log('Project found:', data);
        // Proceed with displaying the project metadata
      }
      // Use router.push() with a proper URL
      const queryParams = new URLSearchParams();
      const dataLength = data ? data.length : 0; // If data is not null, get length, otherwise 0

      queryParams.set('data', JSON.stringify(data));

      // Navigate to the result page with the data as a query string
      router.push(`/result?${queryParams.toString()}`);
       
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Bauplan finden</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Projektname"
          className="w-full border p-2 rounded"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Planart"
          className="w-full border p-2 rounded"
          value={planType}
          onChange={(e) => setPlanType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Plainhalt"
          className="w-full border p-2 rounded"
          value={planContent}
          onChange={(e) => setPlanContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Leistungsphase"
          className="w-full border p-2 rounded"
          value={workPhase}
          onChange={(e) => setWorkPhase(e.target.value)}
        />
        <input
          type="text"
          placeholder="Maßstab"
          className="w-full border p-2 rounded"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
        />
        <input
          type="text"
          placeholder="Offene Suche"
          className="w-full border p-2 rounded"
          value={openSearch}
          onChange={(e) => setOpenSearch(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          GENERATE
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
