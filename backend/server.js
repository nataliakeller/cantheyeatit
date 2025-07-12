const fastify = require('fastify')({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        colorize: true
      }
    }
  }
});

const cors = require('@fastify/cors');
const mssql = require('fastify-mssql')
const dotenv = require('dotenv');
const swagger = require('@fastify/swagger');
const swaggerUI = require('@fastify/swagger-ui');
dotenv.config();


fastify.addHook('onRequest', async (request, reply) => {
  const { method, url } = request.raw;
  const timestamp = new Date().toISOString();
  request.log.info(`[REQ] ${method} ${url} at ${timestamp}`);
});

// Enable CORS
fastify.register(cors, {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200 // For legacy browser support
});


// Registra o plugin MSSQL com as configurações do .env
fastify.register(mssql, {
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

fastify.register(swagger, {
  swagger: {
    info: {
      title: 'CanTheyEatIt API',
      description: 'API for checking if foods are safe for pets',
      version: '1.0.0',
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  }
});

fastify.register(swaggerUI, {
  routePrefix: '/swagger',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
    tryItOutEnabled: true
  },
  staticCSP: false,
  transformSpecificationClone: true
});


const foodRoutes = require('./routes/foods');
fastify.register(foodRoutes);

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return { 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'CanTheyEatIt API'
  };
});

fastify.get('/test', async (request, reply) => {
  return { message: 'API is working!', cors: 'enabled' };
});


// Azure fornisce la porta tramite process.env.PORT. Se non esiste, usa la 3000 (per lo sviluppo locale).
const port = process.env.PORT || 5000;
fastify.listen({ port: port, host: '0.0.0.0' })
  .then(() => {
    fastify.log.info(`Server listening on port ${port}`);
  })
  .catch(err => {
    fastify.log.error(err);
    process.exit(1);
  });