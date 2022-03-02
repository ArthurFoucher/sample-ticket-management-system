import { keyBy } from 'lodash';
import { atom, selector } from 'recoil';
import { firstValueFrom } from 'rxjs';
import { backend } from '../clients/backend.client';

export const userListSource = atom({
  key: 'userList',
  default: firstValueFrom(backend.users()),
});

export const userMappingSource = selector({
  key: 'userMapping',
  get: ({ get }) => keyBy(get(userListSource), (user) => user.id),
});
