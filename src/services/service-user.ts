import { data } from '../db/data';

export const getUsersByEmail = (email: string, number: string) => {
  return data.filter(item => {
    const emailMatch = item.email === email;
    const numberMatch = number ? item.number === number : true;
    return emailMatch && (!number || numberMatch);
  });
};
