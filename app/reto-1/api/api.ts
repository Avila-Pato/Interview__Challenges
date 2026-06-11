import { faker } from '@faker-js/faker';
import { Page, User } from "../types/types";


faker.seed(42);

const MAX_USERS = 40;

const ALL_USERS: User[] = Array.from({length: MAX_USERS}, (_, i) => {
  const name = faker.person.fullName();

  return {
    id: i + 1,
    name,
    email: faker.internet.email({firstName: name.split(" ")[0]}).toLowerCase(),
  };
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  total: MAX_USERS,
  list: async ({start, count} = { start: 0, count: 3 }): Promise<Page> => {
    await wait(600);

    const items = ALL_USERS.slice(start, start + count);

    return {items, total: MAX_USERS};
  },
};

export default api;
