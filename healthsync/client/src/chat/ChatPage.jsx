import React from 'react';
import PropTypes from 'prop-types';
import Navbar1 from '../components/Navbar1'


import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from 'react-chat-engine-advanced';

const ChatPage = (props) => {
  const chatProps = useMultiChatLogic(
    'c45fd920-d82f-4545-ba9f-e6f2d778ec6e',
    props.user.username,
    props.user.secret
  );

  return (
    <div>

<Navbar1 />
    <div className="mb-4" style={{ height: '100vh' }}>
      <MultiChatWindow {...chatProps} />
      <MultiChatSocket {...chatProps} />
    </div>
 
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
