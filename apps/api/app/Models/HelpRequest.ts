import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { HelpRequestStatus } from '../../contracts/status'
import Type from './Type'
import User from './User'

export default class HelpRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => Type, {
    localKey: 'id',
    pivotForeignKey: 'help_request_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'type_id',
    pivotTable: 'help_request_types'
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
  public source: string

  @column()
  public status: HelpRequestStatus

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public isOnSite: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
