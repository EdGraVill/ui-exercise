import * as React from 'react';
import styled from 'styled-components';
import { Typography, Divider, IconButton, Checkbox } from '@material-ui/core';
import { useRouteMatch, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import { mailSelector } from './selectors';
import { Controls } from './MailList';
import { mailActions } from './slicer';

const Container = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 64px);
  overflow: auto;
  padding: 32px;
  width: 100%;

  @media screen and (max-width: 400px) {
    width: 100vw;
  }
`;

const Mail: React.FC = () => {
  const dispatch = useDispatch();
  const { params: { id: mailId } } = useRouteMatch<{ id?: string }>();
  const mail = useSelector(mailSelector(Number(mailId)));
  const { push } = useHistory();

  const goTo = React.useCallback((path: string) => () => {
    push(path);
  }, [push]);

  const onSwitchFavorite = React.useCallback(() => {
    dispatch(mailActions.switchFavorite(Number(mailId)));
  }, [dispatch, mailId]);

  const onDelete = React.useCallback(() => {
    if (mail?.isDeleted) {
      dispatch(mailActions.removeMail(Number(mailId)));
      goTo('/trash')();
    } else {
      dispatch(mailActions.deleteMail(Number(mailId)));
      goTo('/')();
    }
  }, [dispatch, goTo, mail, mailId]);

  if (!mailId || !mail) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Divider />
        <Controls>
          <IconButton aria-label="back" onClick={goTo('/')}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Checkbox
            icon={<StarBorderIcon />}
            checkedIcon={<StarIcon />}
            onChange={onSwitchFavorite}
            checked={mail.isFavorite}
          />
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Controls>
      <Divider />
      <Typography variant="h5" style={{ marginBottom: '3rem' }}>{mail.subject}</Typography>
      <div dangerouslySetInnerHTML={{ __html: mail.body }} />
    </Container>
  );
};

export default Mail;
