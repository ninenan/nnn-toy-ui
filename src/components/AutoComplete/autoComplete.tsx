import React, {
  ChangeEvent,
  FC,
  PropsWithChildren,
  ReactElement,
  KeyboardEvent,
  useState,
  useEffect
} from 'react';
import Input, { IInputProps } from '../Input';
import { isPromise } from '../../helpers/utils';
import Icon from '../Icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';

export type DataSourceType<T = any> = T & {
  value: string;
};

export interface IAutoCompleteProps extends Omit<IInputProps, 'onSelect'> {
  onSelect?: (item: DataSourceType) => void; // select 事件
  fetchOptions: (str: string) => DataSourceType[] | Promise<DataSourceType>; // 获取 options
  renderOptions?: (item: DataSourceType) => ReactElement; // 渲染 options 数据
}

const AutoComplete: FC<PropsWithChildren<IAutoCompleteProps>> = props => {
  const { fetchOptions, onSelect, value, renderOptions, ...restProps } = props;
  const [options, setOptions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value as string);
  const [hightlightIndex, setHightlightIndex] = useState(0);
  const debounceValue = useDebounce<string>(inputValue, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
  };

  const handleHighlight = (index: number) => {
    if (index < 0) index = 0;
    if (index > options.length) index = options.length - 1;

    console.log('index', index);
    setHightlightIndex(index);
  };

  const handlleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    switch (keyCode) {
      case 13:
        options[hightlightIndex] && handleSelect(options[hightlightIndex]);
        break;
      case 38:
        handleHighlight(hightlightIndex - 1);
        break;
      case 40:
        handleHighlight(hightlightIndex + 1);
        break;
      case 27:
        setOptions([]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getOptions = async () => {
      console.log('test');
      if (debounceValue) {
        const resFn = fetchOptions(debounceValue);
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

    getOptions();
    setHightlightIndex(-1);
  }, [debounceValue]);

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
      <ul className="options-list">
        {options.map((item, index) => {
          const classes = classNames('options-item', {
            active: index === hightlightIndex
          });
          return (
            <li
              key={index}
              className={classes}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="toy-auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handlleKeyDown}
      />
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
