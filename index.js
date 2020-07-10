if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
require('./db/mongoose');
const ShortUrl = require('./model/Url');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

let temp = null;
app.get('/', (req, res) => {
  if (temp != null) res.render('index', { shortUrls: temp.short });
  else res.render('index', { shortUrls: '' });
});

app.post('/shorten', async (req, res) => {
  try {
    await ShortUrl.create({ full: req.body.url });
    temp = await ShortUrl.findOne({ full: req.body.url });
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.save();
  res.redirect(shortUrl.full);
});

app.get('*', (req, res) => {
  res.send('404');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
