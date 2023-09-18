import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import CarpoolingAd from './CarpoolingAd'
import HelpRequest from './HelpRequest'
import Offer from './Offer'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public isAdmin: boolean

  @column()
  public isDisabled: boolean

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public fingerprint: string

  @hasMany(() => CarpoolingAd)
  public carpoolingAds: HasMany<typeof CarpoolingAd>

  @hasMany(() => Offer)
  public offers: HasMany<typeof Offer>

  @hasMany(() => HelpRequest)
  public helpRequests: HasMany<typeof HelpRequest>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
