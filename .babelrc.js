const babelConfig = {
  presets: [['next/babel', {'preset-react': {runtime: 'automatic'}}]],
  plugins: ['babel-plugin-macros', ['styled-components', {ssr: true}]],
};

module.exports = babelConfig;
