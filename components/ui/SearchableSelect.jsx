"use client"; // If you're using Next.js App Router

import React from "react";
import Select from "react-select"; // Import react-select

const SearchableSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isClearable = true, // Allows clearing the selected value
  isSearchable = true, // Enables/disables search functionality
  isDisabled = false, // Disables the select entirely
  className, // For external styling
  classNamePrefix = "react-select", // Prefix for internal styling classes
  ...props // Any other props to pass directly to react-select
}) => {
  // Default styles that mimic shadcn/ui's input and select triggers
  // You can customize these further to match your exact design system
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "40px", // Matches shadcn/ui input height
      borderRadius: "6px", // Matches shadcn/ui border-radius
      borderColor: state.isFocused ? "hsl(var(--ring))" : "hsl(var(--input))",
      boxShadow: state.isFocused ? "0 0 0 2px hsl(var(--ring))" : "none",
      "&:hover": {
        borderColor: "hsl(var(--input))", // Keep same on hover if not focused
      },
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "hsl(var(--foreground))",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "hsl(var(--muted-foreground))",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "hsl(var(--muted-foreground))", // Chevron icon color
      "&:hover": {
        color: "hsl(var(--foreground))",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "hsl(var(--muted-foreground))",
      "&:hover": {
        color: "hsl(var(--destructive-foreground))", // Example hover color
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "hsl(var(--border))", // Separator color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "hsl(var(--popover))",
      borderColor: "hsl(var(--border))",
      borderWidth: "1px",
      borderRadius: "6px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // Example shadow
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "hsl(var(--accent))" : "hsl(var(--popover))",
      color: state.isFocused ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))",
      "&:active": {
        backgroundColor: "hsl(var(--accent))",
        color: "hsl(var(--accent-foreground))",
      },
      borderRadius: "4px", // Slightly rounded options
    }),
    input: (provided) => ({
      ...provided,
      color: "hsl(var(--foreground))", // Text color of the input
    }),
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      className={className}
      classNamePrefix={classNamePrefix}
      styles={customStyles} // Apply our custom styles
      {...props}
    />
  );
};

export default SearchableSelect;
