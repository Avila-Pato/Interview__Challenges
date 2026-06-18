import {faker} from "@faker-js/faker";
import { Page, User } from "../types/type";


faker.seed(42);

export const MAX_USERS = 10;

const ALL_USERS: User[] = Array.from({length: MAX_USERS}, () => {
  const name = faker.person.fullName();

  return {
    id: faker.number.int(),
    name,
    email: faker.internet.email({firstName: name.split(" ")[0]}).toLowerCase(),
  };
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  // antes: ({start, count} = { start: 0, count: 4 })
  list: async ({start = 0, count = 4} = {}): Promise<Page> => {
    await wait(600);

    const items = ALL_USERS.slice(start, start + count);

    return {items, total: MAX_USERS};
  },
};

export default api;