export abstract class AuthRepository {
  abstract logIn(email: string, password: string): Promise<void>;
  abstract logOut(id: string): Promise<void>;
  abstract recover(email: string, password): Promise<void>;
}
