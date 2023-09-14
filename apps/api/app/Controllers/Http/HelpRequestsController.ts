import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HelpRequest from '../../Models/HelpRequest'
;('use strict')

export default class HelpRequestController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only([
        'longitude',
        'latitude',
        'address',
        'description',
        'source',
        'status',
        'name',
        'phone',
        'email',
        'isOnSite',
      ])

      const helpRequest = await HelpRequest.create(data)

      if (request.input('types')) {
        const types = request.input('types')
        const typesQuery = helpRequest.related('types')
        await typesQuery.attach(types)
      }

      await helpRequest.load('types')

      return response.created(helpRequest)
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable add the help request' },
      })
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const helpRequest = await HelpRequest.findOrFail(params.id)

      const data = request.only([
        'longitude',
        'latitude',
        'address',
        'description',
        'source',
        'status',
        'name',
        'phone',
        'email',
        'isOnSite',
      ])

      helpRequest.merge(data)

      await helpRequest.save()

      return helpRequest
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable update the help request' },
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const helpRequest = await HelpRequest.findOrFail(params.id)

      await helpRequest.delete()
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable delete the help request' },
      })
    }
  }

  public async addType({ params, request, response }: HttpContextContract) {
    try {
      const helpRequest = await HelpRequest.findOrFail(params.id)

      const { typeId } = request.only(['typeId'])

      const typesQuery = helpRequest.related('types')
      await typesQuery.attach([typeId])

      return helpRequest.load('types')
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable to add the types to the help request' },
      })
    }
  }

  public async removeType({ params, request, response }: HttpContextContract) {
    try {
      const helpRequest = await HelpRequest.findOrFail(params.id)

      const { typeId } = request.only(['typeId'])

      const typesQuery = helpRequest.related('types')
      await typesQuery.detach([typeId])

      return helpRequest.load('types')
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable to remove the types from the help request' },
      })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const helpRequests = await HelpRequest.all()

      return helpRequests
    } catch (error) {
      return response.noContent()
    }
  }

  public async indexById({ params, response }: HttpContextContract) {
    try {
      const helpRequest = await HelpRequest.find(params.id)

      return helpRequest
    } catch (error) {
      return response.noContent()
    }
  }

  public async indexByRecent({ response }: HttpContextContract) {
    try {
      const helpRequests = await HelpRequest.query().orderBy('created_at', 'desc')

      return helpRequests
    } catch (error) {
      return response.noContent()
    }
  }

  public async indexByOldest({ response }: HttpContextContract) {
    try {
      const helpRequests = await HelpRequest.query().orderBy('created_at', 'asc')

      return helpRequests
    } catch (error) {
      return response.noContent()
    }
  }
  /*
  public async indexByTypes({ request, response }: HttpContextContract) {
    try {
      const { types } = request.get()

      // Fetch help requests by types
      const helpRequests = await HelpRequest.query()
        .whereHas('types', (builder) => {
          builder.whereIn('type', types.split(',')) // Assuming types are comma-separated
        })
        .fetch()

      return response.status(200).json({ data: helpRequests })
    } catch (error) {
      return response.noContent()
    }
  }
  */
}
