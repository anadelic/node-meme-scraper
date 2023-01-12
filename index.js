import * as fs from 'node:fs';
import * as http from 'node:https';
import axios from 'axios';
import * as cheerio from 'cheerio';

//main url
const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

//making a folder

const memesFolder = './memes';

try {
  if (!fs.existsSync(memesFolder)) {
    fs.mkdirSync(memesFolder);
  }
  //handle error
} catch (err) {
  console.error(err);
}

//making a request
axios
  .get(websiteUrl)
  .then(function (response) {
    const html = response.data;
    const $ = cheerio.load(html);
    const urls = [];

    $('img', html).each(function () {
      const url = $(this).attr('src');
      urls.push(url);
    });
    const someImgs = urls.slice(0, 10);

    someImgs.forEach(
      function (currentLink) {
        const image = currentLink;
      },
      function download(url, filePath) {
        http.get(url, (res) => {
          res.pipe(fs.createWriteStream(memesFolder));
        });
        download(image, memesFolder);
      },
    );
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
