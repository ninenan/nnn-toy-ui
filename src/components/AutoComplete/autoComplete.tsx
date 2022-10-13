import React, {
  ChangeEvent,
  FC,
  PropsWithChildren,
  ReactElement,
  useState
} from 'react';
import Input, { IInputProps } from '../Input';

export type DataSourceType<T = any> = T & {
  value: string;
};

const testDOO: DataSourceType<{ value: string; id: number }> = {
  value: 'value01',
  id: 2222
};
console.log(testDOO);

export interface IAutoCompleteProps extends Omit<IInputProps, 'onSelect'> {
  onSelect?: (item: DataSourceType) => void;
  fetchItem: (str: string) => DataSourceType[];
  renderOptions?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: FC<PropsWithChildren<IAutoCompleteProps>> = props => {
  const { fetchItem, onSelect, value, renderOptions, ...restProps } = props;
  const [options, setOptions] = useState<DataSourceType[]>([]);

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

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setOptions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  const renderTemplate = (item: DataSourceType) =>
    renderOptions ? renderOptions(item) : item.value;

  const renderDropdown = () => {
    return (
      <ul>
        {options.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          );
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
