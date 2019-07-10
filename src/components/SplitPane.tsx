import * as React from 'react';

// const { useState, useEffect } = React;

type Props = {
  child: React.ReactNode;
  style: React.CSSProperties;
};

export const SplitPane: React.FC<Props> = ({ style, child }) => {
  //   const [collapsed, setCollapsed] = useState(true);

  // useEffect(() => {
  //   return () => {};
  // }, []);

  return (
    <div className={'split-pane'} style={style}>
      {child}
    </div>
  );
};
