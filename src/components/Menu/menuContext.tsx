import { createContext } from 'react';
import { MenuMode, SelectCallback } from './menu';

export interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

const MenuContext = createContext<IMenuContext>({
  index: '0'
});

export default MenuContext;
