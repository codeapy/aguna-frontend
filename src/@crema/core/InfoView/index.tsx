import React from 'react';
import { useSelector } from 'react-redux';
import { Loader, MessageView } from '../..';
import { AppState } from '../../../redux/store';

function InfoView() {
  const { error, loading, message } = useSelector<AppState, AppState['common']>(
    ({ common }) => common,
  );

  const showMessage = () => (
    <MessageView variant="success" message={message.toString()} />
  );

  const showError = () => (
    <MessageView variant="error" message={error.toString()} />
  );

  return (
    <>
      {loading && <Loader />}

      {message && showMessage()}
      {error && showError()}
    </>
  );
}

export default InfoView;
