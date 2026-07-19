const API_URL = "http://localhost/logu-onoff/php";

export const api = async (path: string, options: RequestInit = {}) => {
  return fetch(`${API_URL}/${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
};
