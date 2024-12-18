"use client";

import React, { useState } from "react";

const FormPage = () => {
  // State for form inputs
  const [projectName, setProjectName] = useState("");
  const [planArt, setPlanArt] = useState([]);
  const [plainhalt, setPlainhalt] = useState("");
  const [leistungsphase, setLeistungsphase] = useState("");
  const [massstab, setMassstab] = useState("");
  const [offeneSuche, setOffeneSuche] = useState("");

  // Options for Planart
  const planArtOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      projectName,
      planArt,
      plainhalt,
      leistungsphase,
      massstab,
      offeneSuche,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bauplan finden</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Projektname */}
        <div>
          <label className="block text-gray-700 mb-1">Projektname</label>
          <input
            type="text"
            placeholder="Projektname"
            className="w-full border p-2 rounded"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        {/* Planart Multi-Select */}
        <div>
          <label className="block text-gray-700 mb-1">Planart</label>
     
        </div>

        {/* Plainhalt */}
        <div>
          <label className="block text-gray-700 mb-1">Plainhalt</label>
          <input
            type="text"
            placeholder="Plainhalt"
            className="w-full border p-2 rounded"
            value={plainhalt}
            onChange={(e) => setPlainhalt(e.target.value)}
          />
        </div>

        {/* Leistungsphase */}
        <div>
          <label className="block text-gray-700 mb-1">Leistungsphase</label>
          <input
            type="text"
            placeholder="Leistungsphase"
            className="w-full border p-2 rounded"
            value={leistungsphase}
            onChange={(e) => setLeistungsphase(e.target.value)}
          />
        </div>

        {/* Maßstab */}
        <div>
          <label className="block text-gray-700 mb-1">Maßstab</label>
          <input
            type="text"
            placeholder="Maßstab"
            className="w-full border p-2 rounded"
            value={massstab}
            onChange={(e) => setMassstab(e.target.value)}
          />
        </div>

        {/* Offene Suche */}
        <div>
          <label className="block text-gray-700 mb-1">Offene Suche</label>
          <input
            type="text"
            placeholder="Offene Suche"
            className="w-full border p-2 rounded"
            value={offeneSuche}
            onChange={(e) => setOffeneSuche(e.target.value)}
          />
        </div>

   
      </form>
    </div>
  );
};

export default FormPage;
