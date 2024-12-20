import { Express, Request, Response } from 'express';
import userRoutes from '../routes/user.routes';
const routes = (app: Express) => {
  app.get('/api/v1', (req: Request, res: Response) => res.send({ status: 200, message: 'Welcome to Sport Betting' }));
  app.use('/api/v1/account', userRoutes);

  app.all('*', (req: Request, res: Response) =>
    res.status(404).send({
      status: 404,
      message: "Oops the url has been moved or doesn't exist",
    })
  );
};

export default routes;
