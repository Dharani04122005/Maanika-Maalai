
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const testBackend = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    const data = await response.text();

    console.log("Backend Response:", data);
    return data;
  } catch (error) {
    console.error("Backend Connection Failed:", error);
    return null;
  }
};
