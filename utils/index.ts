import { appBarItems, roles } from "./constants";

export function getHomeHref(status: string) {
  return status === "authenticated" ? `/admin/` : "/";
}

const replaceDash = (str: string) => str?.replaceAll("-", " ");

export { appBarItems, roles, replaceDash };
