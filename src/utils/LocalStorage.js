import { encryptData, decryptData } from "./encryption";
export const saveState = (state, stateName) => {
  try {
    localStorage.setItem(stateName, encryptData(state));
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
};

export const loadState = (stateName) => {
  try {
    const data = localStorage.getItem(stateName);
    if (!data) {
      return {};
    }
    return decryptData(data);
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    return {};
  }
};
