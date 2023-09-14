import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HelpRequest from '../../Models/HelpRequest'
;('use strict')

export default class HelpRequestController {
  public async store({ request }: HttpContextContract) {
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

      return helpRequest
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while creating the help request.')
    }
  }

  public async update({ request, params }: HttpContextContract) {
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
      console.error(error)
      throw new Error('An error occurred while updating the help request.')
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const helpRequest = await HelpRequest.findOrFail(params.id)

      await helpRequest.delete()
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while deleting the help request.')
    }
  }

  public async addType({ params, request }: HttpContextContract) {
    try {
      const helpRequest = await HelpRequest.findOrFail(params.id)

      const { typeId } = request.only(['typeId'])

      const typesQuery = helpRequest.related('types')
      await typesQuery.attach([typeId])

      return helpRequest.load('types')
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while adding a type to the help request.')
    }
  }

  public async removeType({ params, request }: HttpContextContract) {
    try {
      const helpRequest = await HelpRequest.findOrFail(params.id)

      const { typeId } = request.only(['typeId'])

      const typesQuery = helpRequest.related('types')
      await typesQuery.detach([typeId])

      return helpRequest.load('types')
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while removing a type from the help request.')
    }
  }

  public async index(ctx: HttpContextContract) {
    const helpRequests = await HelpRequest.all()

    return helpRequests
  }

  public async indexById({ params }: HttpContextContract) {
    const helpRequest = await HelpRequest.find(params.id)

    return helpRequest
  }

  public async indexByRecent(ctx: HttpContextContract) {
    const helpRequest = await HelpRequest.query().orderBy('created_at', 'desc')

    return helpRequest
  }

  public async indexByOldest(ctx: HttpContextContract) {
    const helpRequest = await HelpRequest.query().orderBy('created_at', 'asc')

    return helpRequest
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
      console.error(error)
      return response.status(500).json({ error: 'An error occurred while fetching help requests.' })
    }
  }
  */
}
