import * as React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { useMount, useArray } from '@ishikawa_masashi/react-hooks';
import Split, { SplitOrientation, SplitInfo } from './Split';

type Props = {
  orientation?: SplitOrientation;
  sizes: SplitInfo[];
  children: React.ReactNode;
};

export type SplitViewRef = {
  getSizes: () => SplitInfo[];
  updateAt: (index: number, item: SplitInfo) => void;
};

const SplitView = forwardRef<SplitViewRef, Props>((props, ref) => {
  const { sizes, children, orientation = SplitOrientation.Vertical } = props;

  const splits = useArray<SplitInfo>([]);

  useMount(() => {
    splits.setValue(sizes);
    // setSplits(sizes);
  });

  // コンポーネントのインスタンスが持つメソッドを宣言
  useImperativeHandle(ref, () => ({
    getSizes() {
      return splits.value;
    },
    updateAt(index: number, item: SplitInfo) {
      splits.updateAt(index, item);
    },
  }));

  return (
    <Split
      orientation={orientation}
      splits={splits.value}
      onChange={(newSplits) => {
        splits.setValue(newSplits);
      }}
    >
      {children}
    </Split>
  );
});

export default SplitView;
