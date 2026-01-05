import { useState, useEffect } from "react";


export default function useSizeInput(size: number, min: number, max: number, onChange: (value: number) => void) {
  const [input, setInput] = useState(size.toString());
  const [error, setError] = useState(false);

  useEffect(() => {
    setInput(size.toString()); // sync if external size changes
  }, [size]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const cleaned = rawValue.replace(/\D/g, ""); // remove non-digits

    setInput(cleaned);

    const numericValue = Number(cleaned);
    setError(cleaned !== "" && (numericValue < min || numericValue > max));

    if (numericValue >= min && numericValue <= max) {
      onChange(numericValue);
    }
  };

  return { input, error, handleChange, setInput };
}
