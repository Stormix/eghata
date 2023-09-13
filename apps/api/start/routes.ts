/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '../config/swagger'

Route.get('/', async () => {
  return { hello: 'world' }
})

// Returns swagger in YAML
Route.get('/swagger', async () => {
  return AutoSwagger.docs(Route.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
Route.get('/docs', async () => {
  return AutoSwagger.ui('/swagger')
})

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})
