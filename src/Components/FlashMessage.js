import React from 'react';
import PropTypes from 'prop-types';

const Message = ({messageContents, messageClass, onTimeoutCallback}) => {
  // clear flash messages after 8 seconds
  setTimeout(function(){ onTimeoutCallback() }, 8000)

  return (
    <div className={messageClass}>
      {messageContents}
    </div>
  );
}

Message.propTypes = {
  messageContents: PropTypes.string.isRequired,
  messageClass: PropTypes.string,
  onTimeoutCallback: PropTypes.func.isRequired,
}

export default Message;