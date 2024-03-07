'use strict';
import { getImages } from 'icloud-shared-album';
import { mkdir } from 'fs';
import { join } from 'path';
import { parse } from 'url';
import { get } from 'https';
import { createWriteStream } from 'fs';

if (process.argv.length !== 2) {
  console.error('Usage: getphotos.js <iCloudAlbumHash> <~/Destination/Path>');
  process.exit(1);
}

const dir = join(process.env.HOME, process.argv[1]);

// Create dir
mkdir(dir, { recursive: true }, (err) => {
  if (err) throw err;
});

const data = await getImages(process.argv[2]);

console.log(data.photos[0]);
console.log(Object.keys(data));

for (let i in data.photos)
{
    let keys = Object.keys(data.photos[i].derivatives)
    let max = Math.max(...keys)
    let variant = data.photos[i].derivatives[max]
    let url = parse(variant.url, true)
    let filepath = dir + '/' + url.pathname.split('/')[url.pathname.split('/').length -1]
    console.log(max, url.href);

    // Download the file
    //
    try {
        const request = get(url.href, function(response) {
            let file = createWriteStream(filepath);
            response.pipe(file);

            // after download completed close filestream
            file.on("finish", () => {
                file.close();
                console.log("Downloaded to " + filepath);
            });
        });
    } catch (e) {
        console.error(e);
    }   

    // Sleep 1:
    await new Promise(resolve => setTimeout(resolve, 1000));
}
