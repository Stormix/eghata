import { Limiter } from '@adonisjs/limiter/build/services/index'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from '../../Models/User'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const throttleKey = `register_${request.ip()}`

    const limiter = Limiter.use({
      requests: 5,
      duration: '60 mins',
      blockDuration: '8 hours',
    })

    try {
      const userSchema = schema.create({
        fingerprint: schema.string({ trim: true }, [
          rules.unique({ table: 'users', column: 'fingerprint', caseInsensitive: false }),
        ]),
      })
      const data = await request.validate({ schema: userSchema })

      if (await limiter.isBlocked(throttleKey)) {
        return response.tooManyRequests({
          error: { message: 'Too many requests. Please try after some time' },
        })
      }

      const user = await User.create(data)
      const token = await auth.use('api').generate(user)

      return response.json({ token })
    } catch (error) {
      await limiter.increment(throttleKey)
      return response.badRequest({
        error: { message: 'Unable to register' },
      })
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { fingerprint } = request.only(['fingerprint'])

    const throttleKey = `login_${fingerprint}_${request.ip()}`

    const limiter = Limiter.use({
      requests: 1,
      duration: '15 mins',
      blockDuration: '30 mins',
    })

    if (await limiter.isBlocked(throttleKey)) {
      return response.tooManyRequests({
        error: { message: 'Too many requests. Please try after some time' },
      })
    }

    try {
      const user = await User.findByOrFail('fingerprint', fingerprint)

      const token = await auth.use('api').generate(user)

      return response.json({ token })
    } catch (error) {
      await limiter.increment(throttleKey)
      return response.unauthorized({
        error: { message: 'Invalid fingerprint' },
      })
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
      return response.json({ message: 'Logout successful' })
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable to logout' },
      })
    }
  }
}
