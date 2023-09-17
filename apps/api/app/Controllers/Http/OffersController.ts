import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Offer from '../../Models/Offer'

export default class OffersController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only([
        'longitude',
        'latitude',
        'address',
        'description',
        'status',
        'name',
        'phone',
        'email',
        'isOnSite',
      ])

      const offer = await Offer.create(data)

      if (request.input('types')) {
        const types = request.input('types')
        const typesQuery = offer.related('types')
        await typesQuery.attach(types)
      }

      await offer.load('types')

      return response.created(offer)
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable add the offer' },
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
        'isOnSite',
      ])

      offer.merge(data)

      await offer.save()

      return offer
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable update the offer' },
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const offer = await Offer.findOrFail(params.id)

      await offer.delete()
    } catch (error) {
      return response.badRequest({
        error: { message: 'Unable delete the offer' },
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
        error: { message: 'Unable to add the types to the offer' },
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
        error: { message: 'Unable to remove the types from the offer' },
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
