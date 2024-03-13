import tinycolor from 'tinycolor2'

import {createRequire} from "module";
import {ABSOLUTE_BACKDROP_PATH, ABSOLUTE_POSTER_PATH} from "$lib/constants";
const require = createRequire(import.meta.url);

const ColorThief = require('colorthief');


export type MetaColors = {
    bg : tinycolor.Instance,
    fg : tinycolor.Instance,
    primary : tinycolor.Instance,
}

export async function generateMetaColors(posterPath : string, backdropPath : string): Promise<MetaColors> {

    const bg = toTinycolor(await ColorThief.getColor(ABSOLUTE_BACKDROP_PATH + backdropPath))
    const palette : tinycolor.Instance[] = (await ColorThief.getPalette(ABSOLUTE_POSTER_PATH + posterPath)).map(toTinycolor)

    const bgHue = bg.toHsv().h;
    const onDark = bg.isDark();

    function fitForPrimary(color : tinycolor.Instance) {

        const {h,s,v} = color.toHsv();
        const l = color.getLuminance();
        const center = onDark ? .7 : .4;

        const value = 1 - Math.pow(l - center,2) * (3 /center);
        const saturation = Math.pow(10,s) / 10;
        const hueDiff = Math.min( Math.abs(h - bgHue), 360 - Math.abs(h - bgHue) ) / 180;
        return saturation * value * (1+Math.log2(hueDiff + .5));
    }

     let primary = palette
        .sort((a : tinycolor.Instance, b : tinycolor.Instance) => {
            return fitForPrimary(a) - fitForPrimary(b)
        })
        .reverse()
        .find(color => tinycolor.isReadable(bg, color, {level: 'AA', size: 'large'}))
    ;

    // backup plan
    if (!primary) {
        primary = tinycolor(bg).triad()[1]
    }

    const fg = tinycolor.mostReadable(bg, palette);

    return {
        bg,
        fg,
        primary,
    }
}

function toTinycolor(color : number[]) : tinycolor.Instance {
    return tinycolor({ r: color[0], g: color[1], b: color[2] });
}