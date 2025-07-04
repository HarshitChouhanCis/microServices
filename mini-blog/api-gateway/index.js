const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/auth', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true }));
app.use('/posts', createProxyMiddleware({ target: 'http://localhost:4001', changeOrigin: true }));

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});
