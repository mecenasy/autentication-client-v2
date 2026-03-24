module.exports = {
  client: {
    service: {
      name: 'my-backend',
      url: 'http://localhost:3000/graphql',
    },
    includes: ['app/**/*.tsx', 'app/**/*.ts'],
    tagName: 'graphql'
  },
};