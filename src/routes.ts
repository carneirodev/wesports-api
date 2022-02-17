import { Router } from 'express';
import authMiddleware from './middlewares/ensureAuthenticated';

import { CreateUserController } from './controllers/CreateUserController';
import { DeleteUserController } from './controllers/DeleteUserController';
import { GetAllUsersController } from './controllers/GetAllUsersController';
import { UpdateUserController } from './controllers/UpdateUserController';

import { CreateScheduleController } from './controllers/CreateScheduleController';
import { DeleteScheduleController } from './controllers/DeleteScheduleController';
import { GetAllSchedulesController } from './controllers/GetAllSchedulesController';
import { UpdateScheduleController } from './controllers/UpdateScheduleController';

import { SessionsController } from './controllers/SessionsController';

const routes = Router();

routes.post('/user', new CreateUserController().handle);
routes.post('/sessions', new SessionsController().handle);

// routes.use(authMiddleware);

routes.get('/user', new GetAllUsersController().handle);
routes.delete('/user/:id', new DeleteUserController().handle);

routes.put('/user/:id', new UpdateUserController().handle);

routes.post('/schedule', new CreateScheduleController().handle);
routes.get('/schedule', new GetAllSchedulesController().handle);
routes.delete('/schedule/:id', new DeleteScheduleController().handle);
routes.put('/schedule/:id', new UpdateScheduleController().handle);


export { routes };




