import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

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
  size: ButtonSize;
  btnType: ButtonType;
  disabled: boolean;
  href: string;
  className: string;
}

const button: React.FC<
  PropsWithChildren<Partial<IBaseButtonProps>>
> = props => {
  const { size, btnType, disabled, href, className, children } = props;

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: disabled && btnType === ButtonType.Link
  });

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

button.defaultProps = {
  size: ButtonSize.Default,
  btnType: ButtonType.Primary
};

export default button;
