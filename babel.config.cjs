// babel.config.cjs
module.exports = {
  presets: [
    // compile modern JS down to your current Node
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // compile JSX (and enable the new automatic import runtime)
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
