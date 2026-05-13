import { register } from "node:module";

export const URLS = {
  base: "https://demo4.cybersoft.edu.vn",
  register: "https://demo4.cybersoft.edu.vn/register",
  login: "https://demo4.cybersoft.edu.vn/login",
  profile: "https://demo4.cybersoft.edu.vn/profile",
  admin: "https://demo4.cybersoft.edu.vn/admin",
  adminUserManagement: "https://demo4.cybersoft.edu.vn/admin/qlnd",
  
} as const;

export type Urls = typeof URLS;
