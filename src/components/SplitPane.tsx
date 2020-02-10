import * as React from 'react';

type Props = {
  child: React.ReactNode;
  style: React.CSSProperties;
};

export default function SplitPane(props: Props) {
  const { style, child } = props;
  return (
    <div className={'split-pane'} style={style}>
      {child}
    </div>
  );
}
