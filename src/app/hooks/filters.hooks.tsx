import { useRecoilCallback } from 'recoil';
import { assigneesFilterSource } from '../selectors/filters.selectors';

export const useToggleAssignee = () => {
  return useRecoilCallback(({ set }) => (assigneeId: number) => {
    set(assigneesFilterSource, (filterState) => {
      const newState = new Set(filterState);
      if (newState.delete(assigneeId)) {
        return newState;
      } else {
        return newState.add(assigneeId);
      }
    });
  });
};
