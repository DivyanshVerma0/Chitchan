import { atom } from "recoil";
import { IconType } from "react-icons";
import { TiHome } from "react-icons/ti";

export type DirectoryMenuItem = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

export type DirectoryMenuState = {
  isOpen: boolean;
  selectedMenuItem: DirectoryMenuItem;
};

export const defaultMenuItem = {
  displayText: "Home",
  link: "/",
  icon: TiHome,
  iconColor: "gray.500",
};

export const directoryMenuState = atom<DirectoryMenuState>({
  key: "directoryMenuState",
  default: {
    isOpen: false,
    selectedMenuItem: defaultMenuItem,
  },
});
