import '@testing-library/jest-dom/extend-expect';
import {
  createEvent,
  fireEvent,
  queryByText,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react';
import { upload } from '@testing-library/user-event/dist/upload';
import axios from 'axios';
import React from 'react';

import Upload, { IUploadProps } from '../upload';

const testProps: IUploadProps = {
  action: 'action.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  isDrag: true
};

jest.mock('../../Icon/index.tsx', () => {
  return (res: any) => {
    return <span onClick={res.onClick}>{res.icon}</span>;
  };
});

// jest mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

let wrapper: RenderResult | null = null;
let fileInput: HTMLInputElement | null = null;
let uploadEl: HTMLElement | null = null;
const testFile = new File(['testFile'], 'test.png', { type: 'image/png' });

describe('test Upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>upload file</Upload>);
    fileInput = wrapper?.container.querySelector('.nnn-file-input');
    uploadEl = wrapper.queryByText('upload file');
  });

  it('upload process should works file', async () => {
    // mock axios 的 post 成功返回值
    mockedAxios.post.mockResolvedValue({ data: 'testData' });

    expect(uploadEl).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [testFile] } });
    }

    expect(wrapper?.queryByText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(wrapper?.queryByText('test.png')).toBeInTheDocument();
      expect(wrapper?.queryByText('check-circle')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      { data: 'testData' },
      testFile
    );
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    // remove
    expect(wrapper?.queryByText('times')).toBeInTheDocument();
    if (wrapper?.queryByText('times')) {
      fireEvent.click(wrapper?.queryByText('times') as HTMLElement);
    }
    expect(wrapper?.queryByText('test.png')).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        source: testFile,
        status: 'success',
        name: 'test.png'
      })
    );
  });

  test('drag and drop', () => {
    if (uploadEl) {
      fireEvent.dragOver(uploadEl);
      expect(uploadEl).toHaveClass('is-dragover');
      fireEvent.dragLeave(uploadEl);
      expect(uploadEl).not.toHaveClass('is-dragover');

      // fireEvent.drop(uploadEl, {
      //   dataTransfer: {
      //     files: [testFile]
      //   }
      // });
      // await waitFor(() => {
      //   expect(wrapper?.queryByText('test.png')).toBeInTheDocument();
      // });

      // const mockDropEvent = createEvent.drop(uploadEl);
      // Object.defineProperty(mockDropEvent, 'dataTransfer', {
      //   value: {
      //     files: [testFile]
      //   }
      // });
      // fireEvent(uploadEl, mockDropEvent);
      // await waitFor(() => {
      //   expect(wrapper?.queryByText('test.png')).toBeInTheDocument();
      // });
    }
  });
});
