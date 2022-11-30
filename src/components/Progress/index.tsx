import React, { CSSProperties, FC, PropsWithChildren } from 'react';
import type { ThemeType } from '../../typings';

export interface IProgressProps {
  percnet: number;
  isShowText?: boolean;
  styles?: CSSProperties;
  theme?: ThemeType;
  customHeight?: number;
}

const Progress: FC<PropsWithChildren<IProgressProps>> = props => {
  const { percnet, customHeight, isShowText, styles, theme } = props;
  return (
    <div className="nnn-progress-bar" style={styles}>
      <div className="nnn-progress-bar-outer" style={{ height: customHeight }}>
        <div
          className={`nnn-progress-bar-inner color-${theme}`}
          style={{ width: `${percnet}%` }}
        >
          {isShowText && <span className="inner-text">{`${percnet}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  percnet: 0,
  customHeight: 15,
  isShowText: true,
  theme: 'primary'
};

export default Progress;
