import ValidateApiRest from '#models/validate_api_rest'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class QueriesController {

  async connections({ request, view }: HttpContext) {
    const searchTerm = ''
    const searchState = false
    const currentDate = DateTime.now().toFormat('yyyy-LL-dd')

    try {
      const page = request.input('page', 1)
      const limit = 20

      console.log('Current Date:', currentDate);
      const query = ValidateApiRest.query()
        .where('dateIssue', currentDate)
        .orderBy('createdAt', 'desc')

      if (searchTerm) {
        query.where((q) => {
          q.where('cfd', 'ILIKE', `%${searchTerm}%`)
            .orWhere('did', 'ILIKE', `%${searchTerm}%`)
            .orWhere('ani', 'ILIKE', `%${searchTerm}%`)
            .orWhere('dnis', 'ILIKE', `%${searchTerm}%`)
            .orWhere('extensionfrom', 'ILIKE', `%${searchTerm}%`)
            .orWhere('extensionto', 'ILIKE', `%${searchTerm}%`)
            .orWhere('day', 'ILIKE', `%${searchTerm}%`)
            .orWhere('hour', 'ILIKE', `%${searchTerm}%`)
            .orWhere('message', 'ILIKE', `%${searchTerm}%`)
        })
      }

      const records = await query.paginate(page, limit)

      records.baseUrl('/report/connections')
      return view.render('reports/connections', {
        records: records,
        searchTerm: searchTerm,
        searchState: searchState
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return view.render('reports/connections', {
        records: [],
        searchTerm: searchTerm,
        searchState: searchState,
        error: 'Error fetching data'
      });
    }
  }
}
