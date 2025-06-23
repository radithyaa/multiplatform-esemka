import { Hono } from 'hono'
import employeesRoute from './routes/employees';
import customersRoute from './routes/customers';
import servicesRoute from './routes/services';
import DetailTransactionsRoute from './routes/detail_transactions';
import { authMiddleware } from './lib/middleware/auth';
import { cors } from 'hono/cors'
import userRoute from './routes/user';

type Variables = {
  user: string
}

const app = new Hono<{Variables: Variables}>()

app.use('*',cors({
  origin: process.env.FRONTEND_URL as string,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

//  Middleware Authentication
    app.use('/employees/*', authMiddleware)
    app.use('/customers/*', authMiddleware)
    app.use('/services/*', authMiddleware)
    app.use('/detailtransactions/*', authMiddleware)
    // Middleware except for /login route
    app.use('/user/*', async (c, next) => {
      const path = c.req.path;
      if (path === '/user/login' || path === '/user/refresh' || path === '/user/logout') {
        return await next();
      }
      return await authMiddleware(c, next);
    })

    app.route('/employees', employeesRoute)
    app.route('/customers', customersRoute)
    app.route('/services', servicesRoute)
    app.route('/detailtransactions', DetailTransactionsRoute)
    app.route('/user', userRoute)
    
    
export default app
