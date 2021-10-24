import { useContext } from 'react';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { FirebaseContext } from '../..';

const Login = () => {
  const { auth } = useContext(FirebaseContext);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.log('error', error.message);
    }
  };

  return (
    <Container>
      <Grid container style={{ height: window.innerHeight - 64 }} justifyContent="center" alignItems="center">
        <Grid
          style={{ width: 400, background: 'rgb(90, 159, 227)' }}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={5}>
            <Button variant="outlined" style={{ color: '#fff', borderColor: '#fff' }} onClick={handleLogin}>
              Login with Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
