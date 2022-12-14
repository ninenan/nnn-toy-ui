import React, { FC, PropsWithChildren } from 'react';
import { IUploadFile } from '../upload';
import Icon from '../../Icon';
import { NOOP } from '../../../helpers/utils';
import Progress from '../../Progress';

export interface IUploadListProps {
  fileList: IUploadFile[]; // 文件列表
  onRemove?: (item: IUploadFile) => void; // 删除事件
  onPreview?: (item: IUploadFile) => void;
}

const UploadList: FC<PropsWithChildren<IUploadListProps>> = props => {
  const { fileList, onRemove = NOOP, onPreview = NOOP } = props;

  return (
    <ul className="nnn-upload-list">
      {fileList.map(file => {
        return (
          <li key={file.uid} className="nnn-upload-list-item">
            <span
              className={`file-name file-name-${file.status}`}
              onClick={() => onPreview(file)}
            >
              <Icon icon="file-alt" theme="secondary" />
              {file.name}
            </span>
            <span className="file-status">
              {(file.status === 'loading' || file.status === 'ready') && (
                <Icon icon="spinner" spin={true} theme="primary" />
              )}
              {file.status === 'success' && (
                <Icon icon="check-circle" theme="success" />
              )}
              {file.status === 'fail' && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>
            <span className="file-actions">
              <Icon icon="times" onClick={() => onRemove(file)} />
            </span>
            {file.status === 'loading' && <Progress percent={file.percent} />}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
