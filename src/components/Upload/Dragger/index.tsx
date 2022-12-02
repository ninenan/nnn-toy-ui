import React, { PropsWithChildren } from 'react';

export interface IDraggerProps {
  onFile: (files: FileList) => void;
}

const Dragger: React.FC<PropsWithChildren<IDraggerProps>> = props => {
  return <div>index</div>;
};

export default Dragger;
