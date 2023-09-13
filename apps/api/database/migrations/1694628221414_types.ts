import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { RequestTypes } from '../../contracts/requests'

export default class extends BaseSchema {
  protected tableName = 'types'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.enum('type', Object.values(RequestTypes)).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
