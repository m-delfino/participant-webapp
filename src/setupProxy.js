import { createProxyMiddleware } from 'http-proxy-middleware';

const target = "https://local.influweb.org";

export default function(app) {

  app.use(
    '/api',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api/': '/api/',
      },
      onProxyReq: function(request) {
        request.setHeader("origin", target);
      },
    })
  );
}
