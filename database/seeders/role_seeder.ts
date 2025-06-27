import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        uuid: faker.string.uuid(),
        state: 1,
        type: 1,
        situation: 1,
        name: 'Super Admin'
      },
      {
        uuid: faker.string.uuid(),
        state: 1,
        type: 1,
        situation: 1,
        name: 'Admin'
      },
      {
        uuid: faker.string.uuid(),
        state: 1,
        type: 1,
        situation: 1,
        name: 'Supervisor'
      },
      {
        uuid: faker.string.uuid(),
        state: 1,
        type: 1,
        situation: 1,
        name: 'User'
      },
    ])
  }
}
