export interface Developer {
  firstName: null | string;
  lastName: null | string;
  country: null | string;
  continent: null | string;
  age: null | number;
  language: null | string;
  question?: string;
}

export const desarrolladores: Developer[] = [
  {
    firstName: null,
    lastName: "I.",
    country: "Argentina",
    continent: "Americas",
    age: 35,
    language: "Java",
  },
  {
    firstName: "Lukas",
    lastName: "X.",
    country: "Croatia",
    continent: "Europe",
    age: 35,
    language: null,
  },
  {
    firstName: "Madison",
    lastName: "U.",
    country: "United States",
    continent: "Americas",
    age: 32,
    language: "Ruby",
  },
];