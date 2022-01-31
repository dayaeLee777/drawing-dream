import {api} from 'api/api'

export const getRooms = async (success, fail) => {
  return await api.get("api/chat/room/all").then(success).catch(fail);
};
