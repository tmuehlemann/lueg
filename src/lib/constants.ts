import * as path from "path";

// metadata paths
export const METADATA_PATH = 'static/metadata/';
export const ABSOLUTE_METADATA_PATH = path.join(process.cwd(), METADATA_PATH);

// segments
export const BACKDROP_PATH = 'backdrops/';
export const POSTER_PATH = 'posters/';

// absolute
export const ABSOLUTE_BACKDROP_PATH = path.join(ABSOLUTE_METADATA_PATH, BACKDROP_PATH);
export const ABSOLUTE_POSTER_PATH = path.join(ABSOLUTE_METADATA_PATH, POSTER_PATH);

// web
export const WEB_POSTER_PATH = path.join(METADATA_PATH, POSTER_PATH);
export const WEB_BACKDROP_PATH = path.join(METADATA_PATH, BACKDROP_PATH);