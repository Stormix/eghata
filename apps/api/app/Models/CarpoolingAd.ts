import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { CarpoolingStatus } from '../../contracts/status'
import User from './User'

export default class CarpoolingAd extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public type: 'offer' | 'request'

  @column()
  public departureLongitude: number

  @column()
  public departureLatitude: number

  @column()
  public departureAddress: string

  @column()
  public departureDate: DateTime

  @column()
  public arrivalLongitude: number

  @column()
  public arrivalLatitude: number

  @column()
  public arrivalAddress: string

  @column()
  public arrivalDate: DateTime

  @column()
  public description: string

  @column()
  public capacity: number

  @column()
  public storageSpace: string

  @column()
  public status: CarpoolingStatus

  @column()
  public files: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
