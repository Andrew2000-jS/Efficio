import { compareSync, hashSync } from 'bcrypt';

export const compare = (data: string | Buffer, encrypted: string): boolean =>
  compareSync(data, encrypted);

export const hash = (data: string | Buffer, saltRounds: number = 10): string =>
  hashSync(data, saltRounds);
