import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('fingerprint').unique()
      table.string('email').unique()
      table.string('password')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fingerprint')
      table.dropColumn('email')
      table.dropColumn('password')
    })
  }
}
