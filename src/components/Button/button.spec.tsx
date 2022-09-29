import React from 'react';
import Button from './button';
import { render, fireEvent } from '@testing-library/react';

const defaultProps = {
  onClick: jest.fn()
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
});
