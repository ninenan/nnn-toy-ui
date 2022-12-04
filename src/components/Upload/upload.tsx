import axios from 'axios';
import React, {
  ChangeEvent,
  FC,
  PropsWithChildren,
  useRef,
  useState
} from 'react';
import { isPromise } from '../../helpers/utils';
import Dragger from './Dragger';
import UploadList from './UploadList';

export interface IUploadProps {
  // 属性
  action: string; // 上传接口
  headers?: Record<string, unknown>; // 请求头
  data?: Record<string, string>; // 请求扩展参数
  name?: string; // 自定义上传名
  withCredentials?: boolean; // 是否允许携带 cookie
  accept?: string; // 文件类型
  multiple?: boolean; // 是否多个
  isDrag?: boolean; // 是否可拖拽上传
  defaultUploadFileList?: UploadFile[]; // 默认已上传的文件列表
  beforeUpload?: (file: File) => boolean | Promise<File>; // 上传前事件
  onChange?: (file: File) => void; // 上传文件改变事件
  onRemove?: (file: UploadFile) => void; // 删除事件
  onProgress?: (percentage: number, file: File) => void; // 上传进度回调事件
  onSuccess?: (data: unknown, file: File) => void; // 成功回调事件
  onError?: (data: unknown, file: File) => void; // 失败回调事件
  onPreview?: (file: UploadFile) => void; // 上传成功文件操作事件
}

export type UploadFileStatus = 'ready' | 'loading' | 'success' | 'fail';

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  source?: File;
  response?: unknown;
  error?: unknown;
}

const Upload: FC<PropsWithChildren<IUploadProps>> = props => {
  const {
    action,
    headers,
    name = 'file',
    data,
    withCredentials,
    accept,
    multiple,
    defaultUploadFileList,
    isDrag,
    children,
    beforeUpload,
    onError,
    onSuccess,
    onProgress,
    onChange,
    onRemove,
    onPreview
  } = props;
  const fileEl = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(
    defaultUploadFileList || []
  );

  const uploadFiles = (files: FileList) => {
    const postFiles = [...files];

    postFiles.forEach(file => {
      if (!beforeUpload) {
        toUpload(file);
      } else {
        const res = beforeUpload(file);

        if (isPromise(res)) {
          res.then(correctFile => {
            toUpload(correctFile);
          });
        } else if (res) {
          toUpload(file);
        }
      }
    });
  };

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList(prevList => {
      return prevList.map(item => {
        if (item.uid === updateFile.uid) {
          return {
            ...item,
            ...updateObj
          };
        } else {
          return item;
        }
      });
    });
  };

  const toUpload = (file: File) => {
    const currentFile: UploadFile = {
      uid: Date.now() + '',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      source: file
    };
    setFileList(prevList => [currentFile, ...prevList]);

    const formData = new FormData();
    formData.append(name, file);
    if (data) {
      Object.entries(data).forEach(([key, val]) => {
        formData.append(key, val);
      });
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials,
        onUploadProgress: e => {
          let percentage = 0;
          if (e.total) {
            percentage = Math.round((e.loaded * 100) / e.total) || 0;
          }
          if (percentage <= 100) {
            updateFileList(currentFile, {
              percent: percentage,
              status: 'loading'
            });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        }
      })
      .then(resp => {
        console.log('resp', resp);
        updateFileList(currentFile, { status: 'success', response: resp.data });
        if (onSuccess) {
          onSuccess(resp, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch(err => {
        console.error(err);
        updateFileList(currentFile, { status: 'fail', error: err });
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileEl.current) {
      fileEl.current.value = '';
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

  /**
   * 触发 file 点击事件
   *
   */
  const handleChangeFile = () => {
    if (fileEl.current) {
      fileEl.current.click();
    }
  };

  return (
    <div className="nnn-upload-component">
      <div onClick={handleChangeFile} style={{ display: 'inline-block' }}>
        {isDrag ? <Dragger onFile={files => uploadFiles(files)} /> : children}
      </div>
      <input
        ref={fileEl}
        style={{ display: 'none' }}
        type="file"
        name="myFile"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
        onPreview={onPreview}
      ></UploadList>
    </div>
  );
};

export default Upload;
