import { v4 as uuidv4 } from 'uuid';

export const generateFileName = (): string => {
  const timestamp = new Date().getTime();
  const name = uuidv4().split("-")[0];
  return `${timestamp}-${name}.png`;
};
