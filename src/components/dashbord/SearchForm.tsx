'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjects } from "../../api/project/project";
import dynamic from 'next/dynamic';
import { projectPlanData } from "../data/planart";
import { projectPlainhaltData } from "../data/planinhalt"; 
import { projectMassstabData } from "../data/maßstab"; 
import { projectPhaseData } from "../data/phase";
import { GetMetaData } from "../../api/metaData/metadata";

// Dynamically import MultiSelectInput without SSR
const MultiSelectInput = dynamic(() => import('./MultiSelectInput'), { ssr: false });

const SearchForm = ({ setResults }: { setResults: (data: any[]) => void }) => {
  type SelectOption = {
    value: string;
    label: string;
    img?: string;
    subTitle?: string;
  };

  // Value
  const [projectName, setProjectName] = useState<SelectOption[]>([]);
  const [planType, setPlanType] = useState<SelectOption[]>([]);
  const [planinhaltType, setPlaninhaltType] = useState<SelectOption[]>([]);
  const [phaseType, setPhaseType] = useState<SelectOption[]>([]);
  const [massstabType, setMassstabType] = useState<SelectOption[]>([]);

  // Options
  const [projectOptions, setProjectOptions] = useState<SelectOption[]>([]);
  const [planinhaltOptions, setPlaninhaltOptions] = useState<SelectOption[]>([]);
  const [projectPlanOptions, setProjectPlanOptions] = useState<SelectOption[]>([]);
  const [projectMassstabOptions, setMassstabOptions] = useState<SelectOption[]>([]);
  const [projectPhaseOptions, setPhaseOptions] = useState<SelectOption[]>([]);

  const [planContent, setPlanContent] = useState<SelectOption[]>([]);
  const [workPhase, setWorkPhase] = useState<SelectOption[]>([]);
  const [scale, setScale] = useState<SelectOption[]>([]);
  
  // State for each metadata key
  const [metadataSelections, setMetadataSelections] = useState<Record<string, SelectOption[]>>({});
  const [metadata, setMetadata] = useState<string[] | null>(null);
  const [metaDataOptions, setMetaDataOptions] = useState<Record<string, SelectOption[]>>({});

  const router = useRouter();

  const validateForm = () => {
    const newErrors: any = {};
    if (projectName.length === 0) newErrors.projectName = 'Please select a project name.';
    if (planType.length === 0) newErrors.planType = 'Please select a plan type.';
    if (planContent.length === 0) newErrors.planContent = 'Please select plan content.';
    if (workPhase.length === 0) newErrors.workPhase = 'Please select a work phase.';
    if (scale.length === 0) newErrors.scale = 'Please select a scale.';
    if (metadataSelections["openSearch"]?.length === 0) newErrors.openSearch = 'Please select an open search option.';
    return newErrors;
  };

  // Fetch project names when the component mounts
  useEffect(() => {
    async function fetchProjectNames() {
      try {
        const projectNames = await getProjects(); // Adjust getProjects if needed
        const options = projectNames.map((name: string) => ({
          value: name,
          label: name,
        }));
        setProjectOptions(options);
      } catch (error) {
        console.error("Error fetching project names:", error);
      }
    }

    fetchProjectNames();
  }, []);

  // Map data to match MultiSelectInput format
  useEffect(() => {
    setProjectPlanOptions(projectPlanData.map((item) => ({
      value: item.label || "",
      label: item.label || "No Label",
    })));
    setPlaninhaltOptions(projectPlainhaltData.map((item) => ({
      value: item.label || "",
      label: item.label || "No Label",
    })));
    setMassstabOptions(projectMassstabData.map((item) => ({
      value: item.label || "",
      label: item.label || "No Label",
    })));
    setPhaseOptions(projectPhaseData.map((item) => ({
      value: item.label || "",
      label: item.label || "No Label",
    })));
  }, []);

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

  // Handle change for each metadata key separately
  const handleMetadataChange = (key: string, selectedOptions: SelectOption[]) => {
    setMetadataSelections((prevSelections) => ({
      ...prevSelections,
      [key]: selectedOptions,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const queryParams = new URLSearchParams();

      // Function to append all values from an array to the query parameters
      const appendAllValues = (key: any, values: any) => {
        values.forEach((item: any) => {
          if (item?.value) {
            queryParams.append(key, item.value);
          }
        });
      };

      appendAllValues("projectName", projectName);
      appendAllValues("planType", planType);
      appendAllValues("planContent", planinhaltType);
      appendAllValues("phase", phaseType);
      appendAllValues("scale", massstabType);
      appendAllValues("openSearch", metadataSelections["openSearch"] || []);

      console.log(queryParams.toString());
  
      // Navigate to the results page
      router.push(`/result?${queryParams.toString()}`);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-[500px] bg-[#FAFAFA]">
      <h1 className="text-2xl font-bold mb-4 text-center">Bauplan finden</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <MultiSelectInput
          value={projectName}
          setValue={(value) => {
            setProjectName(value);
            handleSelectProject(value[0]);
          }}
          options={projectOptions}
          placeholder="Projektname"
          instanceId="projectName"
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
          setValue={setPhaseType}
          options={projectPhaseOptions}
          placeholder="Leistungsphase"
          instanceId="Leistungsphase"
        />
        <MultiSelectInput
          value={massstabType}
          setValue={setMassstabType}
          options={projectMassstabOptions}
          placeholder="Maßstab"
          instanceId="Maßstab"
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
        <MultiSelectInput
          value={metadataSelections["openSearch"] || []}
          setValue={(value) => handleMetadataChange("openSearch", value)}
          options={[]}
          placeholder="Offene Suche"
          instanceId="Offene Suche"
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
