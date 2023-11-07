const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://192.168.172.17:5000", // Specify the base URL for the API
      changeOrigin: true,
    })
  );
};
