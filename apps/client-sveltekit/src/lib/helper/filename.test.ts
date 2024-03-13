import {describe, expect, test} from "vitest";
import {extractMovieName, extractYear} from "./filename";

describe("extract movie names from filename", () => {
    test("extract movie name from filename", () => {

        const testEntries = {
            "The Godfather": ["The Godfather"],
            "The Godfather 1972 1080p": ["The Godfather 1972", "The Godfather"],
            "The Godfather 1972 1080p x264": ["The Godfather 1972", "The Godfather"],
            "The.Godfather.1972.1080p.x264": ["The Godfather 1972", "The Godfather"],
            "The.Godfather.1972.1080p.x264.mp4": ["The Godfather 1972", "The Godfather"],
            "The.Godfather.Part.II.1974.1080p.x264.mp4": ["The Godfather Part II 1974", "The Godfather Part II"],
            "The.Godfather.Part.III.1990.1080p.x264.mp4": ["The Godfather Part III 1990", "The Godfather Part III"],
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
            "1917.2019.1080p.x264.mp4": ["1917"],
            "Blade.Runner.2049.2017.1080p.x264.mp4": ["Blade Runner 2049", "Blade Runner"],
            "Blade.Runner.2049.(2017).1080p.x264.mp4": ["Blade Runner 2049", "Blade Runner"],
            "Blade Runner 2049 (2017) 1080p x264.mp4": ["Blade Runner 2049", "Blade Runner"],
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
            "1917.1080p.x264.mp4": ["1917"],
            "Blade.Runner.2049.1080p.x264.mp4": ["Blade Runner 2049", "Blade Runner"],
            "Blade Runner 2049 1080p x264.mp4": ["Blade Runner 2049", "Blade Runner"],
        }

        for (const [filename, expected] of Object.entries(testEntries)) {
            console.log(`Testing "${filename}" => "${expected}"`)
            expect(extractMovieName(filename)).toStrictEqual(expected);
        }

    });
});

describe("extract movie year from filename", () => {

    test("extract movie year from filename", () => {

            const testEntries = {
                "The Godfather": [],
                "The Godfather 1972 1080p": [1972],
                "The Godfather 1972 1080p x264": [1972],
                "The.Godfather.1972.1080p.x264": [1972],
                "The.Godfather.1972.1080p.x264.mp4": [1972],
                "The.Godfather.Part.II.1974.1080p.x264.mp4": [1974],
                "The.Godfather.Part.III.1990.1080p.x264.mp4": [1990],
            }

            for (const [filename, expected] of Object.entries(testEntries)) {
                console.log(`Testing "${filename}" => "${expected}"`)

                const years = extractYear(filename);
                expect(years).toStrictEqual(expected);

            }
    });

    test("extract year from filenames with year in movie name and release year present.", () => {

        const testEntries = {
            "2001:A.Space.Odyssey.1968.1080p.x264.mp4": [1968],
            "1917.2019.1080p.x264.mp4": [2019],
            "Blade.Runner.2049.2017.1080p.x264.mp4": [2017],
            "Blade.Runner.2049.(2017).1080p.x264.mp4": [2017],
            "Blade Runner 2049 (2017) 1080p x264.mp4": [2017],
        }

        for (const [filename, expected] of Object.entries(testEntries)) {
            console.log(`Testing "${filename}" => "${expected}"`)

            const years = extractYear(filename);
            years.length = 1  // only test first year
            expect(years).toStrictEqual(expected);

        }
    });

    test("extract year from filenames with past year in movie name and release year missing.", () => {
        // seems like an unsolvable problem

        const testEntries = {
            "2001:A.Space.Odyssey.1080p.x264.mp4": [],
            "1917.1080p.x264.mp4": [],
            "1984 1080p x264.mp4": [],
        }

        for (const [filename, expected] of Object.entries(testEntries)) {
            console.log(`Testing "${filename}" => "${expected}"`)

            const years = extractYear(filename);
            expect(years).toStrictEqual(expected);

        }
    });

    test("extract year from filenames with future year in movie name and release year missing.", () => {

        const testEntries = {
            "Blade.Runner.2049.1080p.x264.mp4": [],
            // some AI generated movie names
            "Into the Year 2038: A Journey Through Time": [],
            "The Human Resistance in 2046: A Fight for Survival": [],
            "2054: AI or Human Control, Who Will Prevail?" : [],
            "The Robots of 2062: Our Future Companions or Our Dominants?" : [],
            "2070: The Dawn of a New Era or the End of Humanity?" : [],
            "The Last Days of Mankind in 2088: A Glimpse into Our Dire Future" : [],
            "2096: Beyond Earth, a New Beginning" : [],
            "The Search for a New Home in 2104: Can We Find Another Earth?" : [],
            "2112: A World Without Humans, Who Will Inherit the Planet?" : [],
        }

        for (const [filename, expected] of Object.entries(testEntries)) {
            console.log(`Testing "${filename}" => "${expected}"`)

            const years = extractYear(filename);
            expect(years).toStrictEqual(expected);

        }
    });
});