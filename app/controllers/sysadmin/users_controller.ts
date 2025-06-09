import User from '#models/user'
import Role from '#models/role'
import Area from '#models/area'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UsersController {
  async index({ view }: HttpContext) {
    try {
      //const records = await db.from('users').select('*');
      const records = await User.query().preload('area').preload('role');
      /*
      const records = await User.query()
        .join('areas', 'users.area_id', 'areas.id')
        .select('users.*', 'areas.name as area_name')
      */
      console.log('Log Records:', records);
      return view.render('sysadmin/sysusers/index', {
        records: records
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return view.render('sysadmin/sysusers/index', {
        records: [],
        error: 'Error fetching data'
      });
    }
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
