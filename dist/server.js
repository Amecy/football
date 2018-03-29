const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
app.use('/static', express.static(`${__dirname}/static`));
// https://m.dongqiudi.com/home
app.use('/api', proxy({
  target: 'https://api.dongqiudi.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.listen(8060);
