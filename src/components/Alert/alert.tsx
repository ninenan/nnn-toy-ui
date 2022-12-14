import React, { PropsWithChildren, useState, ReactNode } from 'react';
import Transition from '../Transition';
import classNames from 'classnames';
import Icon from '../Icon';
import { voidFnType } from '../../typings';

export type AlertType =
  | 'success'
  | 'primary'
  | 'warning'
  | 'danger'
  | 'default';

export interface IAlertProps {
  // 标题
  title?: string;
  // 是否显示关闭按钮
  closable?: boolean;
  // 关闭 alert 时触发的事件
  onClose?: voidFnType;
  // 类型
  type?: AlertType;
  // 自定义关闭按钮
  customClose?: ReactNode;
  // 信息
  message: string;
  // 关闭动画结束后触发的回调函数
  afterClose?: voidFnType;
}

const Alert: React.FC<PropsWithChildren<IAlertProps>> = props => {
  const { title, closable, onClose, type, customClose, message, afterClose } =
    props;

  const [visible, setVisible] = useState(true);
  const classes = classNames('alert', {
    [`alert-${type}`]: type
  });

  const handleCloseClick = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const handleOnExtied = () => {
    if (afterClose) afterClose();
  };

  const customCloseEle = customClose || (
    <Icon icon="times" className="window-close" size="lg" />
  );

  return (
    <Transition
      in={visible}
      animation="zoom-in-top"
      timeout={300}
      unmountOnExit
      appear
      onExited={handleOnExtied}
    >
      <div className={classes}>
        {title && <h4 className="alert-title">{title}</h4>}
        <p className="alert-message">{message}</p>
        {closable && <i onClick={handleCloseClick}>{customCloseEle}</i>}
      </div>
    </Transition>
  );
};

// 也可以解构的时候直接赋默认值
Alert.defaultProps = {
  closable: true,
  type: 'primary'
};

export default Alert;
