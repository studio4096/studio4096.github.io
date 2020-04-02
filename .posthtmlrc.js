module.exports = {
  plugins: {
    'posthtml-include': {
      root: __dirname
    },
    'posthtml-expressions': {
      root: __dirname,
      // Vueのデリミタと被るので別の形式にする
      // refs. https://github.com/parcel-bundler/parcel/issues/3270
      // delimiters: ['{{', '}}'],
      delimiters: ['{%', '%}'],
      // unescapeDelimiters: ['#{{{', '}}}'],
      unescapeDelimiters: ['#{%%', '%%}'],
      locals: {
        NODE_ENV: process.env.NODE_ENV
      }
    },
    'posthtml-md': {
      root: __dirname
    }
  }
};

