import * as React from 'react';
import { useEffect } from 'react';
import { SplitOrientation } from './Split';

type Props = {
  orientation: SplitOrientation;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function Resizer(props: Props) {
  const { orientation, onMouseDown } = props;
  useEffect(() => {
    return () => {};
  }, []);

  let resizerClassName = 'resizer';
  const isHorizontal = orientation === SplitOrientation.Horizontal;
  if (isHorizontal) {
    resizerClassName += ' horizontal';
  } else {
    resizerClassName += ' vertical';
  }

  return <div className={resizerClassName} onMouseDown={onMouseDown} />;
}
