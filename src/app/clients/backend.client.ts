import { BackendService } from '../../backend';

export const backend = new BackendService(
  +(process.env.REACT_APP_DELAY ?? 4_000)
);
