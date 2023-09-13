import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { HelpRequestStatus } from '../../contracts/status'

export default class extends BaseSchema {
  protected tableName = 'help_requests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.decimal('longitude', 8, 6).notNullable()
      table.decimal('latitude', 8, 6).notNullable()
      table.string('address').notNullable()
      table.text('description').notNullable()
      table.string('source').notNullable()
      table.enum('status', Object.values(HelpRequestStatus)).notNullable()
      table.string('name').nullable()
      table.string('phone').nullable()
      table.string('email').nullable()
      table.boolean('is_on_site').defaultTo(false).notNullable()

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
