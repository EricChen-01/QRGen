import { useState, useEffect } from "react";


export default function useSizeInput(size: number, min: number, max: number, onChange: (value: number) => void) {
  const [input, setInput] = useState(size.toString());
  const [error, setError] = useState(false);

  useEffect(() => {
    setInput(size.toString()); // sync if external size changes
  }, [size]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    // remove any characters except digits and dot
    const cleaned = rawValue.replace(/[^0-9.]/g, "");

    // strict validation: allow integers, decimals with digits on at least one side (e.g. "123", "123.45", ".5").
    // Disallow empty string, lone dot, multiple dots, or other malformed inputs.
    const validNumberRegex = /^(?:\d+\.\d+|\d+|\.\d+)$/;

    setInput(cleaned);

    if (!cleaned || !validNumberRegex.test(cleaned)) {
      // invalid format (including "" and "." and "12..3")
      setError(true);
      return;
    }

    const numericValue = parseFloat(cleaned);
    const outOfRange = numericValue < min || numericValue > max;
    setError(outOfRange);

    if (!outOfRange) {
      onChange(numericValue);
    }
  };

  return { input, error, handleChange, setInput };
}
