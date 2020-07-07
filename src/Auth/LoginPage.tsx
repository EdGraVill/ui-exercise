import * as React from 'react';
import { useAuth } from './hooks';
import styled from 'styled-components';
import { Paper, Typography, makeStyles, TextField, Link, Button, Grid, CircularProgress } from '@material-ui/core';
import googleLogo from './googleLogo.svg';
import { useDispatch } from 'react-redux';
import { authActions } from './slicer';
import ErrorIcon from '@material-ui/icons/Error';
import { emailRegex } from '../util';

const Container = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

const useStyles = makeStyles({
  card: {
    alignItems: 'center',
    border: '1px solid #dadce0',
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '40px 40px 36px',
    maxWidth: 448,
    width: '100%',
  },
  title: {
    fontFamily: 'Product Sans',
    fontSize: 24,
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
  },
  input: {
    marginTop: 32,
    width: '100%',
  },
  disclaimer: {
    color: '#5f6368',
    fontSize: 14,
    marginTop: 32,
  },
  button: {
    fontFamily: 'Product Sans',
    marginTop: 32,
    textTransform: 'capitalize',
  },
  helperText: {
    fontSize: 12,
  },
  helperTextIcon: {
    fontSize: 14,
    marginRight: 8,
  },
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const { clearError, error, isLoading, loginFunction } = useAuth();

  const onLogin = React.useCallback(() => {
    if (email && ((email.includes('@') && emailRegex.test(email)) || (!email.includes('@')))) {
      loginFunction(email);
    } else if (!email) {
      dispatch(authActions.rejectUserInfo('Enter an email'));
    } else {
      dispatch(authActions.rejectUserInfo('Enter a valid email'));
    }
  }, [dispatch, email, loginFunction]);

  React.useEffect(() => {
    clearError();
  }, [clearError, email]);

  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.card}>
        <img src={googleLogo} alt="Google" />
        <Typography className={classes.title}>Sign In</Typography>
        <Typography className={classes.subtitle}>to continue to Gmail</Typography>
        <TextField
          className={classes.input}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={({ currentTarget: { value } }) => setEmail(value.trim())}
          error={!!error}
          helperText={error && (
            <Grid container>
              <ErrorIcon className={classes.helperTextIcon} />
              <Typography className={classes.helperText}>{error}</Typography>
            </Grid>
          )}
        />
        <Typography className={classes.disclaimer}>
          Not your computer? Use a private browsing window to sign in.{' '}
          <Link href="https://support.google.com/accounts?p=signin_privatebrowsing&hl=en">
            Learn more
          </Link>
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={onLogin}
        >
          {isLoading && <CircularProgress color="inherit" size={24} />}
          {!isLoading && 'Next'}
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
