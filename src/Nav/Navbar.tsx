import * as React from 'react';
import styled, { css } from 'styled-components';
import { useSwitch } from '../util';
import { IconButton, makeStyles, InputBase, fade, Avatar as MaterialAvatar, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { useSelector, useDispatch } from 'react-redux';
import { userInfoSelector, authActions } from '../Auth';
import InboxIcon from '@material-ui/icons/Inbox';
import { mailsTagsSelector } from '../Mail/selectors';
import { useHistory, useLocation, Redirect } from 'react-router-dom';

const Container = styled.div<{ isOpened: boolean }>`
  ${({ isOpened }) => css`
    align-items: stretch;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    transition: all .3s cubic-bezier(.25, .8, .25, 1);
    width: ${isOpened ? 256 : 72}px;

    @media screen and (max-width: 400px) {
      width: ${isOpened ? 256 : 0}px;
    }
  `}
`;

const Header = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  padding: 8px;
  width: 100vw;
`;

const Logo = styled.img`
  margin-right: 70px;

  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const Avatar = styled(MaterialAvatar)`
`

const Links = styled.div`
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  padding: 30px 12px 0 20px;
  width: 100%;
`;

const useStyles = makeStyles(theme => ({
  button: {
    margin: '0 4px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    flexGrow: 1,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  avatar: {
    padding: 0,
  },
  link: {
    borderRadius: 18,
    fontSize: 14,
    textTransform: 'capitalize',
    '&.active': {
      backgroundColor: '#fce8e6',
      color: '#d93025',
      fontWeight: 'bold',
    },
  },
  linkText: {
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  linkIcon: {
    marginRight: 18,
    paddingLeft: 6,
  },
}));

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const [isOpened, switchNavbar] = useSwitch(true);
  const tags = useSelector(mailsTagsSelector);
  const { pathname } = useLocation();
  const { push } = useHistory();

  const classes = useStyles();

  const onLogout = React.useCallback(() => {
    dispatch(authActions.restoreDefault());
  }, [dispatch]);

  const goTo = React.useCallback((path: string) => () => {
    push(path);
  }, [push]);

  if (!userInfo) {
    return null;
  }

  return (
    <Container isOpened={isOpened}>
      {pathname === '/ui-exercise' && <Redirect to="/" />}
      <Header>
        <IconButton className={classes.button} onClick={switchNavbar}>
          <MenuIcon />
        </IconButton>
        <Logo
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png"
          srcSet="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png 1x, https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x.png 2x "
          alt=""
          aria-hidden="true"
        />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <IconButton className={classes.avatar} onClick={onLogout}>
          <Avatar alt={userInfo.first_name} src={userInfo.avatar} />
        </IconButton>
      </Header>
      <Links>
        <Button
          color="default"
          classes={{ root: classes.link, label: classes.linkText }}
          className={pathname === '/' ? 'active' : ''}
          onClick={goTo('/')}
          startIcon={<InboxIcon className={classes.linkIcon} />}
          variant="text"
        >
          Inbox
        </Button>
        <Button
          color="default"
          classes={{ root: classes.link, label: classes.linkText }}
          className={pathname === '/starred' ? 'active' : ''}
          onClick={goTo('/starred')}
          startIcon={<StarIcon className={classes.linkIcon} />}
          variant="text"
        >
          Starred
        </Button>
        {tags.map(tag => (
          <Button
            color="default"
            classes={{ root: classes.link, label: classes.linkText }}
            className={pathname === `/tags/${tag}` ? 'active' : ''}
            key={tag}
            onClick={goTo(`/tags/${tag}`)}
            startIcon={<LabelImportantIcon className={classes.linkIcon} />}
            variant="text"
          >
            {tag}
          </Button>
        ))}
        <Button
          color="default"
          classes={{ root: classes.link, label: classes.linkText }}
          className={pathname === '/trash' ? 'active' : ''}
          onClick={goTo('/trash')}
          startIcon={<DeleteIcon className={classes.linkIcon} />}
          variant="text"
        >
          Trash
        </Button>
      </Links>
    </Container>
  );
};

export default Navbar;
