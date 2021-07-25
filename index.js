const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const gql = require('graphql-tag');
const {makeExecutableSchema} = require('graphql-tools');

const app = express();

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: Int!): User!
  }

  type Mutation {
    editUser(id: Int!, name: String!, email: String!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]
  }

  type Post {
    id: ID!
    title: String!
    published: Boolean!
    link: String
  }
`;

const data = [
  {
    id: 1,
    name: "Fikayo Adepoju",
    email: "fik4christ@yahoo.com",
    posts: [
      {
        id: 1,
        title: "Creating an Emoji Game with Vue, Auth0, and Google Vision API",
        published: true,
        link:
          "https://auth0.com/blog/creating-an-emoji-game-with-vue-auth0-and-google-vision-api/",
        author: 1
      },
      {
        id: 2,
        title: "Electron Tutorial: Building Modern Desktop Apps with Vue.js",
        published: true,
        link:
          "https://auth0.com/blog/electron-tutorial-building-modern-desktop-apps-with-vue-js/",
        author: 1
      },
      {
        id: 3,
        title: "State Management with Vuex: a Practical Tutorial",
        published: true,
        link:
          "https://auth0.com/blog/state-management-with-vuex-a-practical-tutorial/",
        author: 1
      }
    ]
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@company.com",
    posts: [
      {
        id: 4,
        title: "Build a CI powered RESTful API with Laravel",
        published: true,
        link:
          "https://circleci.com/blog/build-a-ci-powered-restful-api-with-laravel/",
        author: 2
      },
      {
        id: 5,
        title: "Automate your Nuxt.js app deployment",
        published: true,
        link: "https://circleci.com/blog/automate-your-nuxt-js-app-deployment/",
        author: 2
      }
    ]
  },
  {
    id: 3,
    name: "Jane Paul",
    email: "jane@company.com",
    posts: []
  }
];

const resolvers = {
  Query: {
    users: () => data,
    user: (_context, {id}) => data.find(user => user.id === id)
  },
  Mutation: {
    editUser: async (_context, {id, name, email}) => {
      const user = data.find(user => user.id === id);
      user.name = name;
      user.email = email;
      return user;
    }
  }
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({resolvers, typeDefs}),
    graphiql: true
  })
);

const PORT = process.env.PORT || '8000';

app.listen(PORT, () => {
  console.log(`Listening on port!!`)
});
