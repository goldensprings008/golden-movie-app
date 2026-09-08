import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // Reads saved data from the browser when the app first loads.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key);

      return savedValue ? JSON.parse(savedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Updates React state and saves the new value in the browser.
  function setValue(value) {
    const valueToStore =
      value instanceof Function ? value(storedValue) : value;

    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  }

  return [storedValue, setValue];
}

export default useLocalStorage;