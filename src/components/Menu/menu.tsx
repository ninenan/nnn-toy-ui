import React, { PropsWithChildren, createContext, useState } from 'react';
import classNames from 'classnames';

type MenuMode = 'vertical' | 'horizontal';
type SelectCallback = (selectedIndex: number) => void;

export interface IMenuProps {
  defaultIndex: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({
  index: 0
});

const Menu: React.FC<PropsWithChildren<IMenuProps>> = props => {
  const { defaultIndex, className, mode, style, onSelect, children } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(defaultIndex);
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical'
  });
  const handleClick = (index: number) => {
    setCurrentIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const context: IMenuContext = {
    index: currentIndex,
    onSelect: handleClick
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
};

export default Menu;
