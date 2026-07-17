/* eslint-disable import/no-anonymous-default-export */
import {Item} from "./types";
// eslint-disable-next-line import/no-anonymous-default-export
const items: Item[] = [
  {
    id: 1,
    text: "Some thing to buy",
    completed: false,
  },
  {
    id: 2,
    text: "Some other thing to buy",
    completed: true,
  },
  {
    id: 3,
    text: "Some last to buy",
    completed: false,
  },
];


export default {
  list: (): Promise<Item[]> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(items), 1000)
    ),

  add: (text: string): Promise<Item> =>
    new Promise((resolve) =>
      setTimeout(() => {
        const newItem: Item = {
          id: Date.now(),
          text,
          completed: false,
        };

        items.push(newItem);
        resolve(newItem);
      }, 1000)
    ),
};