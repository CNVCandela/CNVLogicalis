import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.create(
      {
        uuid: '0000001',
        state: 1,
        type: 1,
        situation: 1,
        role_id: 1,
        area_id: 1,
        fullName: 'CXC Voice Team',
        email: 'cxc-voiceteam@convergia.io',
        password: 'cxcVoiceTeam2025',
        recover: 'cxcVoiceTeam2025',
      }
    )
  }
}
