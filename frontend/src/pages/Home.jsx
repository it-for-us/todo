import React from 'react';
import Card from '@mui/material/Card';
import { Container } from '@mui/system';
import { Box, CardContent, Typography, Button } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import WorkSpace from '../components/WorkSpace';
import { useDispatch } from 'react-redux';
import { logout } from '../modules/auth/_redux/auth-slice';

export default function Home() {
  const dispatch = useDispatch();
  const [message, setMesaage] = useState('');
  const [toggle, setToggle] = useState(false);
  const [workSpace, setWorkSpace] = useState([]);
  const { userData, setUserData } = useContext(UserContext);
  // userData[0].workSpace = workSpace;
  setUserData(userData, (userData[0].workSpace = workSpace));
  console.log(userData);
  console.log(workSpace);
  const errorMessage =
    'Workspace and Board names can contain letters (a-z), numbers(0-9), and an underline(_) and it can have 4-15 characters long. It can start only letter or number';
  const inputError = (
    <Typography
      variant="subtitle2"
      sx={{
        color: 'red',
        bgcolor: 'gray',
        textAlign: 'center',
        borderRadius: '32px',
      }}
    >
      Please try a valid name
    </Typography>
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (inputWorkSpace) => {
    console.log(inputWorkSpace);
    const workSpaceName = workSpace.map((el) => {
      return el.workSpaceName.toLowerCase();
    });

    if (workSpaceName.includes(inputWorkSpace.workSpaceName.toLowerCase())) {
      setMesaage(<p>This name already exist</p>);
    } else {
      setWorkSpace([
        ...workSpace,
        {
          workSpaceName: inputWorkSpace.workSpaceName,
          boardsName: [{ boardName: inputWorkSpace.boardName }],
        },
      ]);
      setMesaage('');
      setToggle(!toggle);
      reset();
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="home-page">
      <div className="d-grid">
        <button
          onClick={logoutHandler}
          className="btn btn-danger btn-lg mx-auto my-4 w-100"
        >
          Logout
        </button>
      </div>
      {!toggle ? (
        <div className="home">
          <Container
            sx={{
              color: 'white',
              mt: 8,
            }}
          >
            <Grid
              container
              spacing={1}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: 'white',
              }}
            >
              <Grid item xs={3}></Grid>

              <Grid item xs={6}>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  Welcome DART
                </Typography>
                <Card
                  sx={{
                    bgcolor: 'rgba(175,149,213,255)',
                    borderRadius: '16px',
                    margin: 'auto',
                    mt: 2,
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        margin: 'auto',
                      }}
                    >
                      Firstly create a workspace and a board than start add your post-it
                    </Typography>

                    <Container component="main" maxWidth="xs">
                      <Box
                        component="form"
                        textAlign="center"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            textAlign: 'left',
                            color: 'white',
                            mt: 2,
                          }}
                        >
                          WORKSPACE NAME*
                        </Typography>
                        {errors.workSpaceName?.message ? inputError : ''}
                        {message}
                        <InputBase
                          sx={{
                            bgcolor: 'white',
                            borderRadius: '16px',
                          }}
                          name="workSpaceName"
                          id="workspacename"
                          fullWidth
                          autoFocus
                          {...register('workSpaceName', {
                            required: 'true',
                            pattern: {
                              value: /^[a-zA-Z0-9][a-zA-Z0-9_]{4,15}$/,
                              message: 'true',
                            },
                          })}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            textAlign: 'left',
                            color: 'white',
                            mt: 2,
                          }}
                        >
                          BOARD NAME*
                        </Typography>

                        {errors.boardName?.message ? inputError : ''}
                        <InputBase
                          sx={{
                            bgcolor: 'white',
                            borderRadius: '16px',
                          }}
                          fullWidth
                          autoFocus
                          name="BoardName"
                          id="boardName"
                          {...register('boardName', {
                            required: 'true',
                            pattern: {
                              value: /^[a-zA-Z0-9][a-zA-Z0-9_]{3,14}$/,
                              message: 'true',
                            },
                          })}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ bgcolor: '#b498ce', mt: 2 }}
                        >
                          Create
                        </Button>
                      </Box>
                    </Container>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{
                    bgcolor: 'rgba(175,149,213,255)',
                    borderRadius: '5%',
                    color: 'black',
                    mt: 8,
                  }}
                >
                  {' '}
                  <Typography component="h1" variant="body2">
                    {errors.workSpaceName?.message || errors.boardName?.message
                      ? errorMessage
                      : ''}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : (
        <WorkSpace workSpace={workSpace} setWorkSpace={setWorkSpace} />
      )}
    </div>
  );
}
