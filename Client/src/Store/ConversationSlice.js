/** Redux Toolkit 관련 Import */
import { DISPATCH_TYPE } from '@Hooks/useDataFetcher';

import { createSlice } from '@reduxjs/toolkit';

const loadedCommentIds = new Set();

const changeConversation = (state, newState) => {
  state.loadedConversations = newState;
};

const updateConversationAfterCreate = (state, response) => {
  changeConversation(state, [].concat(...state.loadedConversations, response.comment));
};

const updateConversationAfterUpdate = (state, response) => {
  const commentIndex = state.loadedConversations.findIndex(
    (comment) => comment._id === response.comment._id
  );

  state.loadedConversations[commentIndex] = response.comment;
};

const updateConversationAfterGet = (state, response) => {
  const newHistory = [];

  response.forEach((newComment) => {
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

const updateConversationAfterDelete = (state, response) => {
  changeConversation(
    state,
    state.loadedConversations.filter((comment) => comment._id !== response.comment._id)
  );
};

const ConversationSlice = createSlice({
  name: 'ConversationSlice',
  initialState: {
    loadedConversations: [],
    currentPage: 1,
  },
  reducers: {
    loadNextPage(state, action) {
      state.currentPage++;
    },
    loadConversation(state, action) {
      state.loadedConversations.push(...action.payload);
    },
    updateConversationHistory: (state, action) => {
      const { dispatchType, response } = action.payload;

      const updateFunMap = {
        [DISPATCH_TYPE.CREATE_COMMENT]: () => updateConversationAfterCreate(state, response),
        [DISPATCH_TYPE.UPDATE_REACTION]: () => updateConversationAfterUpdate(state, response),
        [DISPATCH_TYPE.GET_HISTORY_BY_PAGE]: () => updateConversationAfterGet(state, response),
        [DISPATCH_TYPE.DELETE_COMMENT]: () => updateConversationAfterDelete(state, response),
      };

      updateFunMap[dispatchType]();
    },
  },
});

export default ConversationSlice;

export const { updateConversationHistory } = ConversationSlice.actions;
