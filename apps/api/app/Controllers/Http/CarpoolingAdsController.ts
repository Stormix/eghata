import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CarpoolingAd from '../../Models/CarpoolingAd'

export default class CarpoolingAdsController {
  async store({ request, response }: HttpContextContract) {
    try {
      const carpoolingData = request.only([
        'type',
        'departure_longitude',
        'departureLatitude',
        'departureAddress',
        'departureDate',
        'arrivalLongitude',
        'arrivalLatitude',
        'arrivalAddress',
        'arrivalDate',
        'description',
        'capacity',
        'storageSpace',
        'status',
      ])

      const carpooling = await CarpoolingAd.create(carpoolingData)

      return response.created(carpooling)
    } catch (error) {
      return response.badRequest({
        error: { message: `Unable to add the Carpooling ${request.param('type')}` },
      })
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const carpooling = await CarpoolingAd.findOrFail(params.id)
      const data = request.only([
        'type',
        'departure_longitude',
        'departureLatitude',
        'departureAddress',
        'departureDate',
        'arrivalLongitude',
        'arrivalLatitude',
        'arrivalAddress',
        'arrivalDate',
        'description',
        'capacity',
        'storageSpace',
        'status',
      ])

      carpooling.merge(data)
      await carpooling.save()

      return carpooling
    } catch (error) {
      return response.badRequest({
        error: { message: `Unable to add the Carpooling ${request.param('type')}` },
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const carpooling = await CarpoolingAd.findOrFail(params.id)
      await carpooling.delete()
    } catch (error) {
      return response.badRequest({
        error: { message: `Unable to add the Carpooling ${params.type}` },
      })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const carpoolings = await CarpoolingAd.all()

      return carpoolings
    } catch (error) {
      return response.noContent()
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const carpooling = await CarpoolingAd.find(params.id)

      return carpooling
    } catch (error) {
      return response.noContent()
    }
  }

  public async indexByRecent({ response }: HttpContextContract) {
    try {
      const carpoolings = await CarpoolingAd.query().orderBy('created_at', 'desc')

      return carpoolings
    } catch (error) {
      return response.noContent()
    }
  }

  public async indexByOldest({ response }: HttpContextContract) {
    try {
      const carpoolings = await CarpoolingAd.query().orderBy('created_at', 'asc')

      return carpoolings
    } catch (error) {
      return response.noContent()
    }
  }
}
