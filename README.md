# iCloud Photos Downloader

A simple download script for an iCloud photos library, using the `icloud-shared-album` node module.


## Usage

Install the node modules using `npm`.

Then run `node getphotos.js <iCloud-Album-id> <destination/path>`.

Your iCloud Album ID can be found by signing into icloud.com online with your 
Apple ID and copying the album ID from the URL. It will look like "A0B1C2D3E4F567".

The file path for the destination folder will be found from the home directory.
So if you pass `Pictures/somefolder` it will be relative to your home directory,
not the current directory.

## Licence

It's not much, but it's free. Public Domain, 2022

