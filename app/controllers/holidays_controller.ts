import Holiday from '#models/holiday'
import type { HttpContext } from '@adonisjs/core/http'

export default class HolidaysController {
  /**
   * Display a list of resource
   */
  async index({ request, view }: HttpContext) {
      try {
        const page = request.input('page', 1)
        const limit = 20
        const records = await Holiday.query().orderBy('createdAt', 'asc').paginate(page, limit);
        records.baseUrl('/holidays')
        return view.render('holidays/index', {
          records: records,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        return view.render('holidays/index', {
          records: [],
          error: 'Error fetching data'
        });
      }
    }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}