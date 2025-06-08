import Role from '#models/rol'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.create(
      {
        state: 1,
        type: 1,
        situation: 1,
        fullName: 'Super Admin'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        fullName: 'Admin'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        fullName: 'Supervisor'
      },
      {
        state: 1,
        type: 1,
        situation: 1,
        fullName: 'User'
      }
    )
  }
}
