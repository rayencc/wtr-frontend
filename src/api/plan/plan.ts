import axios from "axios";
import { getApiBaseUrl } from "../get-api-url";

const baseURL = getApiBaseUrl();

export async function getPlan(planId: string) {
  const url = `${baseURL}/fileFinder/planByID?planId=${encodeURIComponent(planId)}`;
console.log("planId",planId)
  try {
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" }, // Add headers if necessary
    });
    console.log("API Response:", response);
    return response.data[0];
  } catch (err: any) {
    console.log("API Error:", err);
    const errorMessage =
      err.response?.data?.message || "An unknown error occurred";
  }
}

/* Get projet Key Words*/
export async function getMetaData(planId: string) {
  const url = `${baseURL}/filefinder/metadata-keys-values?projectId=${encodeURIComponent(planId)}`;
console.log("planId",planId)
  try {
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" }, // Add headers if necessary
    });
    console.log("API Response:", response);
    return response.data;
  } catch (err: any) {
    console.log("API Error:", err);
    const errorMessage =
      err.response?.data?.message || "An unknown error occurred";
  }
}


/* Search with Key Value */
export async function searchWithKeyValue(key: string, value: string) {
  const url = `${baseURL}/filefinder/lookup?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`;
console.log("planId",key)
  try {
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" }, // Add headers if necessary
    });
    console.log("API Response:", response);
    return response.data;
  } catch (err: any) {
    console.log("API Error:", err);
    const errorMessage =
      err.response?.data?.message || "An unknown error occurred";
  }
}