const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const neo4j = require("neo4j-driver");
const bodyParser = require("body-parser");
const compression = require("compression");
const typeDefs = require("./graphql/allTypeDefs");
const resolvers = require("./graphql/allResolvers");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");

// first set the environment variables from the .env file
dotenv.config();

async function startApolloServer() {
  /*
   * Create a Neo4j driver instance to connect to the database
   * using credentials specified as environment variables
   * with fallback to defaults
   */
  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(
      process.env.NEO4J_USER,
      process.env.NEO4J_PASSWORD 
    )
    // {
    //   encrypted: "ENCRYPTION_ON",
    //   trust: "TRUST_ALL_CERTIFICATES",
    // }
  );

  const neoSchema = new Neo4jGraphQL({
    typeDefs,
    resolvers,
    driver,
    // config: {
    //   jwt: {
    //     secret: process.env.JWT_SECRET,
    //   },
    // },
  });

  const server = new ApolloServer({
    context: ({ req }) => {
      return {
        req,
      };
    },
    schema: neoSchema.schema,
    introspection: true,
  });

  // new change in apollo server v3
  // if using apollo-server-express, you have to insert a call
  // to await server.start() between server = new ApolloServer
  // and server.applyMiddleware
  // https://www.apollographql.com/docs/apollo-server/api/apollo-server/#start
  await server.start();

  // intitialize express app
  const app = express();

  // Bind middleware to the app
  // https://www.apollographql.com/docs/apollo-server/api/apollo-server/#applymiddleware

  // 1.) file compression middleware
  app.use(compression());

  app.use(cors());

  // for parsing the req.body json or other types
  app.use(bodyParser.json());

  // 2.) gql upload express middleware
  app.use(
    graphqlUploadExpress({
      maxFileSize: 100000000,
      maxFiles: 20,
    })
  );

  // Specify host, port and path for GraphQL endpoint
  const port = process.env.GRAPHQL_SERVER_PORT || 5000;
  const path = process.env.GRAPHQL_SERVER_PATH || "/graphql";
  const host = process.env.GRAPHQL_SERVER_HOST || "127.0.0.1";

  // Mount apollo middleware here
  server.applyMiddleware({ app, path });

  await new Promise((resolve) => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`);
  return { server, app };
}

// START THE SERVER
startApolloServer();
