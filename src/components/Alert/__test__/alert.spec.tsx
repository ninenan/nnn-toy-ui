import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Alert, { IAlertProps } from '../index';

const testAlertProps: IAlertProps = {
  message: 'test-message',
  title: 'test-title',
  closable: true,
  type: 'primary'
};

const testSuccessAlertProps: IAlertProps = {
  message: 'test-message',
  title: 'test-title',
  closable: true,
  type: 'success'
};

describe('test Alert Component', () => {
  it('render the default property', async () => {
    const wrapper = render(<Alert {...testAlertProps} />);
    const messageNode = wrapper.getByText('test-message');

    expect(messageNode).toBeInTheDocument();
    expect(messageNode.tagName).toEqual('P');
    expect(messageNode).toHaveClass('alert-message');
    expect(messageNode.parentNode).toHaveClass('alert-primary alert');

    const titleNode = wrapper.getByText('test-title');
    expect(titleNode).toBeInTheDocument();
    expect(titleNode.tagName).toEqual('H4');
    expect(titleNode).toHaveClass('alert-title');
    expect(titleNode.parentNode).toHaveClass('alert-primary alert');
    expect(titleNode.parentNode).toBe(messageNode.parentNode);

    const iconNode = wrapper.container.querySelector(
      '.toy-icon'
    ) as HTMLElement;
    expect(iconNode).toBeInTheDocument();
    fireEvent.click(iconNode);
    await waitFor(() => {
      expect(messageNode).not.toBeInTheDocument();
    });
  });

  it('render the success alert Component', async () => {
    const wrapper = render(<Alert {...testSuccessAlertProps} />);
    const messageNode = wrapper.getByText('test-message');

    expect(messageNode).toBeInTheDocument();
    expect(messageNode.tagName).toEqual('P');
    expect(messageNode).toHaveClass('alert-message');
    expect(messageNode.parentNode).toHaveClass('alert-success alert');

    const titleNode = wrapper.getByText('test-title');
    expect(titleNode).toBeInTheDocument();
    expect(titleNode.tagName).toEqual('H4');
    expect(titleNode).toHaveClass('alert-title');
    expect(titleNode.parentNode).toHaveClass('alert-success alert');
    expect(titleNode.parentNode).toBe(messageNode.parentNode);

    const iconNode = wrapper.container.querySelector(
      '.toy-icon'
    ) as HTMLElement;
    expect(iconNode).toBeInTheDocument();
    fireEvent.click(iconNode);
    await waitFor(() => {
      expect(messageNode).not.toBeInTheDocument();
    });
  });
});
