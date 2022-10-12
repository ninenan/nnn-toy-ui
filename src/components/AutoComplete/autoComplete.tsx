import React, { ChangeEvent, FC, PropsWithChildren, useState } from 'react';
import Input, { IInputProps } from '../Input';

export interface IAutoCompleteProps extends Omit<IInputProps, 'onSelect'> {
  onSelect?: (item: string) => void;
  fetchItem: (str: string) => string[];
}

const AutoComplete: FC<PropsWithChildren<IAutoCompleteProps>> = props => {
  const { fetchItem, onSelect, value, ...restProps } = props;
  const [options, setOptions] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    if (value) {
      const res = fetchItem(value);
      setOptions(res);
    } else {
      setOptions([]);
    }
  };

  const renderDropdown = () => {
    return (
      <ul>
        {options.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    );
  };

  return (
    <div className="toy-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {options.length > 0 && renderDropdown()}
    </div>
  );
};

export default AutoComplete;
