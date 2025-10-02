import { UserModel } from '@aui/api';

export type UserFormModel = Omit<UserModel, 'dateCreated'>;
