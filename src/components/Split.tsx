import * as React from 'react';
import { MouseEvent } from 'react';
// import { EventDispatcher } from "../../models";
import { assert, layout } from '../utils/util';
import { toCSSPx } from '../utils/splitUtils';
import { Solver, Variable, Strength, Constraint, Operator } from '../cassowary';
import { SplitPane } from './SplitPane';
import { Resizer } from './Resizer';

const { useState, useEffect, useRef } = React;
export enum SplitOrientation {
  Horizontal,
  Vertical
}

export interface SplitInfo {
  min?: number;
  max?: number;
  value?: number;
  resize?: 'fixed' | 'stretch';
}

type Props = {
  orientation: SplitOrientation;
  onChange?: (splits: SplitInfo[]) => void;
  splits?: SplitInfo[];
  defaultSplit?: SplitInfo;
  children: React.ReactNode;
  name?: string; // TODO: Remove, for debugging.
};

// type State = {
//   splits: SplitInfo[];
// };

// const onResizeBegin = new EventDispatcher("Resize Begin");
// const onResizeEnd = new EventDispatcher("Resize End");
export const Split: React.FC<Props> = props => {
  let containerRef = useRef<HTMLDivElement>(null);
  let indexRef = useRef(-1);
  let solverRef = useRef<Solver>();
  let varsRef = useRef<Variable[]>();
  let splitsRef = useRef<SplitInfo[]>([]);

  const useForceUpdate = () => {
    const [, setState] = useState();
    return () => setState({});
  };
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    document.addEventListener('mousemove', onResizerMouseMove as any);
    document.addEventListener('mouseup', onResizerMouseUp);
    const newSplits = canonicalizeSplits(props);
    setupSolver(newSplits, getContainerSize(props.orientation));
    querySolver(newSplits);
    splitsRef.current = newSplits;
    // forceUpdate();
    props.onChange && props.onChange(newSplits);

    return () => {
      document.removeEventListener('mousemove', onResizerMouseMove as any);
      document.removeEventListener('mouseup', onResizerMouseUp);
    };
  }, []);

  useEffect(() => {
    onResizerMouseUp();
    const splits = canonicalizeSplits(props);
    setupSolver(splits, getContainerSize(props.orientation));
    querySolver(splits);
    splitsRef.current = splits;
    forceUpdate();
    layout();
  }, [props]);

  const onResizerMouseDown = (i: number) => {
    indexRef.current = i;
    const index = indexRef.current;
    const vars = varsRef.current!;
    const solver = solverRef.current!;
    const varilable = vars[index + 1];
    solver.removeEditVariable(varilable);
    solver.addEditVariable(varilable, Strength.medium);
    // Split.onResizeBegin.dispatch(this);
    window.document.documentElement.style.pointerEvents = 'none';
  };

  /**
   * This fires for all splits, even if the resizer doesn't belong to this split.
   */
  const onResizerMouseUp = () => {
    if (indexRef.current < 0) {
      return;
    }
    indexRef.current = -1;
    // Split.onResizeEnd.dispatch(this);
    window.document.documentElement.style.pointerEvents = 'auto';
    const newSplits = splitsRef.current.slice();
    querySolver(newSplits);
    return props.onChange && props.onChange(newSplits);
  };

  const onResizerMouseMove = (e: MouseEvent<any>) => {
    if (indexRef.current < 0) {
      return;
    }
    const vars = varsRef.current!;
    const isVertical = props.orientation === SplitOrientation.Vertical;
    const container = containerRef.current!;
    const rect = container.getBoundingClientRect();
    const mouseOffset = isVertical
      ? e.clientX - rect.left
      : e.clientY - rect.top;

    const index = indexRef.current;
    const solver = solverRef.current!;
    solver.suggestValue(vars[index + 1], mouseOffset);
    // this.solver.resolve();
    solver.updateVariables();
    const newSplits = splitsRef.current.slice();
    querySolver(newSplits);
    forceUpdate();
    e.preventDefault();
  };

  const querySolver = (splits: SplitInfo[]) => {
    const vars = varsRef.current!;
    for (let i = 0; i < splits.length; i++) {
      splits[i].value = vars[i + 1].value() - vars[i].value();
    }
  };

  const getContainerSize = (orientation: SplitOrientation): number => {
    const container = containerRef.current!;
    return orientation === SplitOrientation.Horizontal
      ? container.clientHeight
      : container.clientWidth;
  };

  const canonicalizeSplits = (props: Props): SplitInfo[] => {
    const count = React.Children.count(props.children);
    const containerSize = getContainerSize(props.orientation);
    const result = [];
    for (let i = 0; i < count; i++) {
      let info = {};
      if (props.splits && i < props.splits.length) {
        info = Object.assign(info, props.splits[i]);
      }
      if (props.defaultSplit) {
        info = Object.assign(props.defaultSplit, info);
      }

      result.push(
        Object.assign(
          {
            min: 32,
            max: containerSize
          },
          info
        )
      );
    }
    return result;
  };

  /**
   * Initializes a Cassowary solver and the constraints based on split infos and container size.
   */
  const setupSolver = (splits: SplitInfo[], containerSize: number) => {
    assert(indexRef.current < 0, 'Should not be in a dragging state.');
    //const weak = Cassowary.Strength.weak;
    //// const medium = Cassowary.Strength.medium;
    //const strong = Cassowary.Strength.strong;
    //const required = Cassowary.Strength.required;

    ////function eq(a1: any, a2: any, strength: number, weight?: number) {
    ////    return new Cassowary.Equation(a1, a2, strength || weak, weight || 0);
    ////}

    //function geq(a1: any, a2: any, strength: any, weight?: number) {
    //  return new Cassowary.Inequality(a1, Cassowary.GEQ, a2, strength, weight);
    //}

    //function leq(a1: any, a2: any, strength: any, weight?: number) {
    //  return new Cassowary.Inequality(a1, Cassowary.LEQ, a2, strength, weight);
    //}

    // f     1               2           3   ...    l
    // |-----|---------------|-----------|----------|

    // const vars: CassowaryVar[] = this.vars = [new Cassowary.Variable()];
    varsRef.current = [new Variable()];
    const vars = varsRef.current;
    solverRef.current = new Solver();
    const solver = solverRef.current;

    // Create Cassowary variables, these the dragged position as an offset from the origin.
    for (let i = 0; i < splits.length; i++) {
      vars.push(new Variable());
    }

    solver.addEditVariable(vars[0], Strength.strong);
    solver.suggestValue(vars[0], 0);

    let cn = new Constraint(vars[0], Operator.Eq, 0);
    solver.addConstraint(cn);

    solver.addEditVariable(vars[vars.length - 1], Strength.strong);
    solver.suggestValue(vars[vars.length - 1], containerSize);

    cn = new Constraint(vars[vars.length - 1], Operator.Eq, containerSize);
    solver.addConstraint(cn);

    for (let i = 0; i < vars.length - 1; i++) {
      const { min, max } = splits[i];
      const left = vars[i];
      const right = vars[i + 1];
      solver.addConstraint(
        new Constraint(right.minus(left), Operator.Ge, min, Strength.strong)
      );
      solver.addConstraint(
        new Constraint(right.minus(left), Operator.Le, max, Strength.strong)
      );
    }

    // Add stays for the variables representing the dragged panes. This causes them to
    // try and remain in their dragged position unless the constraints prevent that.
    for (let i = 1; i < vars.length - 1; i++) {
      // solver.addStay(vars[i], weak);
      solver.addEditVariable(vars[i], Strength.weak);
      solver.suggestValue(vars[i], 10000);
    }

    suggestVarValues(splits);
  };

  const suggestVarValues = (splits: SplitInfo[]) => {
    const vars = varsRef.current!;
    const solver = solverRef.current!;
    for (let i = 0; i < vars.length - 1; i++) {
      const x = vars[i];
      const y = vars[i + 1];

      if (splits[i].value) {
        if (i < vars.length - 2) {
          solver.suggestValue(y, x.value() + splits[i].value!);
        } else {
          solver.suggestValue(x, y.value() - splits[i].value!);
        }
        solver.updateVariables();
      }
    }
  };
  const isHorizontal = props.orientation === SplitOrientation.Horizontal;
  const count = React.Children.count(props.children);
  const children: React.ReactNode[] = [];
  React.Children.forEach(props.children, (child, i) => {
    const style: React.CSSProperties = {};
    if (i < count - 1 && i < splitsRef.current.length) {
      style.flexBasis = toCSSPx(
        Math.round(splitsRef.current[i].value as number)
      );
    } else {
      style.flex = 1;
    }

    children.push(<SplitPane key={i} style={style} child={child} />);
    if (i < count - 1) {
      children.push(
        <Resizer
          key={`Resizer-${i}`}
          orientation={props.orientation}
          onMouseDown={ev => onResizerMouseDown(i)}
        />
      );
    }
  });
  return (
    <div
      className="split"
      ref={containerRef}
      style={{ flexDirection: isHorizontal ? 'column' : 'row' }}
    >
      {children}
    </div>
  );
};
