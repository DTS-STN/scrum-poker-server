import { ApolloServer } from 'apollo-server-express'
import schema from './api/graphql/schema.js'
import { createServer } from 'http'
import express from 'express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { pubsub } from './api/graphql/pubsub.js'
import { rateLimit } from 'express-rate-limit'
;(async function () {
  const app = express()
  const httpServer = createServer(app)

  const RATE_LIMIT_TIME = process.env.RATE_LIMIT_TIME || 10 // in minutes
  const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX || 1000
  const RATE_LIMIT_MESSAGE =
    process.env.RATE_LIMIT_MESSAGE ||
    'Too many requests, please try again later.'

  const limiter = rateLimit({
    windowMs: RATE_LIMIT_TIME * 60 * 1000, // in minutes
    max: RATE_LIMIT_MAX, // Limit each IP to n requests per `window` (default 400 per 10 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: RATE_LIMIT_MESSAGE, // Message returned to the user
  })

  app.use(limiter)

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    // Apollo Server path
    path: '/graphql',
  })

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema, context: { pubsub } }, wsServer)

  // Creating Apollo server
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  //Start Apollo Server
  await server.start()
  server.applyMiddleware({ app })

  // The `listen` method launches a web server.
  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  )
})()
