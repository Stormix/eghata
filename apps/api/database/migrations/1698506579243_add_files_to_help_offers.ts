import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'offers'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('files').nullable().defaultTo([])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
