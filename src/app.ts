import fastify, { FastifyInstance } from 'fastify';

import { appRoutes } from '@/http/routes';

export const app: FastifyInstance = fastify({});

app.register(appRoutes);
