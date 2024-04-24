import React, { useState } from 'react';
import styles from './dropdown.module.css';

interface Option {
  id: string;
  title: string;
  label: string;
}

const Select: React.FC<{ options: Option[] }> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <div className={`${styles.select}`}>
      <div className={`${styles.selected}`} data-default="All">
        {selectedOption.label}
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className={`${styles.arrow}`}>
          <path
            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
          ></path>
        </svg>
      </div>
      <div className={`${styles.options}`}>
        {options.map((option) => (
          <div key={option.id} title={option.title}>
            <input
              id={option.id}
              name="option"
              type="radio"
              checked={selectedOption.id === option.id}
              onChange={() => handleOptionChange(option)}
            />
            <label className={`${styles.option}`} htmlFor={option.id} data-txt={option.label}></label>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dropdown: React.FC = () => {
  const options: Option[] = [
    { id: 'all', title: 'all', label: 'All' },
    { id: 'option-1', title: 'option-1', label: 'Option 1' },
    { id: 'option-2', title: 'option-2', label: 'Option 2' },
    { id: 'option-3', title: 'option-3', label: 'Option 3' },
  ];

  return <Select options={options} />;
};

export default Dropdown;
