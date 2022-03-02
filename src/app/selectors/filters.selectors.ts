import { atom } from 'recoil';

export const descriptionFilterSource = atom({
  key: 'descriptionFilter',
  default: '',
});

export const assigneesFilterSource = atom({
  key: 'assigneeFilter',
  default: new Set<number>(),
});
