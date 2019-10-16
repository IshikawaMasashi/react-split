import * as React from 'react';

type Props = {
  child: React.ReactNode;
  style: React.CSSProperties;
};

export const SplitPane: React.FC<Props> = ({ style, child }) => {
  return (
    <div className={'split-pane'} style={style}>
      {child}
    </div>
  );
};
