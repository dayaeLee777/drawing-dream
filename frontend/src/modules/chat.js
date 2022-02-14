const OPEN_CHAT = "CHAT/OPEN_CHAT";
const CLOSE_CHAT = "CHAT/CLOSE_CHAT";
const OPEN_CHAT_LIST = "CHAT/OPEN_CHAT_LIST";
export const openChat = (roomId, users, memberId) => ({
  type: OPEN_CHAT,
  roomId: roomId,
  users: users,
  memberId: memberId,
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
  users: null,
  memberId: null,
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CHAT:
      return {
        isOpenChat: true,
        roomId: action.roomId,
        users: action.users,
        memberId: action.memberId,
      };
    case CLOSE_CHAT:
      return {
        isOpenChat: false,
        roomId: null,
        users: null,
        memberId: null,
      };
    case OPEN_CHAT_LIST:
      return {
        isOpenChat: true,
        roomId: null,
        users: null,
        memberId: null,
      };
    default:
      return state;
  }
};

export default chat;
