import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/service/auth";
import { get } from "svelte/store";

export const load = () => {
  return redirect(302, "/settings/profile");
};
