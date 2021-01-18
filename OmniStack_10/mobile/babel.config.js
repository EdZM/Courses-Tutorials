// converte o javaScript que usei no código(versao mais recente) para outras versoes, caso haja necessidade
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
