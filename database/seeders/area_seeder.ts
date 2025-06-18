import Area from '#models/area'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Area.createMany([
      {
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC Voice'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC Data'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC Mexico'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC Peru'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC US-CA'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        name: 'CXC Cono Sur'
      },
    ])
  }
}
