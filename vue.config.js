module.exports = {
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    disableHostCheck: true, // 忽略host检查, 从而不会出现hot-reload失效
  },
};
