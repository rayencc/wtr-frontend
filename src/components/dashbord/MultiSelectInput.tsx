import React from 'react';
import Select from 'react-select';

type SelectOption = {
  value: string;
  label: string;
  img?: string;
  subTitle?: string;

};

type MultiSelectInputProps = {
  value: SelectOption[]; // Currently selected options
  setValue: (selected: SelectOption[]) => void; // Function to update selected options
  options: SelectOption[]; // List of options to select from
  placeholder?: string; // Placeholder text for the dropdown
  className?: string; // Custom CSS class for styling
  instanceId: string; // Unique instanceId for consistent SSR/CSR IDs
  onChange?: () => void;

};

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  value,
  setValue,
  options,
  placeholder = 'Select options',
  className = '',
  instanceId,
}) => {
  const handleChange = (selectedOptions: any) => {
    setValue(selectedOptions || []);
  };

  return (
    <Select
      isMulti
      instanceId={instanceId} // Ensures consistent IDs across SSR and CSR
      value={value}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default MultiSelectInput;
