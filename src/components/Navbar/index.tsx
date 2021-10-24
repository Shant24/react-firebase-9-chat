import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import styles from './styles.module.scss';
import useAuth from '../../hooks/useAuth';
import { LOGIN_ROUTE } from '../../utils/constants';

const Navbar = () => {
  const { user, auth } = useAuth();

  const handleSignOut = () => auth.signOut();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Firebase Chat
          </Typography>

          {user ? (
            <Button variant="outlined" color="inherit" onClick={handleSignOut}>
              Logout
            </Button>
          ) : (
            <Link to={LOGIN_ROUTE} className={styles.loginLink}>
              <Button variant="outlined" color="inherit">
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
