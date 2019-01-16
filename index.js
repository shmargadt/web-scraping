const axios = require('axios');
const cheerio = require('cheerio');

const ynetURL = 'https://ynet.co.il/home/0,7340,L-8,00.html'
let ynetData;
let wallaData;


const getYnetData = html => {
  let ynetData = [];
  const $ = cheerio.load(html);
  $('.block .B6 .element.ghcite .cell .str3s_txt').each((i, elem) => {
    ynetData.push({
      title: $(elem).find('.title').text(),
      sub_title: $(elem).find('.sub_title').text()
    })
  })
  console.log("כותרות ראשיות Ynet", ynetData)
}

const wallaURL = 'https://www.walla.co.il/'

const getWallaData = html => {
  let wallaData = [];
  const $ = cheerio.load(html);
  $('.editor-selections article.fc.common-article').each((i, elem) => {
    wallaData.push({
      title: $(elem).find('.text').text(),
      sub_title: $(elem).find('p').text()
    })
  })
  console.log("כותרות ראשיות Walla", wallaData)
}

const getWallaDataFromURL = () => {
  axios.get(wallaURL).then (response => {
    getWallaData(response.data);
    compareNewsText(ynetData, wallaURL);
  }).catch(error => {
    console.log(error);
  })
}

const compareNewsText = (firstTextArray, secondTextArray) => {
  // TODO
}

axios.get(ynetURL).then (response => {
  getYnetData(response.data);
  getWallaDataFromURL();
}).catch(error => {
  console.log(error);
})


