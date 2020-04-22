import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import GetApp from '@material-ui/icons/GetApp';
import Build from '@material-ui/icons/Build';
import Split, { SplitOrientation, SplitInfo, SplitView } from '../../src';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import okaidia from 'react-syntax-highlighter/dist/esm/styles/prism/okaidia';
// const styles = require("react-syntax-highlighter/dist/esm/styles/prism");

// スタイルを定義
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    title: {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    paper: {
      padding: 18,
      margin: 18,
      backgroundColor: '#f5f5f5',
    },
    grid: {
      //   color: "#fff",
      //   background: "#2C7575",
      //   backgroundImage: "linear-gradient(120deg, #023463, #149454)"
      // margin: 36
    },
    icon: {
      margin: theme.spacing(1),
      fontSize: 32,
    },
    container: {
      color: '#1976d2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      color: '#1976d2',
      display: 'flex',
      alignItems: 'center',
    },
  })
);

// props の型を定義
// type Props = {
// };

// コンポーネントを定義
function Home() {
  // ここでクラス名を取得
  const classes = useStyles({});
  const [itemSize, setItemSize] = useState<number | number[]>(50);
  const handleChange = (event: any, newValue: number | number[]) => {
    setItemSize(newValue < 18 ? 18 : newValue);
  };

  const sizes = [
    {
      // min: 300,
      // max: 600,
      value: 300,
    },
    {
      value: 300,
      // min: 256
    },
    {
      value: 300,
    },
  ];

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <div className={classes.container}>
            <Typography variant="h4" noWrap>
              React Split
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.container}>
            <Typography variant="h6" noWrap>
              A tiny but mighty split library, with zero dependencies💪
            </Typography>
          </div>
        </Grid>
      </Grid>

      <Paper className={classes.paper} elevation={0}>
        <div className={classes.label}>
          <GetApp className={classes.icon} />
          <Typography variant="h5" noWrap>
            react-split
          </Typography>
        </div>
        <div style={{ width: '100%' }}>
          {/* <Split
            orientation={SplitOrientation.Vertical}
            splits={splits.slice()}
            onChange={newSplits => {
              setSplits(newSplits);
            }}
          >
            <div className={'pane1'} style={{ height: '200px' }}>
              Pane1
            </div>
            <div className={'pane2'} style={{ height: '200px' }}>
              Pane2
            </div>
            <div className={'pane3'} style={{ height: '200px' }}>
              Pane2
            </div>
          </Split> */}
          <SplitView sizes={sizes}>
            <div className={'pane1'} style={{ height: '200px' }}>
              Pane1
            </div>
            <div className={'pane2'} style={{ height: '200px' }}>
              Pane2
            </div>
            <div className={'pane3'} style={{ height: '200px' }}>
              Pane2
            </div>
          </SplitView>
        </div>
      </Paper>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.label}>
          <GetApp className={classes.icon} />
          <Typography variant="h5" noWrap>
            Installation
          </Typography>
        </div>
        <Typography component="p">
          Install React Split source files via npm.
        </Typography>
        <SyntaxHighlighter language="basic" style={okaidia}>
          {'$ npm install @ishikawa_masashi/react-split'}
        </SyntaxHighlighter>
      </Paper>

      <Paper className={classes.paper} elevation={0}>
        <div className={classes.label}>
          <Build className={classes.icon} />
          <Typography variant="h5" noWrap>
            Usage
          </Typography>
        </div>
        <Typography component="p"></Typography>
        <SyntaxHighlighter language="jsx" style={okaidia}>
          {`import { Split, SplitOrientation, SplitInfo } from "@ishikawa_masashi/react-split";
const [splits, setSplits] = useState<SplitInfo[]>([
  {
    value: 300
  },
  {
    value: 300
  },
  {
    value: 300
  }
]);
<Split
  orientation={SplitOrientation.Vertical}
  splits={splits.slice()}
  onChange={splits => {
    setSplits(splits);
  }}
>
  <div className={"pane1"} style={{ height: "200px" }}>
    Pane1
  </div>
  <div className={"pane2"} style={{ height: "200px" }}>
    Pane2
  </div>
  <div className={"pane3"} style={{ height: "200px" }}>
    Pane2
  </div>
</Split>
`}
        </SyntaxHighlighter>
      </Paper>
    </div>
  );
}

export default Home;
