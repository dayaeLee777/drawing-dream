const OPEN_CHAT = "CHAT/OPEN_CHAT";
const CLOSE_CHAT = "CHAT/CLOSE_CHAT";

export const openChat = () => ({
  type: OPEN_CHAT,
});

export const closeChat = () => ({
  type: CLOSE_CHAT,
});

const initialState = {
  isOpenChat: false,
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CHAT:
      return {
        isOpenChat: true,
      };
    case CLOSE_CHAT:
      return {
        isOpenChat: false,
      };
    default:
      return state;
  }
};

export default chat;
