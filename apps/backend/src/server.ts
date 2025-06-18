import { Hono } from 'hono'
import employeesRoute from './routes/employees';
import customersRoute from './routes/customers';
import servicesRoute from './routes/services';
import DetailTransactionsRoute from './routes/detail_transactions';
import { authMiddleware } from './lib/middleware/auth';
import { cors } from 'hono/cors'

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
    app.use('/employees/*', (c, next) => {
      if (c.req.path === '/employees/login') {
          return next();
        }
        return authMiddleware(c, next);
      });
    app.use('/me', authMiddleware)
    app.use('/customers/*', authMiddleware)
    app.use('/services/*', authMiddleware)
    app.use('/detailtransactions/*', authMiddleware)

    app.route('/employees', employeesRoute)
    app.route('/customers', customersRoute)
    app.route('/services', servicesRoute)
    app.route('/detailtransactions', DetailTransactionsRoute)
    app.get('/me', (c) => {
      const user = c.get('user'); // get JWT payload from context
      return c.json({ user: user });
    })
    
export default app
