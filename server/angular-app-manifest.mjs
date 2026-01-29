
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/portfolio/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/portfolio"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 4061, hash: 'ab6860231e2f17fd9e3c892dfd162655587cf0c235e5f8423a65d4dbdb427602', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2366, hash: 'e9bf4da7043d3f7f07f7ae11882ffaf6c65c071c7744f4e77f45875d71d150f7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 96310, hash: '5334e93bbbd79f3df4753e296e33782ef125feb9fbdac31be4c2c0e245e7e51b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-MC5MIS7Q.css': {size: 369918, hash: 'n4LvEk8Wugo', text: () => import('./assets-chunks/styles-MC5MIS7Q_css.mjs').then(m => m.default)}
  },
};
