import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import React, {
  InputHTMLAttributes,
  MouseEvent,
  ReactElement,
  FC,
  ChangeEvent
} from 'react';
import { PropsWithChildren } from 'react';
import { commonSize } from '../../typings';
import Icon from '../Icon';

interface IBaseInputProps {
  disabled?: boolean;
  size?: commonSize;
  icon?: IconProp;
  prefix?: string | ReactElement;
  suffix?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string, e: MouseEvent) => void;
}

export type IInputProps = Partial<
  IBaseInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>
>;

/**
 * 适配 value
 *
 * @param {unknown} value - props.value
 * @returns {string} 默认返回空字符串
 */
const adapterValue = (value: unknown): string => {
  if (value === null || typeof value === 'undefined') {
    return '';
  }
  return value as string;
};

const Input: FC<PropsWithChildren<IInputProps>> = props => {
  const {
    disabled,
    prefix,
    suffix,
    size,
    icon,
    style,
    className,
    onSearch,
    ...restProps
  } = props;
  const classes = classNames('toy-input-wrapper', {
    [`input-size-${size}`]: size,
    disabled: disabled,
    'input-group': prefix || suffix,
    'input-group-prefix': !!prefix,
    'input-group-suffix': !!suffix
  });

  const inputClasses = classNames('input-inner', className);

  // fix defaultValue 和 value 同时存在
  if (Object.hasOwn(props, 'value')) {
    delete restProps.defaultValue;
    restProps.value = adapterValue(props.value);
  }

  const handleSearch = (e: MouseEvent<HTMLDivElement>) => {
    if (onSearch) {
      onSearch((props.value as string) || '', e);
    }
  };

  return (
    <div className={classes} style={style}>
      {prefix && <div className="toy-input-group-prefix">{prefix}</div>}
      {icon && (
        <div className="icon-wrapper" onClick={handleSearch}>
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className={inputClasses} disabled={disabled} {...restProps} />
      {suffix && <div className="toy-input-group-suffix">{suffix}</div>}
    </div>
  );
};

export default Input;
