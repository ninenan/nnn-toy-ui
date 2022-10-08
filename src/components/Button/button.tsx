import classNames from 'classnames';
import React, {
  PropsWithChildren,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes
} from 'react';

export type ButtonType =
  | 'primary'
  | 'default'
  | 'link'
  | 'text'
  | 'danger'
  | 'warning';

export type ButtonSize = 'lg' | 'sm';

interface IBaseButtonProps {
  size?: ButtonSize;
  btnType?: ButtonType;
  disabled?: boolean;
  href?: string;
  className?: string;
}

// ButtonHTMLAttributes 可以获取到 button 标签原生的所有属性
type NativeBtnProps = IBaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;
// AnchorHTMLAttributes 可以获取到 a 标签原生的所有属性
type NativeAnchorBtnProps = IBaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = Partial<NativeBtnProps & NativeAnchorBtnProps>;

const button: React.FC<PropsWithChildren<ButtonProps>> = props => {
  const { size, btnType, disabled, href, className, children, ...restProps } =
    props;

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: disabled && btnType === 'link'
  });

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      {...(restProps as NativeBtnProps)}
    >
      {children}
    </button>
  );
};

button.defaultProps = {
  btnType: 'default'
};

export default button;
