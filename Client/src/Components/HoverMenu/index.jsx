import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledHoverMenu } from './styled';

import EmojiPicker from './EmojiPicker';
import MoreMenu from './MoreMenu';

import {
  addReactionHistory,
  closeHoverMenu,
  setCurrentHoverMessageId,
  setHoverSubMenuOpened,
  setReplyData,
} from '@Store/DashboardStateSlice';

import { addCommand, removeCommand } from '@Store/DashboardStateSlice';
import DeleteModal from '@Components/Modal/DeleteModal';
import { openModal, setModalData } from '@Store/ModalSlice';

const { Container, Button, MoreIcon, ReactionIcon } = StyledHoverMenu;

const HoverMenu = ({ mesasgeId }) => {
  const storeDispatch = useDispatch();

  const { hoverSubMenuOpened } = useSelector((state) => state.DashboardStateSlice);
  const { loadedConversations } = useSelector((state) => state.ConversationSlice);

  const [openedMenu, setOpenedMenu] = useState(null);

  useEffect(() => {
    if (!hoverSubMenuOpened) {
      setOpenedMenu(null);
    }
  }, [hoverSubMenuOpened]);

  const handleClick = (type) => {
    if (hoverSubMenuOpened && openedMenu === type) {
      setOpenedMenu(null);
      storeDispatch(setHoverSubMenuOpened(false));
      storeDispatch(removeCommand('hover-submenu-clicked'));

      return;
    }

    setOpenedMenu(type);
    storeDispatch(setHoverSubMenuOpened(true));
    storeDispatch(addCommand('hover-submenu-clicked'));
  };

  const handleSelect = (selectedItem) => {
    storeDispatch(setCurrentHoverMessageId(null));
    storeDispatch(closeHoverMenu(null));
    storeDispatch(removeCommand('hover-submenu-clicked'));

    const eventMap = {
      Reaction: handleReaction,
      MoreMenu: handleMoreMenu,
    };

    eventMap[selectedItem.type](selectedItem);
  };

  const handleReaction = (selectedItem) => {
    storeDispatch(addReactionHistory(selectedItem.data.emojiId));
    storeDispatch(removeCommand('hover-submenu-clicked'));
  };

  const handleMoreMenu = (selectedItem) => {
    const eventMap = {
      Reply: replyEvent,
      Delete: deleteEvent,
    };

    eventMap[selectedItem.data.eventType](selectedItem);
  };

  const replyEvent = (selectedItem) => {
    const matchedMessage = loadedConversations.find(
      (conversation) => conversation._id === mesasgeId
    );

    storeDispatch(setReplyData(matchedMessage));
    storeDispatch(removeCommand('hover-submenu-clicked'));
    storeDispatch(addCommand('reply'));
  };

  const deleteEvent = (selectedItem) => {
    storeDispatch(
      setModalData({
        modalTitle: '방명록 삭제',
        modalComponent: <DeleteModal messageId={mesasgeId} />,
      })
    );
    storeDispatch(openModal());
    storeDispatch(addCommand('modal-show'));
  };

  return (
    <Container>
      <Button onClick={() => handleClick('Reaction')}>
        <ReactionIcon />
      </Button>
      <Button onClick={() => handleClick('More')}>
        <MoreIcon />
      </Button>

      {hoverSubMenuOpened && openedMenu === 'Reaction' && <EmojiPicker onSelect={handleSelect} />}
      {hoverSubMenuOpened && openedMenu === 'More' && <MoreMenu onSelect={handleSelect} />}
    </Container>
  );
};

export default HoverMenu;
