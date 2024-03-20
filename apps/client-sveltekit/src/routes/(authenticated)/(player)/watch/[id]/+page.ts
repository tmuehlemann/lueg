// import {authenticated} from "$lib/server/user";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getMediaFile } from "$lib/service/api";

export const load = (async ({ params }) => {
  let mediaFile;
  try {
    mediaFile = await getMediaFile(params.id);
  } catch (e) {
    throw error(404, "mediaFile not found");
  }

  if (!mediaFile) {
    throw error(404, "mediaFile not found");
  }

  return {
    mediaFile,
  };
}) satisfies PageLoad;
