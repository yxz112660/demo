import * as fs from 'fs';
import * as nodePath from 'node:path';
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from 'postcss-pxtorem'

const dataUrlLoader: Plugin = {
  name: 'data-url-loader',
  transform(code, id) {
      const [path, query] = id.split('?');
      if (query != 'data-url')
          return null;

      const data = fs.readFileSync(path);
      const dataURL = `image://data:image/${ nodePath.extname(path) };base64,` + data.toString('base64');

      return `export default '${dataURL}';`;
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dataUrlLoader, vue()],
  css:{
    postcss:{
      plugins:[
        postCssPxToRem({
          rootValue: 192,
          propList:['*'],
        })
      ]
    }
  }
});
