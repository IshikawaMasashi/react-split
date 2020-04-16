import { useState } from 'react';
import { SplitInfo } from '../components/Split';

export default function useSplits(initialValue: SplitInfo[]) {
  return useState(initialValue);
}
