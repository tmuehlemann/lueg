import {test} from "vitest";
import {generateMetaColors} from "$lib/server/metadata/metaColors";

test("metaColors", async () => {
    const colors = await generateMetaColors('godzilla.jpg', 'godzilla.jpg')
})