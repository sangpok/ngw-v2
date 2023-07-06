import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledMessageInput } from './styled';

import UserProfile from '@Components/UserProfile';
import MessageType from './MessageType';
import ReplyBox from './ReplyBox';

import { removeCommand, setReplyData } from '@Store/DashboardStateSlice';

const { Container, Message, SubmitButton } = StyledMessageInput;

const MessageInput = ({ onSubmit }) => {
  const storeDispatch = useDispatch();

  const { replyData } = useSelector((state) => state.DashboardStateSlice);
  const { userProfile } = useSelector((state) => state.UserAuthSlice);

  const [selectedTypeId, setSelectedTypeId] = useState(3);
  const [inputedMessage, setInputedMessage] = useState('');

  const submitMessage = () => {
    onSubmit({
      messageType: selectedTypeId,
      message: inputedMessage,
      replyData,
    });

    setInputedMessage('');
    setSelectedTypeId(3);
  };

  const handleChange = (e) => {
    setInputedMessage(e.target.value);
  };

  const handleKeyUp = (e) => {
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && inputedMessage !== '') {
      submitMessage();
    }
  };

  const handleSubmit = () => {
    if (inputedMessage !== '') {
      submitMessage();
    }
  };

  const handleReplyCancel = () => {
    storeDispatch(setReplyData(null));
    storeDispatch(removeCommand('reply'));
  };

  return (
    <>
      {replyData && <ReplyBox replyData={replyData} onReplyCancel={handleReplyCancel} />}
      <Container>
        <UserProfile src={userProfile} />
        <MessageType selectedTypeId={selectedTypeId} onSelectedTypeId={setSelectedTypeId} />
        <Message
          type="text"
          placeholder="방명록 남기기..."
          value={inputedMessage}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <SubmitButton onClick={handleSubmit}>✔</SubmitButton>
      </Container>
    </>
  );
};

export default MessageInput;
