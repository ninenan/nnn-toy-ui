import React from 'react';
import { config } from 'react-transition-group';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  cleanup
} from '@testing-library/react';
import AutoComplete, {
  DataSourceType,
  IAutoCompleteProps
} from '../autoComplete';
import { wrap } from 'module';

// 设置了之后动画不会执行
config.disabled = true;

const testArr = [
  { value: 'test001', num: 1 },
  { value: 'test002', num: 2 },
  { value: 'test003', num: 3 },
  { value: 'test004', num: 4 },
  { value: 'test005', num: 5 }
];

const testProps: IAutoCompleteProps = {
  fetchOptions: query => testArr.filter(item => item.value.includes(query)),
  onSelect: jest.fn(),
  placeholder: 'test-auto-complete'
};

const testProps2: IAutoCompleteProps = {
  ...testProps,
  renderOptions: (item: DataSourceType<{ num?: number }>) => (
    <span>
      {item.value} --- {item.num}
    </span>
  )
};

let wrapper: RenderResult | null = null;
let inputNode: HTMLInputElement | null = null;

describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />) as RenderResult;
    inputNode = wrapper.getByPlaceholderText(
      'test-auto-complete'
    ) as HTMLInputElement;
  });

  it('test AutoComplete default property', async () => {
    if (inputNode && wrapper) {
      fireEvent.change(inputNode, { target: { value: 'test' } });
      await waitFor(() => {
        expect(wrapper?.queryByText('test001')).toBeInTheDocument();
      });

      expect(
        wrapper.container.querySelectorAll('.options-item').length
      ).toEqual(5);
      fireEvent.click(wrapper.getByText('test004'));
      expect(testProps.onSelect).toHaveBeenCalledWith({
        value: 'test004',
        num: 4
      });
      expect(wrapper.queryByText('test004')).not.toBeInTheDocument();
      expect(inputNode.value).toBe('test004');
    }
  });

  it('test keyboard operation', async () => {
    if (inputNode && wrapper) {
      fireEvent.change(inputNode, { target: { value: 'test' } });
      await waitFor(() => {
        expect(wrapper?.queryByText('test003')).toBeInTheDocument();
      });
      const firstRes = wrapper.queryByText('test001');
      const secondRes = wrapper.queryByText('test002');

      fireEvent.keyDown(inputNode, { code: 'ArrowDown' });
      expect(firstRes).toHaveClass('active');

      fireEvent.keyDown(inputNode, { code: 'ArrowDown' });
      expect(secondRes).toHaveClass('active');

      fireEvent.keyDown(inputNode, { code: 'ArrowUp' });
      expect(firstRes).toHaveClass('active');

      fireEvent.keyDown(inputNode, { code: 'Enter' });
      expect(testProps.onSelect).toHaveBeenCalledWith({
        value: 'test001',
        num: 1
      });
      expect(wrapper.queryByText('test001')).not.toBeInTheDocument();
    }
  });

  it('test click outside should hide the dropdown', async () => {
    if (inputNode && wrapper) {
      fireEvent.change(inputNode, { target: { value: '001' } });
      await waitFor(() => {
        expect(wrapper?.queryByText('test001')).toBeInTheDocument();
      });
      fireEvent.click(document);
      expect(wrapper?.queryByText('test001')).not.toBeInTheDocument();
    }
  });

  it('test render the custom template', async () => {
    cleanup();
    wrapper = render(<AutoComplete {...testProps2} />);
    inputNode = wrapper.getByPlaceholderText(
      'test-auto-complete'
    ) as HTMLInputElement;

    fireEvent.change(inputNode, { target: { value: '002' } });
    await waitFor(() => {
      expect(wrapper?.queryByText('test002 --- 2')).toBeInTheDocument();
    });

    expect(wrapper.container.querySelectorAll('.options-item').length).toEqual(
      1
    );
  });
});
