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

// Routes for creating, updating, and deleting help requests
Route.post('help-requests', 'HelpRequestController.store')
Route.put('help-requests/:id', 'HelpRequestController.update')
Route.delete('help-requests/:id', 'HelpRequestController.destroy')

// Route for adding a type to a help request
Route.post('help-requests/:id/add-type', 'HelpRequestController.addType')

// Route for removing a type from a help request
Route.post('help-requests/:id/remove-type', 'HelpRequestController.removeType')

// Route for fetching all help requests
Route.get('help-requests', 'HelpRequestController.index')

// Route for fetching a help request by ID
Route.get('help-requests/:id', 'HelpRequestController.indexById')

// Route for fetching help requests by recent
Route.get('help-requests/recent', 'HelpRequestController.indexByRecent')

// Route for fetching help requests by oldest
Route.get('help-requests/oldest', 'HelpRequestController.indexByOldest')

// Route for fetching help requests by types
//Route.get('help-requests/by-types', 'HelpRequestController.indexByTypes');
