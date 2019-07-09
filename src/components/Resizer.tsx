import * as React from "react";

import { SplitOrientation } from "./Split";

const {  useEffect } = React;

type Props = {
  orientation: SplitOrientation;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const Resizer: React.FC<Props> = ({ orientation, onMouseDown }) => {
  useEffect(() => {
    return () => {};
  }, []);

  let resizerClassName = "resizer";
  const isHorizontal = orientation === SplitOrientation.Horizontal;
  if (isHorizontal) {
    resizerClassName += " horizontal";
  } else {
    resizerClassName += " vertical";
  }

  return <div className={resizerClassName} onMouseDown={onMouseDown} />;
};
