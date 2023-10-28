import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { CarpoolingStatus } from '../../contracts/status'

export default class extends BaseSchema {
  protected tableName = 'carpooling_ads'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.enum('type', ['offer', 'request']).notNullable()

      table.decimal('departure_longitude', 8, 6).nullable()
      table.decimal('departure_latitude', 8, 6).nullable()
      table.string('departure_address').notNullable()
      table.dateTime('departure_date').notNullable()

      table.decimal('arrival_longitude', 8, 6).nullable()
      table.decimal('arrival_latitude', 8, 6).nullable()
      table.string('arrival_address').notNullable()
      table.dateTime('arrival_date').notNullable()

      table.text('description').notNullable()
      table.integer('capacity').nullable()
      table.text('storage_space').nullable()

      table.enum('status', Object.values(CarpoolingStatus)).notNullable()
      table.integer('user_id').unsigned().references('users.id')

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
