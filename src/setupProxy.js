const proxy = require("http-proxy-middleware");
 
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "http://napoleonxzy.cn:18080",
      changeOrigin: true,
      pathRewrite:{'^/api':''}
    })
  );
};