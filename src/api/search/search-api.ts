import axios from "axios";
import { getApiBaseUrl } from "../get-api-url";
import { authenticationError } from "../../app/errors/authenticationError";

const baseURL = getApiBaseUrl();

export async function SearchWithProject(projectName: string) {
    // Construct the URL with query parameter
    const url = `${baseURL}/filefinder/metadata?name=${encodeURIComponent(projectName)}`;
    
    console.log("API URL:", url);
    
    try {
      const response = await axios.get(url);
      console.log("API Response:", response);
      return response.data;
    } catch (err: any) {
      console.log("API Error:", err);
      const errorMessage = err.response?.data?.message || "An unknown error occurred";
      throw new Error(errorMessage); // Using Error to throw a proper error
    }
  }