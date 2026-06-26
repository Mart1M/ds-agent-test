/**
 * Style Dictionary v4 Configuration
 * Transforms DTCG tokens to CSS custom properties
 */

export default {
  source: ['src/tokens/source/**/*.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/tokens/generated/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
