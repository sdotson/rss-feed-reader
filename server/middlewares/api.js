
const routes = require('express').Router();
const request = require('request');
const parseString = require('xml2js').parseString;

routes.get('/rss', (req, res) => {
  res.status(200).json({ message: 'Get Connected!' });
});

function transformRss(rss) {
  const title = rss.channel[0].title[0];
  const link = rss.channel[0].link[0]
  const articles = rss.channel[0].item.map((article) => {
    return {
      title: article.title[0],
      link: article.link[0]
    }
  });

  return {
    title,
    link,
    articles
  };
}

routes.post('/rss', (req, res) => {
  request(req.body.url, (error, response, body) => {
    if (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    } else {
      if (response.statusCode === 200) {
        parseString(body, (err, result) => {
          if (err) {
            res.status(400).json({
              status: 'error',
              message: err.message
            });
          }
          const { link, title, articles } = transformRss(result.rss);
          res.status(200).json({
            status: 'success',
            link,
            title,
            articles
          });
        });
      } else {
        res.status(400).json({
          status: 'error',
          message: 'The RSS feed could not be retrieved.'
        });
    }

    }
  });
});

module.exports = routes;
