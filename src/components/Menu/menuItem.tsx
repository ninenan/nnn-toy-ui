import React, { PropsWithChildren, CSSProperties, FC, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface IMenuProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const MenuItem: FC<PropsWithChildren<IMenuProps>> = props => {
  const { children, index, disabled, className, style } = props;
  const context = useContext(MenuContext);
  const clasess = classNames('menu-item', className, {
    disabled: disabled,
    active: context.index === index
  });
  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index);
    }
  };

  return (
    <li className={clasess} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;
