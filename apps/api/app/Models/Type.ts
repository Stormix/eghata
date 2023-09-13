import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { RequestTypes } from '../../contracts/requests'

export default class Type extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: RequestTypes

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
