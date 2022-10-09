import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@testing-library/react';
import Menu, { IMenuProps } from './menu';
import MenuItem from './menuItem';
import { TEST_MENU_ID } from '../../constants/menu';

const testProps: IMenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
};

const testVerticalProps: IMenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
};

const generateMenuCom = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>third</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult | null = null;
let menuEle: HTMLElement | null = null;
let activeEle: HTMLElement | null = null;
let disabledEle: HTMLElement | null = null;

describe('test Menu and MenuItem Component', () => {
  // 在每个测试用之前都会先执行该该函数
  beforeEach(() => {
    wrapper = render(generateMenuCom(testProps));
    // 通过组件中的 data-testid 属性获取标签
    menuEle = wrapper.getByTestId(TEST_MENU_ID);
    activeEle = wrapper.getByText('active');
    disabledEle = wrapper.getByText('disabled');
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuEle).toBeInTheDocument();
    expect(menuEle).toHaveClass('menu test');
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
});
