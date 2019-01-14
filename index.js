const axios = require('axios');
const cheerio = require('cheerio');

const ynetURL = 'https://ynet.co.il/home/0,7340,L-8,00.html'

const getData = html => {
  let mainData = [];
  const $ = cheerio.load(html);
  $('.block .B6 .element.ghcite .cell .str3s_txt').each((i, elem) => {
    mainData.push({
      title: $(elem).find('.title').text(),
      sub_title: $(elem).find('.sub_title').text()
    })
  })
  console.log("כותרות ראשיות", mainData)
}

axios.get(ynetURL).then (response => {
  getData(response.data);
}).catch(error => {
  console.log(error);
})
