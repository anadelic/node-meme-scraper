import axios from 'axios';
import * as cheerio from 'cheerio';

//main url
const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

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
    console.log(urls.slice(0, 10));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
