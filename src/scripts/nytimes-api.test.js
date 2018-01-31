import API from '@/scripts/nytimes-api';

describe('Fetch data from NYTimes API', () => {
  test('Normal way to fetch data', () => {
    let page = 0;

    API({page})
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.doc).toHaveLength(10);
      })
      .catch(() => {

      });
  });
});
