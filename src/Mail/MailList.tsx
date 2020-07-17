import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from './slicer';
import { useLocation, useHistory } from 'react-router-dom';
import { mailListByTagSelector, isFetchingMailsSelector } from './selectors';
import { CircularProgress, Divider, IconButton, Checkbox, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import styled from 'styled-components';
import ReplayIcon from '@material-ui/icons/Replay';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

const Container = styled.div`
  align-items: stretch;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  @media screen and (max-width: 400px) {
    width: 100vw;
  }
`;

export const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
`;

const MailItemContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  padding-right: 20px;

  &:hover {
    border-bottom-color: rgba(0, 0, 0, 0.12);
    border-top-color: rgba(0, 0, 0, 0.12);
  }
`;

const OnlyDesktop = styled.span`
  flex: 1;
  margin-right: 10px;

  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const MailList: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { push } = useHistory();

  const goTo = React.useCallback((path: string) => () => {
    push(path);
  }, [push]);

  const mailList = useSelector(mailListByTagSelector(pathname));
  const isFetchingMails = useSelector(isFetchingMailsSelector);
  const fetchMails = React.useCallback(() => {
    dispatch(mailActions.fetchMails());
  }, [dispatch]);

  const mailIds = React.useMemo(() => mailList.map(({ id }) => id), [mailList]);
  const [selected, setSelected] = React.useState<number[]>([]);

  const onSelectAll = React.useCallback(() => {
    if (selected.length) {
      setSelected([]);
    } else {
      setSelected(mailIds);
    }
  }, [mailIds, selected]);

  const onSelect = React.useCallback((id) => () => {
    const selectedIx = selected.indexOf(id);
    if (selectedIx === -1) {
      setSelected([...selected, id]);
    } else {
      const newSelection = [...selected];
      newSelection.splice(selectedIx, 1);
      setSelected(newSelection);
    }
  }, [selected]);

  const onSwitchFavorite = React.useCallback((id) => () => {
    dispatch(mailActions.switchFavorite(id));
  }, [dispatch]);

  const onDelete = React.useCallback(() => {
    selected.forEach(id => dispatch(mailActions.deleteMail(id)));
  }, [dispatch, selected]);
  const onRestore = React.useCallback(() => {
    selected.forEach(id => dispatch(mailActions.restoreMail(id)));
  }, [dispatch, selected]);
  const onRemove = React.useCallback(() => {
    selected.forEach(id => dispatch(mailActions.removeMail(id)));
  }, [dispatch, selected]);
  
  React.useEffect(() => {
    if (!mailList.length) {
      fetchMails();
    }
  }, [fetchMails, mailList.length]);

  React.useEffect(() => {
    setSelected([]);
  }, [pathname]);

  return (
    <Container>
      <Divider />
      <Controls>
        <Checkbox
          checked={JSON.stringify(selected.sort()) === JSON.stringify(mailIds.sort())}
          onChange={onSelectAll}
          indeterminate={!!selected.length}
        />
        {selected.length ? (
          <>
            {pathname === '/trash' && (
              <IconButton aria-label="restore" onClick={onRestore}>
                <RestoreFromTrashIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton aria-label="delete" onClick={pathname === '/trash' ? onRemove : onDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <IconButton aria-label="refresh" onClick={fetchMails}>
            <ReplayIcon fontSize="small" />
          </IconButton>
        )}
      </Controls>
      <Divider />
      {isFetchingMails && <CircularProgress />}
      {mailList.map((mail) => (
        <MailItemContainer key={mail.id}>
          <Checkbox checked={selected.includes(mail.id)} onChange={onSelect(mail.id)} />
          <Checkbox
            icon={<StarBorderIcon />}
            checkedIcon={<StarIcon />}
            onChange={onSwitchFavorite(mail.id)}
            checked={mail.isFavorite}
          />
          <OnlyDesktop>
            <Typography onClick={goTo(`/mail/${mail.id}`)} noWrap>{mail.sender}</Typography>
          </OnlyDesktop>
          <Typography onClick={goTo(`/mail/${mail.id}`)} noWrap style={{ flex: 3 }}>
            {mail.subject}
          </Typography>
          <Typography>{format(new Date(mail.date), 'PP')}</Typography>
        </MailItemContainer>
      ))}
    </Container>
  );
};

export default MailList;
