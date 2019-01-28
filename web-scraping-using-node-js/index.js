const axios = require('axios');
const cheerio = require('cheerio');

const ynetURL = 'https://ynet.co.il/home/0,7340,L-8,00.html'
let ynetData = [];
let wallaData = [];


const getYnetData = html => {
  const $ = cheerio.load(html);
  $('.block .B6 .element.ghcite .cell .str3s_txt').each((i, elem) => {
    ynetData.push({
      title: $(elem).find('.title').text(),
      subTitle: $(elem).find('.sub_title').text()
    })
  })
}

const wallaURL = 'https://www.walla.co.il/'

const getWallaData = html => {
  const $ = cheerio.load(html);
  $('.editor-selections article.fc.common-article').each((i, elem) => {
    wallaData.push({
      title: $(elem).find('.text').text(),
      subTitle: $(elem).find('p').text()
    })
  })
  console.log("כותרות ראשיות Walla", wallaData)
  console.log("כותרות ראשיות Ynet", ynetData)

  compareNewsText(ynetData, wallaData);
}

const getWallaDataFromURL = () => {
  axios.get(wallaURL).then (response => {
    getWallaData(response.data);
  }).catch(error => {
    console.log(error);
  })
}

const compareNewsText = (firstTextArray, secondTextArray) => {
  findLongestCommonSubstringBetweenText(firstTextArray, secondTextArray)
  // TODO
  // 1. find all common substrings
  // 2. find a strong connection between the substrings
}

const findLongestCommonSubstringBetweenText =  function(firstTextArray, secondTextArray) {
  const firstTextTitlesLongString = firstTextArray.map(arr =>arr.title).join(' ');
  const secondTextTitlesLongString = secondTextArray.map(arr => arr.title).join(' ');
  const commonTitleText = findLongestCommonSubstring(firstTextTitlesLongString, secondTextTitlesLongString);
  console.log('טקסט משותף בין כותרות')
  console.log('---------------------')
  console.log(commonTitleText)
  console.log('---------------------')
  const firstTextSubTitlesLongString = firstTextArray.map(arr =>arr.subTitle).join(' ');
  const secondTextSubTitlesLongString = secondTextArray.map(arr => arr.subTitle).join(' ');
  const commonSubTitleText = findLongestCommonSubstring(firstTextSubTitlesLongString, secondTextSubTitlesLongString);
  console.log('טקסט משותף בין תוכן')
  console.log('---------------------')
  console.log(commonSubTitleText)
  console.log('---------------------')
  const firstTextLongString = firstTextTitlesLongString + ' ' + firstTextSubTitlesLongString;
  const secondTextLongString = secondTextTitlesLongString + ' ' + secondTextSubTitlesLongString;
  const commonText = findLongestCommonSubstring(firstTextLongString, secondTextLongString);
  console.log('טקסט משותף בין כל הטקסט')
  console.log('---------------------')
  console.log(commonText)
  console.log('---------------------')
}

const findLongestCommonSubstring = function(firstStr, secondStr) {
  let longest = '';
  let str;
  let k = 1;
  // loop through the first string
  for (let i = 0; i < firstStr.length; ++i) {
    // loop through the second string
    for (let j = 0; j < secondStr.length; ++j) {
      // if it's the same letter
      if (firstStr[i] === secondStr[j]) {
        str = firstStr[i];
        k = 1;
        // keep going until the letters no longer match, or we reach end
        while (i+k < firstStr.length && j+k < secondStr.length // haven't reached end
               && firstStr[i+k] === secondStr[j+k]) { // same letter
          str += firstStr[i+k];
          ++k;
        }
        // if this substring is longer than the longest, save it as the longest
        if (str.length > longest.length) { longest = str }
      }
    }
  }
  return longest;
}


axios.get(ynetURL).then (response => {
  getYnetData(response.data);
  getWallaDataFromURL();
}).catch(error => {
  console.log(error);
})


