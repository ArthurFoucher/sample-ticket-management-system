import { keyBy } from 'lodash';
import { atom } from 'recoil';
import { firstValueFrom } from 'rxjs';
import { backend } from '../clients/backend.client';

const fetchUsers = firstValueFrom(backend.users());

export const userMappingSource = atom({
  key: 'userMapping',
  default: fetchUsers.then((users) => keyBy(users, (user) => user.id)),
});
