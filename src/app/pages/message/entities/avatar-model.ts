import { Guid } from 'core';
export class AvatarModel {
  public person_id: Guid;
  public full_name: string;
  public avatar: string;
  public online_flag: boolean;
}
