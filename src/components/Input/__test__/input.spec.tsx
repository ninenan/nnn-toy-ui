import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input, { IInputProps } from '../input';

const defaultProps: IInputProps = {
  onChange: jest.fn(),
  placeholder: 'test-placeholder'
};

describe('test Input component', () => {
  it('render the default Input', () => {
    const wrapper = render(<Input {...defaultProps} />);
    const testInputNode = wrapper.getByPlaceholderText(
      'test-placeholder'
    ) as HTMLInputElement;

    expect(testInputNode).toBeInTheDocument();
    expect(testInputNode).toHaveClass('input-inner');

    fireEvent.change(testInputNode, { target: { value: '33' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testInputNode.value).toEqual('33');
  });

  it('disabled property', () => {
    const wrapper = render(<Input disabled {...defaultProps} />);
    const testInputNode = wrapper.getByPlaceholderText(
      'test-placeholder'
    ) as HTMLInputElement;

    expect(testInputNode.disabled).toBeTruthy();
  });

  it('test prefix and suffix property', () => {
    const { queryByText, container } = render(
      <Input prefix={'http://'} {...defaultProps} suffix={<div>.com</div>} />
    );
    const inputContainer = container.querySelector('.toy-input-wrapper');

    expect(inputContainer).toBeInTheDocument();
    expect(inputContainer).toHaveClass(
      'input-group input-group-prefix input-group-suffix'
    );
    expect(queryByText('http://')).toBeInTheDocument();
    expect(queryByText('.com')).toBeInTheDocument();
  });
});
