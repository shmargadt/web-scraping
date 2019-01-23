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
  compareNewsText(ynetData, wallaURL);
}

const getWallaDataFromURL = () => {
  axios.get(wallaURL).then (response => {
    getWallaData(response.data);
  }).catch(error => {
    console.log(error);
  })
}

const compareNewsText = (firstTextArray, secondTextArray) => {
  // TODO
  const firstTextTitlesArray = firstTextArray.map(arr =>arr.title);
  const secondTextTitlesArray = firstTextArray.map(arr => arr.title);
  const commonText = LCSubstr(firstTextArray, secondTextArray)
  console.log(commonText)
}

function LCSubstr(firstTextArray, secondTextArray) {
  let lcsArr = new Array(firstTextArray).fill(0).map(item =>(new Array(secondTextArray).fill(0))) 
  let z = 0
  let ret = ''
  for (let i=0;i++;i<firstTextArray.length) {
    for (let j=0;j++;j<secondTextArray.length) {
      // 1 cond
      if (firstTextArray[i] === secondTextArray[j]) {
        // 1.a cond
        if (i === 1 || j === 1) {
          lcsArr[i,j] = 1
        }
        else {
          lcsArr[i,j] = lcsArr[i-1,j-1] + 1
        }

        // 1.b cond
        if (lcsArr[i,j] > z) {
          z = lcsArr[i,j]
          ret = firstTextArray.slice(i-z+1,i).join('')
        }
        else {
          // 1.b.a cond
          if (lcsArr[i,j] === z) {
            ret = ret + firstTextArray.slice(i-z+1,i).join('')
          }
        }

      }
      else {
        lcsArr[i,j] = 0
      }
    };
  }
  return ret;
}


axios.get(ynetURL).then (response => {
  getYnetData(response.data);
  getWallaDataFromURL();
}).catch(error => {
  console.log(error);
})


