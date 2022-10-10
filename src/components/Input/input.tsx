import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import React, { InputHTMLAttributes, ReactElement, FC, ReactNode } from 'react';
import { PropsWithChildren } from 'react';
import { commonSize } from '../../typings';

interface IBaseInputProps {
  disabled?: boolean;
  size?: commonSize;
  icon?: IconProp;
  prefix?: string | ReactElement;
  suffix?: string | ReactElement;
}

export type IInputProps = Partial<
  IBaseInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>
>;

/**
 * 适配 value 值
 *
 * @param {unknown} value - props.value
 * @returns {string} 默认返回空字符串
 */
const adapterValue = (value: unknown) => {
  if (typeof value === null || typeof value === 'undefined') {
    return '';
  }
  return value;
};

const Input: FC<PropsWithChildren<IInputProps>> = props => {
  const { disabled, prefix, suffix, size, icon, ...restProps } = props;
  const classes = classNames('toy-input', {
    [`input-size-${size}`]: size,
    disabled: disabled,
    'input-group': prefix || suffix,
    'input-group-prefix': !!prefix,
    'input-group-suffix': !!suffix
  });

  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = adapterValue(props.value) ? '' : props.value;
  }

  return <div>tst</div>;
};

export default Input;
