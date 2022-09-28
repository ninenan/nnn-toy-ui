import classNames from 'classnames';
import React, {
  PropsWithChildren,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes
} from 'react';

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Link = 'link',
  Text = 'text',
  Danger = 'danger',
  Warning = 'warning'
}

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
  Default = 'df'
}

interface IBaseButtonProps {
  size?: ButtonSize;
  btnType?: ButtonType;
  disabled?: boolean;
  href?: string;
  className?: string;
}

type NativeBtnProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type NativeAnchorBtnProps = IBaseButtonProps &
  AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeBtnProps & NativeAnchorBtnProps>;

const button: React.FC<PropsWithChildren<ButtonProps>> = props => {
  const { size, btnType, disabled, href, className, children, ...restProps } =
    props;

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: disabled && btnType === ButtonType.Link
  });

  if (btnType === ButtonType.Link && href) {
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
  size: ButtonSize.Default,
  btnType: ButtonType.Primary
};

export default button;
