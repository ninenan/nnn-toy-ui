import classNames from 'classnames';
import React, { DragEvent, PropsWithChildren, useState } from 'react';
import Icon from '../../Icon';
// import './index.scss';

export interface IDraggerProps {
  onFile: (files: FileList) => void;
}

const Dragger: React.FC<PropsWithChildren<IDraggerProps>> = props => {
  const { onFile, children } = props;
  const [isDragOver, setIsDragOver] = useState(false);
  const classes = classNames('', {
    'is-dragover': isDragOver,
    'nnn-uploader-dragger': !children
  });

  const handleDrag = (e: DragEvent<HTMLElement>, isDragOver: boolean) => {
    e.preventDefault();
    setIsDragOver(isDragOver);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    console.log('handleDrag: ', e.dataTransfer.files);
    onFile(e.dataTransfer.files);
  };

  const renderDefaultIcon = () => {
    return (
      <div className="default-drag-icon__container">
        <Icon icon="upload" className="drag-icon"></Icon>
      </div>
    );
  };

  return (
    <div
      className={classes}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children ? children : renderDefaultIcon()}
    </div>
  );
};

export default Dragger;
