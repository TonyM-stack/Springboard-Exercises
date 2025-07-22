// jest.config.cjs
module.exports = {
  testEnvironment: 'jest-environment-jsdom',

  // tell Jest to use babel-jest for all .js/.jsx/.ts/.tsx files
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },

  moduleFileExtensions: ['js','jsx','json'],
  // by default Jest ignores node_modules. We need to transform nanoid too.
  transformIgnorePatterns: [
    '/node_modules/(?!nanoid/)'
  ],

  // mock out CSS imports so they don’t crash your tests
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy'
  },

  // if you want to pull in jest-dom matchers automatically:
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};

setupFilesAfterEnv: ['<rootDir>/jest.setup.js'] 




