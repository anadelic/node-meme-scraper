import * as fs from 'node:fs';
import * as https from 'node:https';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cliProgress from 'cli-progress';

// main url

const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

// progress bar
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// making a folder

const memesFolder = './memes';

bar1.start(200, 0);
try {
  if (!fs.existsSync(memesFolder)) {
    fs.mkdirSync(memesFolder);
  }
  // handle error
} catch (err) {
  console.error(err);
}

// making a request
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
    bar1.update(100);

    // slicing 10 urls
    const someImgs = urls.slice(0, 10);
    // downloading and putting in the folder
    for (let i = 0; i < 10; i++) {
      const img = someImgs[i];
      https.get(img, (res) => {
        const path = `memes/0${i + 1}.jpg`;
        res.pipe(fs.createWriteStream(path));
      });
    }
    bar1.update(200);
    bar1.stop();
    console.log('Downloading is finished.');
  }) // handle error
  .catch(function (error) {
    console.log(error);
  });
