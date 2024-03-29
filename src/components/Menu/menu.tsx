import React, {
  useState,
  cloneElement,
  Children,
  PropsWithChildren,
  FunctionComponentElement
} from 'react';
import classNames from 'classnames';

import { TEST_MENU_ID } from '../../constants/menu';
import { IMenuItemProps } from './menuItem';
import MenuContext, { IMenuContext } from './menuContext';

export type MenuMode = 'vertical' | 'horizontal';
export type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
  // 默认高亮项
  defaultIndex: string;
  // 类名
  className?: string;
  // 模式
  mode?: MenuMode;
  // 样式
  style?: React.CSSProperties;
  // 选中点击事件
  onSelect?: SelectCallback;
  // 默认展开项
  defaultOpenSubMenus?: string[];
}

const Menu: React.FC<PropsWithChildren<IMenuProps>> = props => {
  const {
    defaultIndex = '0',
    className,
    mode = 'horizontal',
    style,
    onSelect,
    children,
    defaultOpenSubMenus
  } = props;
  const [currentIndex, setCurrentIndex] = useState<string>(defaultIndex);

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  });

  const handleClick = (index: string) => {
    setCurrentIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const context: IMenuContext = {
    index: currentIndex,
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  };

  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      const childEle = child as FunctionComponentElement<IMenuItemProps>;
      const { displayName } = childEle.type;
      if (['MenuItem', 'SubMenu'].includes(displayName as string)) {
        // 解决 indx 必传的问题，通过 cloneElement 的方式，手动传入
        return cloneElement(childEle, { index: index.toString() });
      } else {
        console.warn(
          'Warning: you need use MenuItem Component in Menu Component'
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid={TEST_MENU_ID}>
      <MenuContext.Provider value={context}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;
