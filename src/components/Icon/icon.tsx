import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
// fas 表示 '@fortawesome/free-solid-svg-icons' 中所有的图标
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';
library.add(fas);

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<PropsWithChildren<IconProps>> = props => {
  const { className, theme, ...restProps } = props;
  const classes = classNames('toy-icon', className, {
    [`icon-${theme}`]: theme
  });

  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
