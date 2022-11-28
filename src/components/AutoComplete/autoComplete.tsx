import classNames from 'classnames';
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState
} from 'react';
import { isPromise } from '../../helpers/utils';
import useClickOutside from '../../hooks/useClickOutside';
import useDebounce from '../../hooks/useDebounce';
import Icon from '../Icon';
import Input, { IInputProps } from '../Input';
import Transition from '../Transition';

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
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const triggerSearch = useRef(false);
  const autoCompleteComRef = useRef<HTMLDivElement>(null);
  const debounceValue = useDebounce<string>(inputValue, 500);
  useClickOutside(autoCompleteComRef, () => {
    setShowDropDown(false);
    setOptions([]);
  });

  /**
   * 输入框改变事件
   *
   * @param {ChangeEvent<HTMLInputElement>} e - 当前值
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    triggerSearch.current = true;
  };

  /**
   * 下拉项选择事件
   *
   * @param {DataSourceType} currentItem - 选中的项
   */
  const handleSelect = (currentItem: DataSourceType) => {
    setInputValue(currentItem.value);
    setShowDropDown(false);
    setOptions([]);
    if (onSelect) {
      onSelect(currentItem);
    }
    triggerSearch.current = false;
  };

  /**
   * 设置高亮
   *
   * @param {number} index - 下标
   */
  const handleHighlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= options.length) index = options.length - 1;

    setHighlightIndex(index);
  };

  /**
   * 键盘事件
   *
   * @param {KeyboardEvent<HTMLInputElement>} e - 键盘事件
   */
  const handlleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { code } = e;
    switch (code) {
      case 'Enter':
        options[highlightIndex] && handleSelect(options[highlightIndex]);
        break;
      case 'ArrowUp':
        handleHighlight(highlightIndex - 1);
        break;
      case 'ArrowDown':
        handleHighlight(highlightIndex + 1);
        break;
      case 'Escape':
        setOptions([]);
        setShowDropDown(false);
        break;
      default:
        break;
    }
  };

  /**
   * 渲染下拉中的每一项内容
   *
   * @param {DataSourceType} item - 下拉选项中的每一项
   */
  const renderTemplate = (item: DataSourceType) =>
    renderOptions ? renderOptions(item) : item.value;

  const renderDropdown = () => {
    return (
      <Transition
        in={loading || showDropDown}
        timeout={300}
        animation="zoom-in-top"
        onExited={() => setOptions([])}
      >
        <ul className="options-list">
          {loading && (
            <div className="options-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {options.map((item, index) => {
            const classes = classNames('options-item', {
              active: index === highlightIndex
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
      </Transition>
    );
  };

  useEffect(() => {
    const getOptions = async () => {
      if (debounceValue && triggerSearch.current) {
        const resFn = fetchOptions(debounceValue);
        setShowDropDown(true);
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
        setShowDropDown(false);
      }
    };

    getOptions();
    setHighlightIndex(-1);
  }, [debounceValue, fetchOptions]);

  return (
    <div className="toy-auto-complete" ref={autoCompleteComRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handlleKeyDown}
      />
      {renderDropdown()}
    </div>
  );
};

export default React.memo(AutoComplete);
