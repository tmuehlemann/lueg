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
    .replace(/\s(?:480|720|1080|2160)[pi].*/, '')

    // check for codec and remove everything after it
    .replace(/\s(?:x264|x265|avc|hevc).*/, '');

    console.log('zwischenresultat:', movieName)

    // count years in movie name
    const yearCount = (movieName.match(/(?:19|20)\d{2}/g) || []).length;
    console.log(yearCount)

    let res = new Set<string>();
    if (movieName.length > 4) {

        if (yearCount == 1) {
            // uncertain if year is part of movie name or not
            res.add(movieName.trim())
        }

        // remove only year if ends with year, includes if year is in brackets
        movieName = movieName.replace(/[({\[]?(?:19|20)\d{2}[)}\]]?$/, '');
        res.add(movieName.trim())
    } else {
        res.add(movieName.trim())
    }

    return Array.from(res);
}

export function extractMovieYear(filename : string) {
    const regex = /\b(?:[A-Z][a-z]*\.(?:[A-Z][a-z]*\.)*(\d{4}))\b/;
    const match = filename.match(regex);

    return match ? match[1] : null;
}