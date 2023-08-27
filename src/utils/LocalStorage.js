export const saveState = (state, stateName) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(stateName, serializedState);
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
};

export const loadState = (stateName) => {
  try {
    const serializedState = localStorage.getItem(stateName);
    if (!serializedState) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    return {};
  }
};
