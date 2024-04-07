import React from 'react';
import PropTypes from 'prop-types';
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from 'react-chat-engine-advanced';

const ChatPage = (props) => {
  const chatProps = useMultiChatLogic(
    '0e02b07e-465e-4384-a39e-5634f5672085',
    props.user.username,
    props.user.secret
  );

  return (
    <div style={{ height: '100vh' }}>
      <MultiChatWindow {...chatProps} />
      <MultiChatSocket {...chatProps} />
    </div>
  );
}

ChatPage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    secret: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatPage;
