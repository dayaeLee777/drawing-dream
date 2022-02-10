import {api} from 'api/api'

export const getScore = async () => {
    return await api.get("/api/score");
  };