import { appBarItems, roles } from "./constants";

export function getHomeHref(status: string) {
  return status === "authenticated" ? `/admin/` : "/";
}

const replaceDash = (str: string) => str?.replaceAll("-", " ");

const getShortForm = (mainStr: string) =>
  mainStr.split(" ").map((str: string) => str.slice(0, 1));

export { appBarItems, roles, replaceDash, getShortForm };
