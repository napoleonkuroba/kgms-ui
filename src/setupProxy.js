const proxy = require("http-proxy-middleware");
 
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "napoleonxzy.cn:18080",
      changeOrigin: true,
      pathRewrite:{'^/api':''}
    })
  );
};