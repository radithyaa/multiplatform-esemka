import { Hono } from 'hono'
import employeesRoute from './routes/employees';
import customersRoute from './routes/customers';
import servicesRoute from './routes/services';
import DetailTransactionsRoute from './routes/detail_transactions';
import { authMiddleware } from './lib/middleware/auth';
import { cors } from 'hono/cors'

const app = new Hono()

app.use(cors({
  origin: "http://localhost:1420", // Allow all origins if FRONTEND_URL is undefined
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))

// //  Middleware Authentication
// app.use('/employees/*', (c, next) => {
//   if (c.req.path === '/employees/login') {
//     return next();
//   }
//   return authMiddleware(c, next);
// });
// app.use('/customers/*', authMiddleware)
// app.use('/services/*', authMiddleware)
// app.use('/detailtransactions/*', authMiddleware)

app.route('/employees', employeesRoute)
app.route('/customers', customersRoute)
app.route('/services', servicesRoute)
app.route('/detailtransactions', DetailTransactionsRoute)

export default app
