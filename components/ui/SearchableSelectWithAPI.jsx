"use client";

import axios from "axios";
import debounce from "lodash/debounce";
import React, { useCallback, useState } from "react";
import Select from "react-select";

const SearchableSelectWithAPI = ({
  value,
  onChange,
  placeholder = "Select...",
  isClearable = true,
  isSearchable = true,
  isDisabled = false,
  className,
  classNamePrefix = "react-select",
  apiEndpoint,
  minLength = 2,
  ...props
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false); // ⬅️ New loading state

  const fetchOptions = async (inputValue) => {
    if (!inputValue || inputValue.length < minLength) return;

    setLoading(true); // ⬅️ Start loading
    try {
      const res = await axios.get(`${apiEndpoint}?q=${inputValue}`);
      const recipes = res.data.recipes || [];

      const formattedOptions = recipes.map((recipe) => ({
        label: recipe.name,
        value: recipe.id.toString(),
      }));

      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false); // ⬅️ Stop loading
    }
  };

  const debouncedFetch = useCallback(
    debounce((inputValue) => fetchOptions(inputValue), 500),
    [],
  );

  const handleInputChange = (inputValue) => {
    debouncedFetch(inputValue);
    return inputValue;
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "40px",
      borderRadius: "6px",
      borderColor: state.isFocused ? "hsl(var(--ring))" : "hsl(var(--input))",
      boxShadow: state.isFocused ? "0 0 0 2px hsl(var(--ring))" : "none",
      "&:hover": { borderColor: "hsl(var(--input))" },
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
    }),
    singleValue: (provided) => ({ ...provided, color: "hsl(var(--foreground))" }),
    placeholder: (provided) => ({ ...provided, color: "hsl(var(--muted-foreground))" }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "hsl(var(--muted-foreground))",
      "&:hover": { color: "hsl(var(--foreground))" },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "hsl(var(--muted-foreground))",
      "&:hover": { color: "hsl(var(--destructive-foreground))" },
    }),
    indicatorSeparator: (provided) => ({ ...provided, backgroundColor: "hsl(var(--border))" }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "hsl(var(--popover))",
      borderColor: "hsl(var(--border))",
      borderWidth: "1px",
      borderRadius: "6px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
      paddingTop: 0,
      paddingBottom: 0,
      pointerEvents: "auto", // ⬅️ Important to allow wheel events
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "hsl(var(--accent))" : "hsl(var(--popover))",
      color: state.isFocused ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))",
      "&:active": {
        backgroundColor: "hsl(var(--accent))",
        color: "hsl(var(--accent-foreground))",
      },
      borderRadius: "4px",
    }),
    input: (provided) => ({ ...provided, color: "hsl(var(--foreground))" }),
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      onInputChange={handleInputChange}
      placeholder={placeholder}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      isLoading={loading} // ✅ Show spinner while loading
      className={className}
      classNamePrefix={classNamePrefix}
      styles={customStyles}
      {...props}
    />
  );
};

export default SearchableSelectWithAPI;
