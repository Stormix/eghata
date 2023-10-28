import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { OfferStatus } from '../../contracts/status'
import Type from './Type'
import User from './User'

export default class Offer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => Type, {
    localKey: 'id',
    pivotForeignKey: 'offer_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'type_id',
    pivotTable: 'offer_types'
  })
  public types: ManyToMany<typeof Type>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public longitude: number

  @column()
  public latitude: number

  @column()
  public address: string

  @column()
  public description: string

  @column()
  public status: OfferStatus

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public isOnSite: boolean

  @column()
  public files: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
