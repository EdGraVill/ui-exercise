import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from './slicer';
import { useLocation } from 'react-router-dom';
import { mailListByTagSelector, isFetchingMailsSelector } from './selectors';
import { CircularProgress } from '@material-ui/core';

const MailList: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const mailList = useSelector(mailListByTagSelector(pathname === '/' ? undefined : pathname.replace('/tags/', '')));
  const isFetchingMails = useSelector(isFetchingMailsSelector);
  
  React.useEffect(() => {
    dispatch(mailActions.fetchMails());
  }, [dispatch]);

  return (
    <div>
      {isFetchingMails && <CircularProgress />}
      <pre>{JSON.stringify(mailList, undefined, 2)}</pre>
    </div>
  );
};

export default MailList;
