'use client';

import { useSearchParams } from 'next/navigation';
import  { useState, useEffect } from 'react';
import { getPlan } from '../../api/plan/plan';
import { useRouter } from "next/navigation";


const ResultPage = ({ results }: { results: any }) => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  console.log("results.metadata",results);


  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const metadata = Array.isArray(results) ? results : results?.metadata || [];
        console.log("results page res",results)

        console.log("metadata",metadata)
        if (metadata.length === 0) {
          console.warn("No metadata available.");
          return;
        }
  
        // Get unique plan IDs
        const uniqueParsedData = Array.from(
          new Set(metadata.map((element: any) => element.planId))
        )
          .map((planId) => metadata.find((element: any) => element.planId === planId))
          .filter((element) => element !== undefined);
  
        console.log("Unique Parsed Data:", uniqueParsedData);
  
        // Fetch plans
        const plans = await Promise.all(
          uniqueParsedData.map(async (element: any) => {
            const data = await getPlan(element.planId);
            console.log(`Fetched plan for planId ${element.planId}:`, data);
            return data;
          })
        );
  
        if (plans.length > 0) {
          setPlans(plans);
        } else {
          console.warn("No plans fetched.");
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    };
  
    fetchPlanData();
  }, [results]);
  
  
  
  return (
    <div className="relative w-full min-h-screen  bg-white p-6">
      {/* Top Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Ergebnisse</h1>
        <p className="text-gray-500">{plans.length || 0} Pläne gefunden</p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.length > 0 ? (
          plans.map((plan) => (
            <div
              key={plan.id}
              className={`border ${
                selectedPlan === plan.id ? "border-blue-500" : "border-gray-300"
              } rounded-lg shadow hover:shadow-lg p-4 relative`}
              onClick={() => setSelectedPlan(plan.id)}
            >
            
                <img
                  src={plan.imageUrl || "/plan-placeholder.png"}
                  alt={plan.title || "Plan image"}
                  className="w-full h-40 object-cover rounded-md"
                />
              
              <h3 className="text-lg font-bold mt-4">{plan.title || `Plan ${plan.id}`}</h3>
              <p className="text-sm text-gray-600 mt-2">
                {plan.description ||       "Lorem ipsum dolor sit amet consectetur. At amet pellentesque consectetur eu. Faucibus euismod ut mauris sed accumsan fusce tortor ipsum feugiat."}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  RECOMMEND
                </button>
                <button className="text-gray-500 hover:text-gray-800">
                  <i className="fas fa-bookmark"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg font-medium text-center col-span-full">
            No results found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
