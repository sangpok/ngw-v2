import { createSlice } from '@reduxjs/toolkit';

const RECENT_REACTION_KEY = 'notion-guest-book-recent-reaction';

const jsonValue = JSON.parse(localStorage.getItem(RECENT_REACTION_KEY)) || [];

const saveRecentReaction = (state) => {
  localStorage.setItem(RECENT_REACTION_KEY, JSON.stringify(state));
};

const DashboardStateSlice = createSlice({
  name: 'DashboardStateSlice',
  initialState: {
    currentHoverMessageId: null,
    hoverSubMenuOpened: false,
    replyData: null,
    recentReactions: jsonValue,
    lastCommands: [],
  },
  reducers: {
    setCurrentHoverMessageId(state, action) {
      state.currentHoverMessageId = action.payload;
    },
    setHoverSubMenuOpened(state, action) {
      state.hoverSubMenuOpened = action.payload;
    },
    closeHoverMenu(state, action) {
      state.currentHoverMessageId = null;
      state.hoverSubMenuOpened = false;
    },
    setReplyData(state, action) {
      state.replyData = action.payload;
    },
    addReactionHistory(state, action) {
      const emojiId = action.payload;

      if (state.recentReactions.includes(emojiId)) {
        state.recentReactions = [].concat(
          emojiId,
          ...state.recentReactions.filter((reaction) => reaction !== emojiId)
        );
      } else {
        state.recentReactions = [emojiId, ...state.recentReactions];
      }

      saveRecentReaction(state.recentReactions);
    },
    addCommand(state, action) {
      if (state.lastCommands.includes(action.payload)) {
        return;
      }

      state.lastCommands.push(action.payload);
    },
    removeCommand(state, action) {
      state.lastCommands = [...state.lastCommands.filter((command) => command !== action.payload)];
    },
  },
});

export default DashboardStateSlice;

export const {
  setCurrentHoverMessageId,
  setHoverSubMenuOpened,
  closeHoverMenu,
  setReplyData,
  addReactionHistory,
  addCommand,
  removeCommand,
} = DashboardStateSlice.actions;
