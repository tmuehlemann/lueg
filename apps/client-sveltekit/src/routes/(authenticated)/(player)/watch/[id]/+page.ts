// import {authenticated} from "$lib/server/user";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { apiFetch } from "$lib/service/service";
// import {db} from "$lib/server/db/db";
// import {z} from "zod";
// import {fileUpload} from "$lib/server/db/schema";

export const load = (async ({ params }) => {
  // await authenticated(locals);
  //
  // // get parsed id from path params
  // let id: number;
  // try {
  //   const parsedParams = z
  //     .object({
  //       id: z.coerce.number().positive().int(),
  //     })
  //     .parse(params);
  //
  //   id = parsedParams.id;
  // } catch (e) {
  //   console.error("trying to access movie route with malformed id in path", e);
  //   throw error(404, "file not found");
  // }
  //
  // // get movie from db
  // const foundUpload = await db.query.fileUpload.findFirst({
  //   where: (fileUpload, { eq }) => eq(fileUpload.id, id),
  //   with: {
  //     movie: true,
  //   },
  // });

  let mediaFile;
  try {
    mediaFile = await apiFetch(`/media-files/${params.id}`, {
      authenticated: true,
    });
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
