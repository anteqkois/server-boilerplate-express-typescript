import { IUsersCacheData } from "./user";

export { };

declare global {
  namespace Express {
    export interface Request {
      user: Omit<IUsersCacheData, 'cacheCreatedAt'>;
    }
  }
}