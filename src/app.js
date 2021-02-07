import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { req } from './utils';

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
  
  const [input, setInput] = React.useState("0x0A, 0x04, 0x59, 0x6f, 0x4d, 0x6f")
  const [output, setOutput] = React.useState("")
  const [padded, setPadded] = React.useState(false)

  const handleChange = (event) => {
    setPadded(!padded)
  }

  const saveInput = (event) => {
    setInput(event.target.value)
  }

  const handleClick = async (event) => {
    const res = Promise.resolve(req(input, padded, event.currentTarget.name))
    res.then(function(v) {
        setOutput(v.result || v.error)
    })
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
          Y3 Codec Playground
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={padded}
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
          value={input}
          variant="outlined"
          onChange={saveInput}
          InputLabelProps={{ shrink: true }}
        />
        <ButtonGroup
          orientation="vertical"
          color="primary"
          variant="text"
        >
          <Button name="int32" onClick={handleClick}>int32</Button>
          <Button name="uint32" onClick={handleClick}>uint32</Button>
          <Button name="int64" onClick={handleClick}>int64</Button>
          <Button name="uint64" onClick={handleClick}>uint64</Button>
          <Button name="float32" onClick={handleClick}>float32</Button>
          <Button name="float64" onClick={handleClick}>float64</Button>
          <Button name="bool" onClick={handleClick}>bool</Button>
          <Button name="string" onClick={handleClick}>string</Button>
        </ButtonGroup>
        <TextField
          label="Output"
          multiline
          rows={16}
          variant="outlined"
          value={output}
          disabled
          InputLabelProps={{ shrink: true }}
        />
        </Grid>
      </Grid>
    </div>
  )
}
