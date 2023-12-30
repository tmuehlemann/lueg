/**
 * Extracts the movie name from a filename
 *
 * in case of ambiguity, multiple results are returned
 * especially if the year is part of the movie name
 * example: "Blade Runner 2049" vs "Blade Runner" vs "Blade Runner 2049 (2017)"
 *
 * @param filename
 */
export function extractMovieName(filename : string) {

    // remove file extension
    let movieName = filename.replace(/\.[^/.]+$/, "")

    // Replace all dots with spaces
    .replace(/\./g, ' ')

    // check for quality and remove everything after it
    .replace(/[({\[]?(?:480|720|1080|2160)[pi].*/, '')
    .replace(/[({\[]?(?:HD|SD|4k).*/, '')

    // check for codec and remove everything after it
    .replace(/[({\[]?(?:x264|x265|avc|hevc).*/, '')
    .trim();


    // count years in movie name
    const yearCount = (movieName.match(/(?:19|20)\d{2}/g) || []).length;

    let res = new Set<string>();
    if (movieName.length > 4) {

        if (yearCount == 1) {
            // uncertain if year is part of movie name or not
            res.add(movieName.trim())
        }

        // remove only year if ends with year, includes if year is in brackets
        movieName = movieName.replace(/([({\[]?(?:19|20)\d{2}[)}\]]?$|[({\[](?:19|20)\d{2}[)}\]]).*/, '');
        res.add(movieName.trim())

        // remove year and everything after it
        movieName = movieName.replace(/([({\[]?(?:19|20)\d{2}[)}\]]?).*/, '');
        res.add(movieName.trim())

    } else {
        res.add(movieName.trim())
    }

    return Array.from(res);
}

export function extractMovieInfo(filename : string) {
    const names = extractMovieName(filename);

    const year = new Set<number>();

    names.forEach(n => {
        const yearMatch = n.match(/(?:19|20)\d{2}/g);
        if (yearMatch) {
            yearMatch.forEach(y => year.add(parseInt(y)));
        }
    })

    // remove all years in the future
    const currentYear = new Date().getFullYear();
    Array.from(year).forEach(y => {
        if (y > currentYear) {
            year.delete(y);
        }
    })

    return {
        names,
        years: Array.from(year).reverse()
    }
}