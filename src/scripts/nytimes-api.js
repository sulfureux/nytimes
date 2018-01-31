import request from 'axios';

function crawlData({page = 0}) {
  const apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  return request({
    method: 'get',
    url: `${apiUrl}`,
    params: {
      'api-key': process.env.API_KEY,
      q: process.env.COLLECTION,
      page
    }
  });
}

export default crawlData;
