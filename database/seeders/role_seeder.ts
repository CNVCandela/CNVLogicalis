import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        state: 1,
        type: 1,
        situation: 1,
        name: 'Super Admin'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        name: 'Admin'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        name: 'Supervisor'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        name: 'User'
      },
    ])
  }
}
