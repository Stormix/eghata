import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import { CarpoolingStatus } from 'Contracts/status'
import {
  CreateCarpoolingOfferDto,
  CreateCarpoolingRequestDto,
  createCarpoolingOfferSchema,
  createCarpoolingRequestSchema
} from 'shared'
import CarpoolingAd from '../../Models/CarpoolingAd'

export default class CarpoolingAdsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = request.only([
        'type',
        'departureLongitude',
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
        'status'
      ])

      let parsedPayload: CreateCarpoolingOfferDto | CreateCarpoolingRequestDto

      switch (payload.type) {
        case 'offer':
          console.log('Validating', payload)
          parsedPayload = createCarpoolingOfferSchema.parse({
            ...payload
          })
          break
        case 'request':
          parsedPayload = createCarpoolingRequestSchema.parse({
            ...payload
          })
          break
        default:
          return response.badRequest({
            error: {
              message: 'Invalid type.'
            }
          })
      }

      const carpooling = await CarpoolingAd.create({
        ...parsedPayload,
        status: payload.type === 'offer' ? CarpoolingStatus.planned : CarpoolingStatus.requested,
        type: payload.type as 'request' | 'offer',
        files: JSON.stringify(
          request
            .files('files')
            .map((file) => file.fileName!)
            .filter(Boolean)
        )
      })

      // TODO: properly handle files / validate them
      await Promise.allSettled(
        request.files('files').map((file) => file.move(Application.tmpPath('uploads')))
      )

      return response.created(carpooling)
    } catch (error) {
      Logger.error('Failed to create carpooling: %s', error.message)
      return response.badRequest({
        error: { message: `Unable to add the carpooling offer/request` }
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
        'status'
      ])

      carpooling.merge(data)
      await carpooling.save()

      return carpooling
    } catch (error) {
      return response.badRequest({
        error: { message: `Unable to add the Carpooling ${request.param('type')}` }
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const carpooling = await CarpoolingAd.findOrFail(params.id)
      await carpooling.delete()
    } catch (error) {
      return response.badRequest({
        error: { message: `Unable to add the Carpooling ${params.type}` }
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
