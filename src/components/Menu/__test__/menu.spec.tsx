import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  RenderResult
} from '@testing-library/react';

import Menu, { IMenuProps } from '../menu';
import MenuItem from '../menuItem';
import SubMenu from '../subMenu';
import { TEST_MENU_ID } from '../../../constants/menu';

const testProps: IMenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
};

const testVerticalProps: IMenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
};

const generateMenuCom = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>third</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropdown01</MenuItem>
      </SubMenu>
      <SubMenu title="open">
        <MenuItem>open01</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleScript = () => {
  const cssStyle = `
    .submenu {
      display: none;
    }
    .menu-opened {
      display: block;
    }
  `;

  const style = document.createElement('style');
  style.innerHTML = cssStyle;

  return style;
};

let wrapper: RenderResult | null = null;
let menuEle: HTMLElement | null = null;
let activeEle: HTMLElement | null = null;
let disabledEle: HTMLElement | null = null;

describe('test Menu and MenuItem Component', () => {
  // 在每个测试用之前都会先执行该该函数
  beforeEach(() => {
    wrapper = render(generateMenuCom(testProps));
    wrapper.container.append(createStyleScript());
    // 通过组件中的 data-testid 属性获取标签
    menuEle = wrapper.getByTestId(TEST_MENU_ID);
    activeEle = wrapper.getByText('active');
    disabledEle = wrapper.getByText('disabled');
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuEle).toBeInTheDocument();
    expect(menuEle).toHaveClass('menu test');
    // 使用 querySelectorAll(':scope > li') 可以获取到当前节点并不会往下寻找
    expect(menuEle?.querySelectorAll(':scope > li').length).toEqual(5);
    expect(activeEle).toHaveClass('active menu-item');
    expect(disabledEle).toHaveClass('disabled menu-item');
  });

  it('click items should change active and call the right callback', () => {
    const thirdItem: HTMLElement = wrapper?.getByText('third') as HTMLElement;

    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('active');
    expect(activeEle).not.toHaveClass('active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');

    fireEvent.click(disabledEle as HTMLElement);
    expect(disabledEle).not.toHaveClass('active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  it('should render vertical mode when mode is set to vertical', () => {
    // cleanup 防止找到多个含有 TEST_MENU_ID 属性的节点，造成干扰
    cleanup();

    const wrapper = render(generateMenuCom(testVerticalProps));
    const menuEle = wrapper.getByTestId(TEST_MENU_ID);

    expect(menuEle).toHaveClass('menu-vertical');
  });

  it('should show dropdown items when hover on subMenu', async () => {
    const dropDownContainerDom = wrapper?.queryByText(
      'dropdown01'
    ) as HTMLElement;
    expect(dropDownContainerDom).not.toBeVisible();

    const dropdownEle = wrapper?.getByText('dropdown') as HTMLElement;
    fireEvent.mouseEnter(dropdownEle);
    // 因为 subMenu 组件中 300ms 才显示，awaitFor 模仿异步操作
    await waitFor(() => {
      expect(dropDownContainerDom).toBeVisible();
    });

    // 鼠标点击
    fireEvent.click(dropDownContainerDom);
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');

    // 鼠标移出
    fireEvent.mouseLeave(dropdownEle);
    await waitFor(() => {
      expect(dropDownContainerDom).not.toBeVisible();
    });
  });
});

// 垂直方向的 menu 测试 case
let wrapperVertical: RenderResult | null = null;
describe('test Menu and MenuItem Component in vertical mode', () => {
  beforeEach(() => {
    wrapperVertical = render(generateMenuCom(testVerticalProps));
    wrapperVertical.container.append(createStyleScript());
  });

  it('should render vertical mode when mode is set to vertical', () => {
    const menuEle = (wrapperVertical as RenderResult).getByTestId(TEST_MENU_ID);
    expect(menuEle).toHaveClass('menu-vertical menu');
  });

  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownContainerDom = wrapperVertical?.queryByText(
      'dropdown01'
    ) as HTMLElement;
    expect(dropDownContainerDom).not.toBeVisible();
    fireEvent.click(wrapperVertical?.getByText('dropdown') as HTMLElement);
    expect(dropDownContainerDom).toBeVisible();
  });

  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(wrapperVertical?.queryByText('open01')).toBeVisible();
  });
});
