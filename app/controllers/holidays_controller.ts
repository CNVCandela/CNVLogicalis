import Holiday from '#models/holiday'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class HolidaysController {

  async index({ request, view }: HttpContext) {
    const searchTerm = ''
    const searchState = false
    try {
      const page = request.input('page', 1)
      const limit = 20
      const records = await Holiday.query().where('state', 1).orderBy('createdAt', 'asc').paginate(page, limit);
      records.baseUrl('/holidays')
      return view.render('holidays/index', {
        records: records,
        searchTerm: searchTerm,
        searchState: searchState
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return view.render('holidays/index', {
        records: [],
        searchTerm: searchTerm,
        searchState: searchState,
        error: 'Error fetching data'
      });
    }
  }

  async create({ view }: HttpContext) {
    const currentDate = new Date().toISOString().split('T')[0];

    try {

      return view.render('holidays/create', {
        name: '',
        date: currentDate,
        init: '00:00',
        due: '23:59',
      });
    } catch (error) {
      console.error('Error fetching roles or areas:', error);
      return view.render('holidays/create', {
        roles: [],
        areas: [],
        error: 'Error fetching roles or areas'
      });
    }
  }

  async store({ request, response, session, auth }: HttpContext) {
    const userId = auth.user?.id || 0
    //const requestData = request.all()
    //console.log(request.all())

    const inputData = {
      name: request.input('name'),
      date: request.input('date'),
      init: request.input('init'),
      due: request.input('due'),
    }
    console.log(request.all())

    // Definir validador con VineJS
    const validator = vine.object({
      name: vine.string().trim().minLength(4),
      date: vine.string().trim().minLength(8),
      init: vine.string().trim().minLength(5),
      due: vine.string().trim().minLength(5),
    })

    // Mensajes personalizados
    const messages = {
      'name.required': 'The Name is required.',
      'name.minLength': 'The Name is required.',
      'date.required': 'The CFD 3CX is required.',
      'date.min': 'The CFD 3CX is required.',
      'init.required': 'The Module is required.',
      'init.min': 'The Module is required.',
      'due.required': 'The Module Code is required.',
      'due.minLength': 'The Module Code is required.',
    }

    try {
      // Validar los datos
      const requestValidate = await vine.validate({
        schema: validator,
        data: inputData,
        messages,
      })

      const requestData = request.all()

      const record = new Holiday()
      record.userId = userId
      record.name = requestData.name
      record.dateIssue = requestData.date
      record.dateStart = requestData.init
      record.dateEnd = requestData.due
      await record.save()

      session.flash('notification', {
        type: 'alert alert-success alert-dismissible text-white fade show',
        message: ['Record saved successfully.'],
      })
      return response.redirect().toRoute('holidays.index');

    } catch (error) {
      console.error('Validation error:', error)

      // Formatear mensajes de error personalizados
      const customErrors = error.messages.map((message) => ({
        message: messages['${message.field}.${message.rule}'] || message.message,
      }))

      console.log("Se produjo un error en los campos")
      console.log(customErrors)

      // Guardar datos antiguos para rellenar el formulario
      session.flash('old', inputData)

      // Enviar mensajes de error a la vista
      session.flash('notification', {
        type: 'alert alert-warning alert-dismissible text-white fade show',
        message: customErrors.map((err) => err.message),
      })

      return response.redirect().back()
    }
  }

  async show({ params }: HttpContext) { }

  async edit({ params, view, response }: HttpContext) {
    const record = await Holiday.findBy('uuid', params.id);
    console.log('Show Record ID: ' + record?.id + ' record Name: ' + record?.name + ' record UuID: ' + record?.uuid);
    if (record) {
      return view.render('holidays/edit', {
        record: record
      });
    } else {
      return response.redirect().toRoute('holidays.index');
    }
  }

  async update({ params, request, response, session }: HttpContext) {
    const recordID = params.id;
    console.log('Update Holiday ID: ' + recordID);

    const inputData = {
      name: request.input('name'),
      date: request.input('date'),
      init: request.input('init'),
      due: request.input('due'),
    }
    console.log(request.all())

    // Definir validador con VineJS
    const validator = vine.object({
      name: vine.string().trim().minLength(4),
      date: vine.string().trim().minLength(8),
      init: vine.string().trim().minLength(5),
      due: vine.string().trim().minLength(5),
    })

    // Mensajes personalizados
    const messages = {
      'name.required': 'The Name is required.',
      'name.minLength': 'The Name is required.',
      'date.required': 'The CFD 3CX is required.',
      'date.min': 'The CFD 3CX is required.',
      'init.required': 'The Module is required.',
      'init.min': 'The Module is required.',
      'due.required': 'The Module Code is required.',
      'due.minLength': 'The Module Code is required.',
    }

    try {
      console.log('Input Data:', inputData);
      // Validar los datos
      const requestValidate = await vine.validate({
        schema: validator,
        data: inputData,
        messages,
      })

      const requestData = request.all()
      console.log('Request Data:', requestData);

      const record = await Holiday.findBy('uuid', recordID);
      record.name = requestData.name
      record.dateIssue = requestData.date
      record.dateStart = requestData.init
      record.dateEnd = requestData.due
      await record.save()

      session.flash('notification', {
        type: 'alert alert-success alert-dismissible text-white fade show',
        message: ['Record saved successfully.'],
      })
      return response.redirect().toRoute('holidays.index');

    } catch (error) {
      console.error('Validation error:', error)

      // Formatear mensajes de error personalizados
      const customErrors = error.messages.map((message) => ({
        message: messages['${message.field}.${message.rule}'] || message.message,
      }))

      console.log("Se produjo un error en los campos")
      console.log(customErrors)

      // Guardar datos antiguos para rellenar el formulario
      session.flash('old', inputData)

      // Enviar mensajes de error a la vista
      session.flash('notification', {
        type: 'alert alert-warning alert-dismissible text-white fade show',
        message: customErrors.map((err) => err.message),
      })

      return response.redirect().back()
    }
  }

  async destroy({ params }: HttpContext) { }

  async state({ params, response }: HttpContext) {
    console.log('Change Status Holiday ID: ' + params.id);
    const record = await Holiday.findBy('uuid', params.id);
    console.log('Change Status Record ID: ' + record?.id + ' record Name: ' + record?.name + ' record UuID: ' + record?.uuid);
    if (record) {
      record.state = 5
      record.estado = 5
      record.situacion = 5
      await record.save()
      return response.redirect().toRoute('holidays.index');
    } else {
      return response.redirect().toRoute('holidays.index');
    }

  }

  async search({ request, view }: HttpContext) {
    try {
      const searchState = true
      const searchTerm = request.input('search')
      const page = request.input('page', 1)
      const limit = 20

      const query = Holiday.query()
        .orderBy('date_issue', 'asc')

      if (searchTerm) {
        query.where((q) => {
          q.where('name', 'ILIKE', `%${searchTerm}%`)
            .orWhereRaw('CAST(date_issue AS TEXT) ILIKE ?', [`%${searchTerm}%`])
            .orWhereRaw('CAST(date_start AS TEXT) ILIKE ?', [`%${searchTerm}%`])
            .orWhereRaw('CAST(date_end AS TEXT) ILIKE ?', [`%${searchTerm}%`])
        })
      }

      const records = await query.paginate(page, limit)
      records.baseUrl('/holidays')
      return view.render('holidays/index', {
        records: records,
        searchTerm: searchTerm,
        searchState: searchState

      });
    } catch (error) {
      console.error(error)
      return view.render('holidays/index', {
        records: [],
        error: 'Error en la búsqueda'
      })
    }
  }
}
