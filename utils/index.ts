import { appBarItems, roles } from "./constants";

export function getHomeHref(status: string) {
  const BASE_URL = process.env.BASE_URL;
  return status === "authenticated" ? `/admin/` : "/";
}

const replaceDash = (str: string) => str?.replaceAll("-", " ");

export { appBarItems, roles, replaceDash };
