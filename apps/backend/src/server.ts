import { Hono } from 'hono'
import employeesRoute from './routes/employees';
import customersRoute from './routes/customers';
import servicesRoute from './routes/services';
import DetailTransactionsRoute from './routes/detail_transactions';
import { authMiddleware } from './lib/middleware/auth';
import { cors } from 'hono/cors'
import { getCookie } from 'hono/cookie';
import { verifyJWT } from './lib/utils/jwt';

const app = new Hono()


app.use('*',cors({
  origin: process.env.FRONTEND_URL as string,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.get('/me', async (c)=> {
  const token = getCookie(c,'auth_token')
  if (!token) {
    console.error(token)
    return c.json({ error: 'Unauthorized: No token provided' }, 401)
    
  }
  
  try {
    const user = await verifyJWT(token)
    // c.set("user", user) // bisa digunakan di route
    // await next()
    const frontend_url = process.env.FRONTEND_URL
    console.log(frontend_url)
    return c.json({"user": user})
  } catch (err) {
    return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401)
    }
})
//  Middleware Authentication
// app.use('/employees/*', (c, next) => {
//   if (c.req.path === '/employees/login') {
//     return next();
//   }
//   return authMiddleware(c, next);
// });
// app.use('/employees/*', authMiddleware)
// app.use('/customers/*', authMiddleware)
// app.use('/services/*', authMiddleware)
// app.use('/detailtransactions/*', authMiddleware)

app.route('/employees', employeesRoute)
app.route('/customers', customersRoute)
app.route('/services', servicesRoute)
app.route('/detailtransactions', DetailTransactionsRoute)

export default app
