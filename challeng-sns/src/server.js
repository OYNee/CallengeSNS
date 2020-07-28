import "./env";
import {GraphQLServer} from "graphql-yoga";
import { prisma } from "../generated/prisma-client";
import logger from "morgan"
import schema from "./schema"
import "./passport";
import { authenticateJwt } from "./passport";

// import { sendSecretMail } from "./utils";

// sendSecretMail("leegj93@gmail.com", 123)

const PORT = process.env.PORT || 4040;
console.log(PORT)

const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request })
  });

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);