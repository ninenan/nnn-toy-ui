import React, {
  ChangeEvent,
  FC,
  PropsWithChildren,
  ReactElement,
  useState
} from 'react';
import Input, { IInputProps } from '../Input';
import { isPromise } from '../../helpers/utils';
import Icon from '../Icon';

export type DataSourceType<T = any> = T & {
  value: string;
};

export interface IAutoCompleteProps extends Omit<IInputProps, 'onSelect'> {
  onSelect?: (item: DataSourceType) => void; // select 事件
  fetcOptions: (str: string) => DataSourceType[] | Promise<DataSourceType>; // 获取 options
  renderOptions?: (item: DataSourceType) => ReactElement; // 渲染 options 数据
}

const AutoComplete: FC<PropsWithChildren<IAutoCompleteProps>> = props => {
  const { fetcOptions, onSelect, value, renderOptions, ...restProps } = props;
  const [options, setOptions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState(value);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    if (value) {
      const resFn = fetcOptions(value);
      if (isPromise<DataSourceType>(resFn)) {
        setLoading(true);
        const result = await resFn;
        setLoading(false);
        setOptions(result);
      } else {
        setOptions(resFn);
      }
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
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {options.length > 0 && renderDropdown()}
    </div>
  );
};

export default AutoComplete;
