import { Envs } from "../utils/config";

export function getApiBaseUrl(): string {
  const url = Envs.BACKEND_URL || "http://localhost:3001";
  return url;
}
