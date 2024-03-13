import * as fs from "fs";
import {glob} from "glob";


export async function cleanMetadata() {
    const files = await glob('static/metadata/**/*.{jpg,png}')

    for (const file of files) {
        console.log('deleting', file)
        fs.unlink(file, () => {})
    }
}

cleanMetadata()