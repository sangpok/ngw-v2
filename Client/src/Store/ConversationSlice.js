/** Redux Toolkit 관련 Import */
import { DISPATCH_TYPE } from '@Hooks/useDataFetcher';

import { createSlice } from '@reduxjs/toolkit';

const UPDATE_TYPE = {
  MESSAGE_ADDED: 'message_added',
  MESSAGE_DELETED: 'message_deleted',
  REACTION_UPDATED: 'reaction_updated',
  HISTORY_LOADED: 'history_loaded',
};

const loadedCommentIds = new Set();

const changeConversation = (state, newState) => {
  state.loadedConversations = newState;
};

const updateAfterMessageAdded = (state, message) => {
  changeConversation(state, [].concat(...state.loadedConversations, message));
};

const updateAfterMessageDeleted = (state, messageId) => {
  changeConversation(
    state,
    state.loadedConversations.filter((comment) => comment._id !== messageId)
  );
};

const updateAfterReactionUpdated = (state, message) => {
  const commentIndex = state.loadedConversations.findIndex(
    (comment) => comment._id === message._id
  );

  if (commentIndex === -1) {
    return;
  }

  state.loadedConversations[commentIndex] = message;
};

const updateAfterHistoryLoaded = (state, messages) => {
  const newHistory = [];

  messages.forEach((newComment) => {
    if (loadedCommentIds.has(newComment._id)) {
      return;
    }

    newHistory.push(newComment);
    loadedCommentIds.add(newComment._id);
  });

  if (newHistory.length === 0) {
    return;
  }

  state.loadedConversations = [].concat(...newHistory, ...state.loadedConversations);
};

const ConversationSlice = createSlice({
  name: 'ConversationSlice',
  initialState: {
    loadedConversations: [],
    currentPage: 1,
  },
  reducers: {
    nextPage(state, action) {
      state.currentPage++;
    },
    updateConversations: (state, action) => {
      const { updateType, messageData } = action.payload;

      const updateFunMap = {
        [UPDATE_TYPE.MESSAGE_ADDED]: () => updateAfterMessageAdded(state, messageData),
        [UPDATE_TYPE.MESSAGE_DELETED]: () => updateAfterMessageDeleted(state, messageData),
        [UPDATE_TYPE.REACTION_UPDATED]: () => updateAfterReactionUpdated(state, messageData),
        [UPDATE_TYPE.HISTORY_LOADED]: () => updateAfterHistoryLoaded(state, messageData),

        // [DISPATCH_TYPE.CREATE_COMMENT]: () => updateConversationAfterCreate(state, response),
        // [DISPATCH_TYPE.UPDATE_REACTION]: () => updateConversationAfterUpdate(state, response),
        // [DISPATCH_TYPE.GET_HISTORY_BY_PAGE]: () => updateConversationAfterGet(state, response),
        // [DISPATCH_TYPE.DELETE_COMMENT]: () => updateConversationAfterDelete(state, response),
      };

      updateFunMap[updateType]();
    },
  },
});

export default ConversationSlice;

export { UPDATE_TYPE };
export const { nextPage, updateConversations } = ConversationSlice.actions;
