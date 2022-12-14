import React, { CSSProperties, FC, PropsWithChildren } from 'react';
import type { ThemeType } from '../../typings';

export interface IProgressProps {
  percent: number;
  isShowText?: boolean;
  styles?: CSSProperties;
  theme?: ThemeType;
  customHeight?: number;
}

const Progress: FC<PropsWithChildren<IProgressProps>> = props => {
  const {
    percent = 0,
    customHeight = 15,
    isShowText = true,
    styles,
    theme = 'primary'
  } = props;
  return (
    <div className="nnn-progress-bar" style={styles}>
      <div className="nnn-progress-bar-outer" style={{ height: customHeight }}>
        <div
          className={`nnn-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {isShowText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

export default Progress;
