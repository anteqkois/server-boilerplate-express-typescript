import dayjs from "dayjs";
import { IUsersCacheData } from "../../types/user";

export class UsersCacheHandler {
    static list: IUsersCacheData[] = [];

    static addUser(user: Omit<IUsersCacheData, 'cacheCreatedAt'>) {
        console.log(`[Users Cache] added ${user.userId}`);

        this.list.push({
            ...user,
            cacheCreatedAt: dayjs().unix(),
        });
    }

    static deleteUser(userId: number) {
        console.log(`[Users Cache] removed ${userId}`);
        this.list = this.list.filter((x) => x.userId != userId);
    }

    static getUser(userId: number) {
        console.log(`[Users Cache] getting ${userId}`);

        return this.list.find((x) => x.userId == userId);
    }
}