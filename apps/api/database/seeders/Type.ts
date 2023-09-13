import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Type from '../../app/Models/Type'
import { RequestTypes } from '../../contracts/requests'

export default class extends BaseSeeder {
  public async run() {
    await Type.createMany(Object.values(RequestTypes).map((type) => ({ type })))
  }
}
