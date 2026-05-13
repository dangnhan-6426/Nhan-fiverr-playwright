export const ACCOUNTS = {
  user1: {
    email: "cao@gmail.com",
    password: "12345678",
  },
  user2: {
    email: "qanhan123@gmail.com",
    password: "qanhan@123",
  },
  admin: {
    email: "qanhan@gmail.com",
    password: "qanhan123",
  },
} as const;

export type Account = (typeof ACCOUNTS)[keyof typeof ACCOUNTS];
