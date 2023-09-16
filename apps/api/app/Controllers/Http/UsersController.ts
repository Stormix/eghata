import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'

export default class UsersController {
  public async destroy({ params, response, auth, bouncer }: HttpContextContract) {
    try {
      await auth.use('api').authenticate()

      const user = await User.find(params.id)

      if (!user) {
        return response.notFound({
          error: { message: 'User not found' },
        })
      }

      const authenticatedUser = auth.user!

      if (await bouncer.denies('deleteUser' as never, authenticatedUser, user)) {
        return response.unauthorized({
          error: { message: 'You are not allowed to delete this user' },
        })
      }

      await user.delete()

      return response.noContent()
    } catch (error) {
      console.log(error)
      Logger.error('Failed to delete user: ', { error: error.message })
      return response.badRequest({
        error: { message: 'Unable delete the user' },
      })
    }
  }
}
