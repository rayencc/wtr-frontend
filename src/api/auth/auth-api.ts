
import { authenticationError } from "../../app/errors/authenticationError";
import LogInDto from "../../dtos/logIn.dto";
import RegisterDto from "../../dtos/register.dto";
import { getApiBaseUrl } from "../get-api-url";

import axios from "axios";

const baseURL = getApiBaseUrl();

export async function LoginApi(loginDto: LogInDto) {
  const url = `${baseURL}/auth/login`;
  console.log("Login URL:", url);
  console.log("Payload:", loginDto);

  try {
    const response = await axios.post(url, loginDto, {
      headers: { "Content-Type": "application/json" }, // Add headers if necessary
    });
    console.log("API Response:", response);
    return response.data;
  } catch (err: any) {
    console.log("API Error:", err);
    const errorMessage =
      err.response?.data?.message || "An unknown error occurred";
    throw new authenticationError(errorMessage);
  }
}

export async function RegisterApi(registerDto: RegisterDto) {
  const url = `${baseURL}/auth/register`;
  console.log("Login URL:", url);
  console.log("Payload:", registerDto);

  try {
    const response = await axios.post(url, registerDto, {
      headers: { "Content-Type": "application/json" }, // Add headers if necessary
    });
    console.log("API Response:", response);
    return response.data;
  } catch (err: any) {
    console.log("API Error:", err);
    const errorMessage =
      err.response?.data?.message || "An unknown error occurred";
    throw new authenticationError(errorMessage);
  }
}
