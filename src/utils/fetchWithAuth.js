import { useNavigate } from "react-router-dom";
import apiURL from "./apiUrl";

const refreshAccessToken = async () => {
  const response = await fetch(apiURL + "/tokens/refresh", {
    method: "POST",
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    localStorage.setItem("access_token", data.access_token);
    return true;
  } else {
    return false;
  }
};

const fetchWithAuth = async (url, options = {}) => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("Veuillez vous connecter.");
  const response = await fetch(apiURL + url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      return fetchWithAuth(url, options);
    } else {
      throw new Error("Session expirée, veuillez vous reconnecter.");
    }
  }

  return response;
};

export { fetchWithAuth };
