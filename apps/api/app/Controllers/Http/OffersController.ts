import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Type from 'App/Models/Type'
import { OfferStatus } from 'Contracts/status'
import { createHelpOfferSchema } from 'shared'
import Offer from '../../Models/Offer'

export default class OffersController {
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

      const parsedPayload = createHelpOfferSchema.parse({
        ...payload,
        types: JSON.parse(payload.types),
        location: JSON.parse(payload.location)
      })

      // TODO: properly handle files / validate them
      await Promise.allSettled(
        request.files('files').map((file) => file.move(Application.tmpPath('uploads')))
      )

      const helpRequest = await Offer.create({
        longitude: parsedPayload.location.lng,
        latitude: parsedPayload.location.lat,
        address: parsedPayload.location.address,
        description: parsedPayload.description,
        status: OfferStatus.planned,
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
      Logger.error('Failed to create help offer: %s', error.message)
      console.error(error)
      return response.badRequest({
        message: 'Failed to create help offer',
        error: error.messages
      })
    }
  }
  public async update({ request, params, response }: HttpContextContract) {
    try {
      const offer = await Offer.findOrFail(params.id)

      const data = request.only([
        'longitude',
        'latitude',
        'address',
        'description',
        'status',
        'name',
        'phone',
        'email',
        'isOnSite'
      ])

      offer.merge(data)

      await offer.save()

      return offer
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable update the offer' }
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const offer = await Offer.findOrFail(params.id)

      await offer.delete()
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable delete the offer' }
      })
    }
  }

  public async addType({ params, request, response }: HttpContextContract) {
    try {
      const offer = await Offer.findOrFail(params.id)

      const { typeId } = request.only(['typeId'])

      const typesQuery = offer.related('types')
      await typesQuery.attach([typeId])

      return offer.load('types')
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable to add the types to the offer' }
      })
    }
  }

  public async removeType({ params, request, response }: HttpContextContract) {
    try {
      const offer = await Offer.findOrFail(params.id)

      const { typeId } = request.only(['typeId'])

      const typesQuery = offer.related('types')
      await typesQuery.detach([typeId])

      return offer.load('types')
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable to remove the types from the offer' }
      })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const offers = await Offer.all()

      return offers
    } catch (error) {
      return response.noContent()
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const offer = await Offer.find(params.id)

      return offer
    } catch (error) {
      return response.noContent()
    }
  }

  public async indexByRecent({ response }: HttpContextContract) {
    try {
      const offers = await Offer.query().orderBy('created_at', 'desc')

      return offers
    } catch (error) {
      return response.noContent()
    }
  }

  public async indexByOldest({ response }: HttpContextContract) {
    try {
      const offers = await Offer.query().orderBy('created_at', 'asc')

      return offers
    } catch (error) {
      return response.noContent()
    }
  }
  /*
      public async indexByTypes({ request, response }: HttpContextContract) {
        try {
          const { types } = request.get()
    
          // Fetch offers by types
          const offers = await Offer.query()
            .whereHas('types', (builder) => {
              builder.whereIn('type', types.split(',')) // Assuming types are comma-separated
            })
            .fetch()
    
          return response.status(200).json({ data: offers })
        } catch (error) {
          return response.noContent()
        }
      }
      */
}
