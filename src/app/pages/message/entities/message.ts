import { ReadBy } from "./read-by";

export interface Message {
  senderId: string;
  senderName: string;
  senderPhotoUrl?: string;
  sendDate?: any;
  content: string;
  type: string;
  readBy?: ReadBy[];
}
