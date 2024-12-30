"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getPlantType, getProjects } from "../../api/project/project";
import { SearchWithProject } from "../../api/search/search-api";

import { projectPlanData } from "../data/planart";
import { projectPlainhaltData } from "../data/planinhalt"; 
import {projectMassstabData } from "../data/maßstab"; 
import {projectPhaseData} from "../data/phase";
import { searchWithKeyValue } from "../../api/plan/plan";
import { GetMetaData } from "../../api/metaData/metadata";

// Dynamically import MultiSelectInput without SSR
const MultiSelectInput = dynamic(() => import('../dashbord/MultiSelectInput'), { ssr: false });


const FormPage =  ({ setResults }: { setResults: (data: any[]) => void })=> {
  const searchParams = useSearchParams();
  type SelectOption = {
    value: string;
    label: string;
    img?: string;
    subTitle?: string;
  };
  
   /* Value */
   const [projectName, setProjectName] = useState<SelectOption[]>([]);
   const [planType, setPlanType] = useState<SelectOption[]>([]);
   const [planinhaltType, setPlaninhaltType] = useState<SelectOption[]>([]);
   const [phaseType, setphaseType] = useState<SelectOption[]>([]);
   const [massstabType, setmassstabType] = useState<SelectOption[]>([]);
 
   const [metadata, setMetadata] = useState<string[] | null>(null);
   const [metaDataOptions, setMetaDataOptions] = useState<Record<string, SelectOption[]>>({});
   const [metadataSelections, setMetadataSelections] = useState<Record<string, SelectOption[]>>({});

   /* Options */
   const [projectOptions, setProjectOptions] = useState<SelectOption[]>([]);
   const [planinhaltOptions, setPlaninhaltOptions] = useState<SelectOption[]>([]);
   const [projectPlanOptions, setProjectPlanOptions] = useState<SelectOption[]>([]);
   const [projectmassstabOptions, setmassstabOptions] = useState<SelectOption[]>([]);
   const [projectphaseOptions, setphaseptions] = useState<SelectOption[]>([]);
   const [openSearch, setOpenSearch] = useState<SelectOption[]>([]);

  const router = useRouter();

// Extract selected values from URL query params
const projectNameSelected = searchParams.getAll("projectName");
const phaseSelected = searchParams.getAll("phase");
const massstabSelected = searchParams.getAll("scale");
const planTypeSelected = searchParams.getAll("planType");
const planContentSelected = searchParams.getAll("planContent");


// Helper function to map query param values to the state format
const mapToStateFormat = (selectedValues: any) => {
  return selectedValues.map((value:any) => ({ value, label: value }));
};

// Set the initial values based on query params
useEffect(() => {
  if (projectNameSelected.length) {
    setProjectName(mapToStateFormat(projectNameSelected));
  }
}, []);

useEffect(() => {
  if (phaseSelected.length) {
    setphaseType(mapToStateFormat(phaseSelected));
  }
}, []);

useEffect(() => {
  if (massstabSelected.length) {
    setmassstabType(mapToStateFormat(massstabSelected));
  }
}, []);

useEffect(() => {
  if (planTypeSelected.length) {
    setPlanType(mapToStateFormat(planTypeSelected));
  }
}, []);

useEffect(() => {
  if (planContentSelected.length) {
    setPlaninhaltType(mapToStateFormat(planContentSelected));
  }
}, []);


  // Fetch project names when the component mounts
  useEffect(() => {
    async function fetchProjectNames() {
      try {
        const projectNames = await getProjects(); // Adjust getProjects if needed
        const options = projectNames.map((name: string) => ({
          value: name,
          label: name,
        }));
        console.log("projectNames", projectNames);
        setProjectOptions(options);
      } catch (error) {
        console.error("Error fetching project names:", error);
      }
    }

    fetchProjectNames();
  }, []);

 /* Get Plan options  */
 useEffect(() => {
  // Map JSON data to match MultiSelectInput format
  const options: SelectOption[] = projectPlanData.map((item) => ({
    value: item.label || "", // Ensure value is always a string
    label: item.label || "No Label", // Handle empty labels
  }));
  setProjectPlanOptions(options);
}, []);


/* Get Plainhalt options  */
useEffect(() => {
  // Map JSON data to match MultiSelectInput format
  const options: SelectOption[] = projectPlainhaltData.map((item) => ({
    value: item.label || "", // Ensure value is always a string
    label: item.label || "No Label", // Handle empty labels
  }));
  setPlaninhaltOptions(options);
}, []);


 /* Get massstab options  */
 useEffect(() => {
  // Map JSON data to match MultiSelectInput format
  const options: SelectOption[] = projectMassstabData.map((item) => ({
    value: item.label || "", // Ensure value is always a string
    label: item.label || "No Label", // Handle empty labels
  }));
  
  setmassstabOptions(options);
}, []);


 /* Get phase options  */
 useEffect(() => {
  // Map JSON data to match MultiSelectInput format
  const options: SelectOption[] = projectPhaseData.map((item) => ({
    value: item.label || "", // Ensure value is always a string
    label: item.label || "No Label", // Handle empty labels
  }));
  setphaseptions(options);
}, []);


const handleSearch = async () => {
  try {
    // Extract selected values for all filters
  const selectedPhases = phaseType.map((item) => item.value).join(",") || "";
  const selectedPlan = planType.map((item) => item.value).join(",") || "";
  const selectedPlaninhalt = planinhaltType.map((item) => item.value).join(",") || "";
  const selectedMassstab = massstabType.map((item) => item.value).join(",") || "";

  console.log("selectedPlan",selectedPlan )
  console.log("selectedPlaninhalt",selectedPlaninhalt )
  console.log("selectedMassstab",massstabType )

    const selectedProject = projectName[0]?.value || "";

    let phaseResults = [];
    let planResults = [];
    let planinhaltResults = [];
    let massstabResults = [];
    let projectResults = [];
    let finalResults = [];

    // Fetch data for each filter if a value is selected
    if (selectedPhases.length > 0) {
      const phaseData = await searchWithKeyValue("phase",selectedPhases);
      phaseResults = Array.isArray(phaseData) ? phaseData : [];
    }

    if (selectedPlan.length > 0) {
      console.log("planData",selectedPlan )

      const planData = await searchWithKeyValue("plan", selectedPlan);
      console.log("planData",planData )
      planResults = Array.isArray(planData) ? planData : [];
    }

    if (selectedPlaninhalt.length > 0) {
      const planinhaltData = await searchWithKeyValue("Planinhalt", selectedPlaninhalt);
      planinhaltResults = Array.isArray(planinhaltData) ? planinhaltData : [];
    }

    if (selectedMassstab.length > 0) {
      const massstabData = await searchWithKeyValue("Scale", selectedMassstab);
      massstabResults = Array.isArray(massstabData) ? massstabData : [];
    }

    if (selectedProject) {
      const projectData = await SearchWithProject(selectedProject);
      projectResults = Array.isArray(projectData.metadata) ? projectData.metadata : [];
    }

    // Merge results and find the intersection
    const allResults = [phaseResults, planResults, planinhaltResults, massstabResults, projectResults].filter(
      (result) => result.length > 0
    );

    if (allResults.length > 1) {
      finalResults = allResults.reduce((intersection, current) =>
        intersection.filter((item: any) => current.some((other: any) => other.id === item.id))
      );
    } else if (allResults.length === 1) {
      finalResults = allResults[0];
    }

    // Remove duplicates by `id`
    finalResults = [...new Map(finalResults.map((item:any) => [item.id, item])).values()];

    // Set results
    setResults(finalResults.length > 0 ? finalResults : []);

  } catch (error) {
    console.error("Error fetching project data:", error);
  }
};

  // Handle change for each metadata key separately
  const handleMetadataChange = (key: string, selectedOptions: SelectOption[]) => {
    setMetadataSelections((prevSelections) => ({
      ...prevSelections,
      [key]: selectedOptions,
    }));
  };



// Trigger search when projectName or phaseType changes
useEffect(() => {
  if (projectName.length > 0 || phaseType.length > 0) {
    handleSearch();
  }
}, [projectName, phaseType]);


  // Fetch metadata when a project is selected
  const handleSelectProject = async (selectedProject: any) => {
    if (!selectedProject || !selectedProject.value) return;

    try {
      const projectName = selectedProject.value;
      const response = await GetMetaData(projectName);

      if (response?.data) {
        const metadataResult = response.data[1].values; // Assuming the API response is already in the desired format
        const newMetadataOptions: Record<string, SelectOption[]> = {};

        metadataResult.forEach((item: any) => {
          if (item.values) {
            newMetadataOptions[item.label] = item!.values.map((value: { key: string; value: string }) => ({
              value: value.value,
              label: value.value,
            }));
          }
        });

        setMetadata(Object.keys(newMetadataOptions)); // Keys represent metadata labels
        setMetaDataOptions(newMetadataOptions); // Store options for each key
      } else {
        setMetadata(null);
        setMetaDataOptions({});
      }
    } catch (error) {
      console.error("Error fetching project metadata:", error);
    }
  };

   

  return (
    <div className="bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Bauplan finden</h2>
      <form className="space-y-4" >
        <MultiSelectInput
          value={projectName}
          options={projectOptions}
          placeholder="Projektname"
          instanceId="projectName"
          setValue={(value) => {
            setProjectName(value);
            handleSelectProject(value[0]);
          }}
        />
        <MultiSelectInput
          value={planType}
          setValue={setPlanType}
          options={projectPlanOptions}
          placeholder="Planart"
          instanceId="Planart"
        />

        <MultiSelectInput
          value={planinhaltType}
          setValue={setPlaninhaltType}
          options={planinhaltOptions}
          placeholder="Plainhalt"
          instanceId="Plainhalt"
        />
        <MultiSelectInput
          value={phaseType}
          setValue={setphaseType}
          options={projectphaseOptions}
          placeholder="Leistungsphase"
          instanceId="Leistungsphase"
        />
        <MultiSelectInput
          value={massstabType}
          setValue={setmassstabType}
          options={projectmassstabOptions}
          placeholder="Maßstab"
          instanceId="Maßstab"
        />
           <MultiSelectInput
          value={openSearch}
          setValue={setOpenSearch}
          options={[]}
          placeholder="Offene Suche"
          instanceId="Offene Suche"
        />
        
           {metadata &&
          metadata.map((key: string, index: number) => (
            <MultiSelectInput
              key={index}
              value={metadataSelections[key] || []}
              setValue={(value) => handleMetadataChange(key, value)}
              options={metaDataOptions[key] || []}
              placeholder={key}
              instanceId={`uniqueKey-${key}`}
            />
          ))}
      </form>
    </div>
  );
};

export default FormPage;
