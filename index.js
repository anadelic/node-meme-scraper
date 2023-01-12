import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

//main url
const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

//making a folder

try {
  if (!fs.existsSync('./memes')) {
    fs.mkdirSync('./memes');
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
    console.log(someImgs);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
