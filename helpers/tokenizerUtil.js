const kuromoji = require('kuromoji');

const dicPath = process.cwd() + '/node_modules/kuromoji/dict';
let tokenizer;

module.exports = {
  build(callback) {
    kuromoji.builder({ dicPath }).build((err, res) => {
      tokenizer = res;
      callback();
    });
  },

  tokenize(str) {
    const tokens = tokenizer.tokenize(str);
    const knownTokens = tokens.filter(token => token.word_type === 'KNOWN');
    return knownTokens;
  },
};
