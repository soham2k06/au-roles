import { appBarItems, roles } from "./constants";

function getHomeHref(status: string) {
  return status === "authenticated" ? `http://localhost:3000//admin/` : "/";
}

const replaceDash = (str: string) => str?.replaceAll("-", " ");

export { appBarItems, roles, getHomeHref, replaceDash };
