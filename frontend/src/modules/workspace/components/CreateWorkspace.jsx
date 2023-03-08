import React, { useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createBoard, createWorkspace } from '../core/workspace.slice';
import { useSelector } from 'react-redux';
import { MenuItem,TextField, Box,Select,FormControl,InputLabel,AccordionSummary,AccordionDetails,Accordion,Typography,Button ,Popover} from '@mui/material';

export default function MainLayoutNavCreateBtn() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { workspaces } = useSelector((state) => state.workspace);

  const boardRef = useRef(null);
  const workspaceSelectRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitWorkSpace = (inputWorkSpace) => {
    dispatch(
      createWorkspace({
        name: inputWorkSpace.workspace,
      })
    );
    reset();
    handleClose();
  };

  const onSubmitBoard = () => {
    const name = boardRef.current.value;
    const workspaceId = workspaceSelectRef.current.value;
    console.log(workspaceId);
    dispatch(
      createBoard({
        name,
        workspaceId,
      })
    );
    handleClose();
  };

  return (
    <div className="create-btn">
      <div aria-describedby={id} variant="contained" onClick={handleClick}>
        Create
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Create Board</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',

                alignItems: 'center',
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="input-board-name"
                label="Board title"
                variant="outlined"
                size="small"
                inputRef={boardRef}
              />

    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Workspace</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        label="Workspace"
        inputRef={workspaceSelectRef}
      >
  
          {workspaces.map((workspace) => (
                  <MenuItem key={workspace._id} value={workspace._id}>
                    {workspace.name}
                  </MenuItem>
                ))}
      </Select>
    </FormControl>
              <Button variant="contained" onClick={onSubmitBoard}>
                Create
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Create Workspace</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitWorkSpace)}
              sx={{
                '& > :not(style)': { m: 1, width: '20ch' },
                display: 'flex',
                flexDirection: 'column',

                alignItems: 'center',
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Workspace title"
                variant="outlined"
                size="small"
                {...register('workspace', {
                  required: true,
                  pattern: {
                    value: /^(?=)(?=).{4,15}$/,
                  },
                })}
              />
              {errors.workspace && (
                <p style={{ color: 'red', margin: '0', fontSize: '12px' }}>
                  Please enter a valid Workspace name
                </p>
              )}
              <Button type="submit" variant="contained">
                Create
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Popover>
    </div>
  );
}
