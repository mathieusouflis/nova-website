import { useAuth } from "@/context/auth.context";
import apiURL from "./apiUrl";
import Cookies from "js-cookie";

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
    localStorage.setItem("access_token", data.access_token);
    return true;
  } else {
    return false;
  }
};

export function useFetchWithAuth() {
  const { logout } = useAuth();

  const fetchWithAuth = async (url, options = {}) => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("id");
      Cookies.remove("refresh_token");
      logout();
      throw new Error("Veuillez vous connecter.");
    }

    let response = await fetch(apiURL + url, {
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
        response = await fetch(apiURL + url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          credentials: "include",
        });
      } else {
        logout();
        throw new Error("Session expirée, veuillez vous reconnecter.");
      }
    }

    return response;
  };

  return fetchWithAuth;
}
