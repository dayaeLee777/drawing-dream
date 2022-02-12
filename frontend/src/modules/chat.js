const OPEN_CHAT = "CHAT/OPEN_CHAT";
const CLOSE_CHAT = "CHAT/CLOSE_CHAT";
const OPEN_CHAT_LIST = "CHAT/OPEN_CHAT_LIST";
export const openChat = (roomId) => ({
  type: OPEN_CHAT,
  roomId: roomId,
});

export const closeChat = () => ({
  type: CLOSE_CHAT,
});

export const openChatList = () => ({
  type: OPEN_CHAT_LIST,
});

const initialState = {
  isOpenChat: false,
  roomId: null,
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CHAT:
      return {
        isOpenChat: true,
        roomId: action.roomId,
      };
    case CLOSE_CHAT:
      return {
        isOpenChat: false,
        roomId: null,
      };
    case OPEN_CHAT_LIST:
      return {
        isOpenChat: true,
        roomId: null,
      };
    default:
      return state;
  }
};

export default chat;
