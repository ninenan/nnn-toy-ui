import axios from 'axios';
import React, { ChangeEvent, FC, PropsWithChildren, useRef } from 'react';
import { isPromise } from 'util/types';
import Button from '../Button';

export interface IUploadProps {
  action: string; // 上传接口
  headers?: Record<string, unknown>; // 请求头
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onProgress?: (percentage: number, file: File) => void; // 上传进度回调事件
  onSuccess?: (data: unknown, file: File) => void; // 成功回调事件
  onError?: (data: unknown, file: File) => void; // 失败回调事件
}

const Upload: FC<PropsWithChildren<IUploadProps>> = props => {
  const {
    action,
    headers,
    beforeUpload,
    onError,
    onSuccess,
    onProgress,
    onChange
  } = props;
  const fileEl = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFile(files);
    if (fileEl.current) {
      fileEl.current.value = '';
    }
  };

  const uploadFile = (files: FileList) => {
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

  const toUpload = (file: File) => {
    const formData = new FormData();
    formData.append(file.name, file);

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: e => {
          let percentage = 0;
          if (e.total) {
            percentage = Math.round((e.loaded * 100) / e.total) || 0;
          }
          if (percentage <= 100) {
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        }
      })
      .then(resp => {
        console.log('resp', resp);
        if (onSuccess) {
          onSuccess(resp, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch(err => {
        console.error(err);
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
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
      <Button btnType="primary" onClick={handleChangeFile}>
        upload file
      </Button>
      <input
        ref={fileEl}
        style={{ display: 'none' }}
        type="file"
        name="myFile"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Upload;
