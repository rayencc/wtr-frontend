import axios from "axios";
import { getApiBaseUrl } from "../get-api-url";

const baseURL = getApiBaseUrl();

export async function getProjects() {
  const url = `${baseURL}/projects`;

  try {
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" }, // Add headers if necessary
    });
    console.log("API Response:", response);
    return response.data.map((project : any) => project.name);
  } catch (err: any) {
    console.log("API Error:", err);
    const errorMessage =
      err.response?.data?.message || "An unknown error occurred";
  }
}

export async function getPlantType() {
    const url = `${baseURL}/projects`;
  
    try {
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" }, // Add headers if necessary
      });
      console.log("API Response:", response);
      return response.data.map((project : any) =>  project.plans.map((plan: any) => plan.planType));
    } catch (err: any) {
      console.log("API Error:", err);
      const errorMessage =
        err.response?.data?.message || "An unknown error occurred";
    }
  }