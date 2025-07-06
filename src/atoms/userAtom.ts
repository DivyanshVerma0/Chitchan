import { atom } from "recoil";

const defaultUserState = {};

export const userState = atom({
  key: "userState_v1",
  default: null,
});
