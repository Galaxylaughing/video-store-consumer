import React from 'react';
import PropTypes from 'prop-types';

const Message = ({messageContents, messageClass}) => {
  return (
    <div className={messageClass}>
      {messageContents}
    </div>
  );
}

Message.propTypes = {
  messageContents: PropTypes.string.isRequired,
  messageClass: PropTypes.string,
}

export default Message;