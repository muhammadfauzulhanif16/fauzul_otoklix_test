import { Home, Add, AppsList } from "@emotion-icons/fluentui-system-regular";

export type NavListState = {
  label: string;
  icon: any;
};

export const NavList: NavListState[] = [
  {
    label: "Dashboard",
    icon: Home,
  },
  {
    label: "Add",
    icon: Add,
  },
  {
    label: "Posts",
    icon: AppsList,
  },
];
