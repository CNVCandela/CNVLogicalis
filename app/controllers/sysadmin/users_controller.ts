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
  async create({ view }: HttpContext) {
    try {
      const roles = await Role.query().orderBy('name', 'asc');
      const areas = await Area.query().orderBy('name', 'asc');
      return view.render('sysadmin/sysusers/create', {
        roles: roles,
        areas: areas
      });
    } catch (error) {
      console.error('Error fetching roles or areas:', error);
      return view.render('sysadmin/sysusers/create', {
        roles: [],
        areas: [],
        error: 'Error fetching roles or areas'
      });
    }
  }

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
