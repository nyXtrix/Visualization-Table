import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import InputWithIcon from "../inputs/InputWithIcon";

interface SearchInputProps {
  placeholder?: string;
  debounceTime?: number;
  onSearch?: (value: string) => void;
}

const SearchInput = ({
  placeholder = "Search...",
  debounceTime = 500,
  onSearch,
}: SearchInputProps) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [value, debounceTime]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  return (
    <InputWithIcon
      icon={Search}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-8"
    />
  );
};

export default SearchInput;