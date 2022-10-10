import React from 'react';
import Button, { ButtonProps } from '../button';
import { render, fireEvent } from '@testing-library/react';

const defaultProps = {
  onClick: jest.fn()
};

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'test'
};

const disabledProps: ButtonProps = {
  onClick: jest.fn(),
  disabled: true
};

describe('test Button component', () => {
  it('should render the default button', () => {
    const wrapper = render(<Button {...defaultProps}>button</Button>);
    const element = wrapper.getByText('button');

    // 判断当前元素在 dom 中
    expect(element).toBeInTheDocument();
    // 判断元素是 button 类型
    expect(element.tagName).toEqual('BUTTON');
    // 元素的默认 class 有 btn btn-default
    expect(element).toHaveClass('btn btn-default');
    // 判断元素的 onClick 方法被触发
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>button</Button>);
    const element = wrapper.getByText('button');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg test');
  });

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType="link" href="www.baidu.com">
        button-link
      </Button>
    );
    const element = wrapper.getByText('button-link');

    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>button</Button>);
    const element = wrapper.getByText('button') as HTMLButtonElement;

    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();

    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
