import { FC } from 'react';
import Menu, { type IMenuProps } from './menu';
import SubMenu, { type ISubMenuProps } from './subMenu';
import MenuItem, { type IMenuItemProps } from './menuItem';

export type IMenuCom = FC<IMenuProps> & {
  Item: FC<IMenuItemProps>;
  SubMenu: FC<ISubMenuProps>;
};

const MenuCom = Menu as IMenuCom as any;

MenuCom.Item = MenuItem;
MenuCom.SubMenu = SubMenu;

export default MenuCom;
