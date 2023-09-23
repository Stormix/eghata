import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Type from 'App/Models/Type'
import { HelpRequestStatus } from 'Contracts/status'
import { createHelpRequestSchema } from 'shared'
import HelpRequest from '../../Models/HelpRequest'

export default class HelpRequestController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = request.only([
        'types',
        'location',
        'isOnSite',
        'description',
        'source',
        'email',
        'name',
        'phone',
        'files'
      ])

      const parsedPayload = createHelpRequestSchema.parse({
        ...payload,
        types: JSON.parse(payload.types),
        location: JSON.parse(payload.location)
      })

      // TODO: properly handle files / validate them
      await Promise.allSettled(
        request.files('files').map((file) => file.move(Application.tmpPath('uploads')))
      )

      const helpRequest = await HelpRequest.create({
        longitude: parsedPayload.location.lng,
        latitude: parsedPayload.location.lat,
        address: parsedPayload.location.address,
        description: parsedPayload.description,
        source: parsedPayload.source,
        status: HelpRequestStatus.Requested,
        name: parsedPayload.name,
        email: parsedPayload.email,
        phone: parsedPayload.phone,
        isOnSite: parsedPayload.isOnSite === 'yes',
        files: JSON.stringify(
          request
            .files('files')
            .map((file) => file.fileName!)
            .filter(Boolean)
        )
      })

      const types = await Type.query().whereIn('type', parsedPayload.types).exec()

      await helpRequest.related('types').attach(types.map((type) => type.id))
      await helpRequest.load('types')
      return response.created(helpRequest)
    } catch (error) {
      Logger.error('Failed to create help request: %s', error.message)
      console.error(error)
      return response.badRequest({
        message: 'Failed to create help request',
        error: error.messages
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
        'isOnSite'
      ])

      helpRequest.merge(data)

      await helpRequest.save()

      return helpRequest
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable update the help request' }
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const helpRequest = await HelpRequest.findOrFail(params.id)

      await helpRequest.delete()
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable delete the help request' }
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
        error: { message: 'Unable to add the types to the help request' }
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
        error: { message: 'Unable to remove the types from the help request' }
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

  public async show({ params, response }: HttpContextContract) {
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
