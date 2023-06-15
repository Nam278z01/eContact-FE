import { Message } from "./message";
import { NotSeenBy } from "./not-seen-by";
import { ProfileUser } from "./profile-user";

export interface Chat {
  id: string;
  lastMessage?: string;
  lastMessageDate?: any;
  lastUserIdMessage?: string;
  userIds: string[];
  users: ProfileUser[];
  messages: Message[];
  notSeenBy: NotSeenBy[];

  // Not stored, only for display
  chatPic?: string;
  chatName?: string;
  chatUserId: string;
  lastUserNameMessage?: string;
  countMessageNotSeen?: number;
}
