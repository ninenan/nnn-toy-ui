import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import axios from 'axios';
import React from 'react';

import Upload, { IUploadProps } from '../upload';

const testProps: IUploadProps = {
  action: 'action.com',
  onSuccess: jest.fn(),
  onChange: jest.fn()
};

jest.mock('../../Icon/index.tsx', () => {
  return (res: any) => {
    return <span onClick={res.onClick}>{res.icon}</span>;
  };
});

jest.mock('axios');

let wrapper: RenderResult | null = null;
let fileInput: HTMLInputElement | null = null;
let uploadArea: HTMLElement | null = null;
const testFile = new File(['testFile'], 'test.png', { type: 'image/png' });

describe('test Upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>upload file</Upload>);
    fileInput = wrapper?.container.querySelector('nnn-file-input');
    uploadArea = wrapper?.queryByText('upload file');
  });

  it('upload process should works file', async () => {
    // const { queryByText } = wrapper;
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [testFile] } });
    }
  });
});
