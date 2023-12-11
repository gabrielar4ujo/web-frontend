import { AxiosError } from 'axios';

interface IMessage {
  message: string;
}

export interface IAxiosError {
  response: AxiosError & { data: IMessage };
}
