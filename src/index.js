const { GraphQLServer } = require("graphql-yoga");

//typeDefs defines GraphQL schema
const typeDefs = `
  type Query {
  info: String!
  feed: [Link!]!
}
  
  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
}
`;

//Dummy data list:
//Just an example, in a real project it'd be in a database

let links = [
  {
    id: "link-0",
    url: "https://news.ycombinator.com/",
    description: "Hackernews"
  }
];

//Actual implementation of GraphQL schema. Structure is identical to typedef
//Probably best to put in another file then import it here so that it is neater
//Resolvers are javascript objects with functions
//Each field in the application schema is represented by a function with the same name.

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone`,
    feed: () => links
  }
  //Inclusion of Link resolvers is trivial so not necessary.
  //GraphQL is smart enough to make the connection.
  // Link: {
  //   id: parent => parent.id,
  //   description: parent => parent.description,
  //   url: parent => parent.url
  // }
};

//Schema & resolvers are bundled and passed to GraphQLServer imported from graphql-yoga.
//Tells server what API operation are accepted and how they should be resolved.
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
