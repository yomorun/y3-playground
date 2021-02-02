import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '64ch',
    },
  },
}));

export default function App() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    // default values
    userInput: "0x01, 0x01, 0x7F",
    decoderOutput: ""
  });

  const handleChange = (event) => {
    setState({ includeTL: !state.includeTL });
  };

  const saveInput = (event) => {
    setState({ userInput: event.target.value })
  }

  const handleClick = (event) => {
    console.log(event.currentTarget.name)
    setState({ decoderOutput: state.userInput })
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="center"
        style={{ minHeight: '64vh' }}
      >
        <Typography variant="h2">
          Yomo Playground
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={state.includeTL || false}
              color="primary"
              onChange={handleChange}
            />
          }
          label="Include TL"
        />
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
        <TextField
          label="Input"
          multiline
          rows={16}
          defaultValue={state.userInput}
          variant="outlined"
          onChange={saveInput}
          InputLabelProps={{ shrink: true }}
        />
        <ButtonGroup
          orientation="vertical"
          color="primary"
          variant="text"
        >
          <Button name="int16" onClick={handleClick}>int16</Button>
          <Button name="int32" onClick={handleClick}>int32</Button>
          <Button name="int64" onClick={handleClick}>int64</Button>
          <Button name="string" onClick={handleClick}>string</Button>
        </ButtonGroup>
        <TextField
          label="Output"
          multiline
          rows={16}
          variant="outlined"
          defaultValue={state.decoderOutput}
          value={state.decoderOutput}
          disabled
          InputLabelProps={{ shrink: true }}
        />
        </Grid>
      </Grid>
    </div>
  );
}
