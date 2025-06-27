import Area from '#models/area'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    await Area.createMany([
      {
        uuid: faker.string.uuid(),
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC Voice'
      },
      {
        uuid: faker.string.uuid(),
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC Data'
      },
      {
        uuid: faker.string.uuid(),
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC Mexico'
      },
      {
        uuid: faker.string.uuid(),
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC Peru'
      },
      {
        uuid: faker.string.uuid(),
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC US-CA'
      },
      {
        uuid: faker.string.uuid(),
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC Cono Sur'
      },
    ])
  }
}
