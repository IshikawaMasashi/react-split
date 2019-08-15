import * as React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { Split, SplitOrientation, SplitInfo } from "../../src";

const { useEffect, useRef, useState } = React;

// スタイルを定義
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(6)
    },
    title: {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    },
    paper: {
      padding: 18
    }
  })
);

// props の型を定義
type Props = {
  title?: string;
};

// コンポーネントを定義
function Example1({ title }: Props) {
  // ここでクラス名を取得
  const classes = useStyles({});
  const [itemSize, setItemSize] = React.useState<number | number[]>(50);
  const handleChange = (event: any, newValue: number | number[]) => {
    setItemSize(newValue < 18 ? 18 : newValue);
  };

  const [splits, setSplits] = useState<SplitInfo[]>([
    {
      min: 300,
      max: 600,
      value: 300
    },
    {
      min: 256
    }
  ]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item></Grid>
        <Grid item>
          <Typography variant="h6" noWrap>
            Item height:
          </Typography>
        </Grid>
        <Grid item xs>
          <Slider
            value={itemSize}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Grid>
        <Grid item></Grid>
      </Grid>
      <div style={{ width: "100%" }}>
        <Split
          orientation={SplitOrientation.Vertical}
          splits={splits.slice()}
          onChange={splits => {
            // this.setState({ workspaceSplits: splits });
            setSplits(splits);
            // layout();
          }}
        >
          <div style={{ height: "200px" }}>test1</div>
          <div>test2</div>
        </Split>
      </div>
    </div>
  );
}

export default Example1;
