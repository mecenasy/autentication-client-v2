module.exports = {
  client: {
    service: {
      name: 'my-backend',
      url: 'http://localhost:3003/graphql',
    },
    includes: ['app/**/*.tsx', 'app/**/*.ts'],
    tagName: 'graphql'
  },
};