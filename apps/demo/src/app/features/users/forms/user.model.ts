import { UserModel } from '@aui/api';

export type CustomUserModel = Omit<UserModel, 'dateCreated'>;
