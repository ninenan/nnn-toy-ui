import React, { PropsWithChildren, FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type AnimationName =
  | 'zoom-in-bottom'
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-right';

export type TransitionProps<Ref extends HTMLElement | undefined = undefined> =
  CSSTransitionProps<Ref> & {
    animation?: AnimationName;
    wrapper?: boolean; // 防止子元素本身也带有 transition 的属性，导致动画失效
  };

const Transition: FC<PropsWithChildren<TransitionProps>> = props => {
  const { children, classNames, animation, wrapper, ...restProps } = props;

  return (
    <CSSTransition classNames={classNames || animation} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

export default Transition;
