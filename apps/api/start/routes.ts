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

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.resource('offers', 'OffersController')
  .middleware({
    store: ['auth'],
    destroy: ['auth'],
  })
  .apiOnly()

Route.resource('carpooling-ads', 'CarpoolingAdsController')
  .middleware({
    destroy: ['auth'],
    update: ['auth'],
  })
  .apiOnly()

Route.resource('help-requests', 'HelpRequestsController')
  .middleware({
    destroy: ['auth'],
    update: ['auth'],
  })
  .apiOnly()

Route.resource('types', 'TypesController')
  .middleware({
    store: ['auth'],
    destroy: ['auth'],
    update: ['auth'],
  })
  .apiOnly()

Route.resource('users', 'UsersController')
  .middleware({
    '*': ['auth'],
  })
  .apiOnly()

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout').middleware('auth:api')

// Dynamic routes for the duplicate routes
Route.post('/:controller', ({ params }) => {
  return `${params.controller}Controller.store`
})

Route.put('/:controller/:id', ({ params }) => {
  return `${params.controller}Controller.update`
})

Route.delete('/:controller/:id', ({ params }) => {
  return `${params.controller}Controller.destroy`
})

Route.post('/:controller/:id/add-type', ({ params }) => {
  return `${params.controller}Controller.addType`
})

Route.post('/:controller/:id/remove-type', ({ params }) => {
  return `${params.controller}Controller.removeType`
})

Route.get('/:controller', ({ params }) => {
  return `${params.controller}Controller.index`
})

Route.get('/:controller/:id', ({ params }) => {
  return `${params.controller}Controller.indexById`
})

Route.get('/:controller/recent', ({ params }) => {
  return `${params.controller}Controller.indexByRecent`
})

Route.get('/:controller/oldest', ({ params }) => {
  return `${params.controller}Controller.indexByOldest`
})

// Route for fetching help requests by types
//Route.get('help-requests/by-types', 'HelpRequestController.indexByTypes');
