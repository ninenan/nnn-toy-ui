import { FC, PropsWithChildren } from 'react';
import Menu, { type IMenuProps } from './menu';
import SubMenu, { type ISubMenuProps } from './subMenu';
import MenuItem, { type IMenuItemProps } from './menuItem';

export type IMenuCom = FC<PropsWithChildren<IMenuProps>> & {
  Item: FC<PropsWithChildren<IMenuItemProps>>;
  SubMenu: FC<PropsWithChildren<ISubMenuProps>>;
};

const MenuCom = Menu as IMenuCom;

MenuCom.Item = MenuItem;
MenuCom.SubMenu = SubMenu;

export default MenuCom;
