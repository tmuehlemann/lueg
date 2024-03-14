import { get } from "svelte/store";
import { auth } from "$lib/service/auth";
import { redirect } from "@sveltejs/kit";

export const load = () => {
  if (!get(auth).isAuthenticated) return redirect(302, "/login");
};
