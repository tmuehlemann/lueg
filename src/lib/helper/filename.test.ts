import {expect, test} from "vitest";
import {extractMovieName, extractMovieYear} from "./filename";
test("extract movie name from filename", () => {

    const testEntries = {
        "The Godfather": ["The Godfather"],
        "The Godfather 1972 1080p": ["The Godfather 1972", "The Godfather"],
        "The Godfather 1972 1080p x264": ["The Godfather 1972", "The Godfather"],
        "The.Godfather.1972.1080p.x264": ["The Godfather 1972", "The Godfather"],
        "The.Godfather.1972.1080p.x264.mp4": ["The Godfather 1972", "The Godfather"],
        "The.Godfather.Part.II.1974.1080p.x264.mp4" : ["The Godfather Part II 1974", "The Godfather Part II"],
        "The.Godfather.Part.III.1990.1080p.x264.mp4" : ["The Godfather Part III 1990", "The Godfather Part III"],
    }

    for (const [filename, expected] of Object.entries(testEntries)) {
        console.log(`Testing "${filename}" => "${expected}"`)
        expect(extractMovieName(filename)).toStrictEqual(expected);
    }

});

test("Movies with years in the name", () => {

    const testEntries = {
        "2001:A Space Odyssey": ["2001:A Space Odyssey"],
        "2001:A.Space.Odyssey.1968.1080p.x264.mp4": ["2001:A Space Odyssey"],
        "1917.2019.1080p.x264.mp4" : ["1917"],
        "Blade.Runner.2049.2017.1080p.x264.mp4" : ["Blade Runner 2049"],
        "Blade.Runner.2049.(2017).1080p.x264.mp4" : ["Blade Runner 2049"],
        "Blade Runner 2049 (2017) 1080p x264.mp4" : ["Blade Runner 2049"],
    }

    for (const [filename, expected] of Object.entries(testEntries)) {
        console.log(`Testing "${filename}" => "${expected}"`)
        expect(extractMovieName(filename)).toStrictEqual(expected);
    }

});

test("Movies without year in the filename", () => {

    const testEntries = {
        "2001:A Space Odyssey": ["2001:A Space Odyssey"],
        "2001:A.Space.Odyssey.1080p.x264.mp4": ["2001:A Space Odyssey"],
        "1917.1080p.x264.mp4" : ["1917"],
        "Blade.Runner.2049.1080p.x264.mp4" : ["Blade Runner 2049", "Blade Runner"],
        "Blade Runner 2049 1080p x264.mp4" : ["Blade Runner 2049", "Blade Runner"],
    }

    for (const [filename, expected] of Object.entries(testEntries)) {
        console.log(`Testing "${filename}" => "${expected}"`)
        expect(extractMovieName(filename)).toStrictEqual(expected);
    }

});