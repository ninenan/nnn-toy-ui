import React, {
  Children,
  cloneElement,
  FC,
  FunctionComponentElement,
  MouseEvent,
  PropsWithChildren,
  useContext,
  useState
} from 'react';
import classNames from 'classnames';
// import CSSTransition from 'react-transition-group/CSSTransition';
import Transition from '../Transition';
import MenuContext from './menuContext';
import { IMenuItemProps } from './menuItem';
import Icon from '../Icon';

export interface ISubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: FC<PropsWithChildren<ISubMenuProps>> = props => {
  const { index, title, children, className } = props;
  const context = useContext(MenuContext);
  const { mode, defaultOpenSubMenus } = context;
  const isDefaultOpen =
    index && mode === 'vertical' && defaultOpenSubMenus?.length
      ? defaultOpenSubMenus.includes(index)
      : false;
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const classes = classNames('menu-item submenu-item', className, {
    vertical: mode === 'vertical',
    opened: isOpen
  });

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  let timer: ReturnType<typeof setTimeout> | null = null;
  const handleMouse = (e: MouseEvent, toggle: boolean) => {
    if (timer) clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setIsOpen(toggle);
    }, 300);
  };

  const clickEvents =
    mode === 'vertical'
      ? {
          onClick: handleClick
        }
      : {};

  const hoverEvents =
    mode === 'horizontal'
      ? {
          onMouseEnter: (e: MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: MouseEvent) => handleMouse(e, false)
        }
      : {};

  const renderChildren = () => {
    const subClassess = classNames('submenu', {
      // 'menu-opened': isOpen
    });
    const childComponent = Children.map(children, (child, i) => {
      const childEl = child as FunctionComponentElement<IMenuItemProps>;
      // 限制了子元素只能是 MenuItem 组件
      if (childEl.type.displayName === 'MenuItem') {
        return cloneElement(childEl, {
          index: `${index}-${i}`
        });
      } else {
        console.warn(
          'Warning: you need use MenuItem Component in SubMenu Component'
        );
      }
    });

    return (
      <Transition
        in={isOpen}
        timeout={300}
        animation="zoom-in-top"
        appear
        unmountOnExit
      >
        <ul className={subClassess}>{childComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-item" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
