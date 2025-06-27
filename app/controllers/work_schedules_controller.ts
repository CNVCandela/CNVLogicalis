import WorkSchedule from '#models/work_schedule'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class WorkSchedulesController {

  async index({ request, view }: HttpContext) {
    try {
      const searchTerm = ''
      const searchState = false
      const page = request.input('page', 1)
      const limit = 20
      const records = await WorkSchedule.query().where('estado', 1).orderBy('createdAt', 'asc').paginate(page, limit);
      records.baseUrl('/work_schedules')
      return view.render('workschedules/index', {
        records: records,
        searchTerm: searchTerm,
        searchState: searchState
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return view.render('workschedules/index', {
        records: [],
        error: 'Error fetching data'
      });
    }
  }

  async create({ view }: HttpContext) {
    try {

      return view.render('workschedules/create', {
        ws_cfd3cx: '0',
        ws_module: '0',
        ws_code_module: '0',
        ws_no_time_condition: '0',
        dayt1: '09:00',
        dayt2: '18:00',
        daydst1: 0,
        daydst2: 0,
      });
    } catch (error) {
      console.error('Error fetching roles or areas:', error);
      return view.render('workschedules/create', {
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
      ws_name: request.input('ws_name'),
      ws_cfd3cx: request.input('ws_cfd3cx'),
      ws_module: request.input('ws_module'),
      ws_code_module: request.input('ws_code_module'),
      ws_no_time_condition: request.input('ws_no_time_condition'),
    }

    // Definir validador con VineJS
    const validator = vine.object({
      ws_name: vine.string().trim().minLength(1),
      ws_cfd3cx: vine.number().min(1),
      ws_module: vine.number().min(1),
      ws_code_module: vine.string().trim().minLength(1),
      ws_no_time_condition: vine.number().min(1),
    })

    // Mensajes personalizados
    const messages = {
      'ws_name.required': 'The Name is required.',
      'ws_name.minLength': 'The Name is required.',
      'ws_cfd3cx.required': 'The CFD 3CX is required.',
      'ws_cfd3cx.min': 'The CFD 3CX is required.',
      'ws_module.required': 'The Module is required.',
      'ws_module.min': 'The Module is required.',
      'ws_code_module.required': 'The Module Code is required.',
      'ws_code_module.minLength': 'The Module Code is required.',
      'ws_no_time_condition.required': 'No Time Condition is required.',
      'ws_no_time_condition.min': 'No Time Condition is required.',
    }

    try {
      // Validar los datos
      const requestValidate = await vine.validate({
        schema: validator,
        data: inputData,
        messages,
      })

      const requestData = request.all()

      const record = new WorkSchedule()
      record.userId = userId
      record.name = requestData.ws_name
      record.module = requestData.ws_code_module
      record.cfd = requestData.ws_module
      record.cfd_3cx = requestData.ws_cfd3cx
      record.dst01 = requestData.ws_no_time_condition
      record.dst02 = requestData.ws_no_time_condition

      if (requestData.day1) {
        record.day01 = requestData.day1
        record.day01_hour_init = requestData.day1t1
        record.day01_hour_due = requestData.day1t2
        record.day01_dst01 = requestData.day1dst1
        record.day01_dst02 = requestData.day1dst2
      }

      if (requestData.day2) {
        record.day02 = requestData.day2
        record.day02_hour_init = requestData.day2t1
        record.day02_hour_due = requestData.day2t2
        record.day02_dst01 = requestData.day2dst1
        record.day02_dst02 = requestData.day2dst2
      }

      if (requestData.day3) {
        record.day03 = requestData.day3
        record.day03_hour_init = requestData.day3t1
        record.day03_hour_due = requestData.day3t2
        record.day03_dst01 = requestData.day3dst1
        record.day03_dst02 = requestData.day3dst2
      }

      if (requestData.day4) {
        record.day04 = requestData.day4
        record.day04_hour_init = requestData.day4t1
        record.day04_hour_due = requestData.day4t2
        record.day04_dst01 = requestData.day4dst1
        record.day04_dst02 = requestData.day4dst2
      }

      if (requestData.day5) {
        record.day05 = requestData.day5
        record.day05_hour_init = requestData.day5t1
        record.day05_hour_due = requestData.day5t2
        record.day05_dst01 = requestData.day5dst1
        record.day05_dst02 = requestData.day5dst2
      }

      if (requestData.day6) {
        record.day06 = requestData.day6
        record.day06_hour_init = requestData.day6t1
        record.day06_hour_due = requestData.day6t2
        record.day06_dst01 = requestData.day6dst1
        record.day06_dst02 = requestData.day6dst2
      }

      if (requestData.day7) {
        record.day07 = requestData.day7
        record.day07_hour_init = requestData.day7t1
        record.day07_hour_due = requestData.day7t2
        record.day07_dst01 = requestData.day7dst1
        record.day07_dst02 = requestData.day7dst2
      }
      await record.save()

      session.flash('notification', {
        type: 'alert alert-success alert-dismissible text-white fade show',
        message: ['Registro guardado correctamente.'],
      })
      return response.redirect().toRoute('work_schedules.index');

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
    const record = await WorkSchedule.findBy('uuid', params.id);
    console.log('Edit Work Schedule ID: ' + record);
    console.log('Show Record ID: ' + record?.id + ' record Name: ' + record?.name + ' record UuID: ' + record?.uuid);
    if (record) {
      return view.render('workschedules/edit', {
        record: record
      });
    } else {
      return response.redirect().toRoute('work_schedules.index');
    }
  }

  async update({ params, request, response, session }: HttpContext) {
    const recordID = params.id;
    console.log('Update Work Schedule ID: ' + recordID);

    const inputData = {
      ws_name: request.input('ws_name'),
      ws_cfd3cx: request.input('ws_cfd3cx'),
      ws_module: request.input('ws_module'),
      ws_code_module: request.input('ws_code_module'),
      ws_no_time_condition: request.input('ws_no_time_condition'),
    }

    // Definir validador con VineJS
    const validator = vine.object({
      ws_name: vine.string().trim().minLength(1),
      ws_cfd3cx: vine.number().min(1),
      ws_module: vine.number().min(1),
      ws_code_module: vine.string().trim().minLength(1),
      ws_no_time_condition: vine.number().min(1),
    })

    // Mensajes personalizados
    const messages = {
      'ws_name.required': 'The Name is required.',
      'ws_name.minLength': 'The Name is required.',
      'ws_cfd3cx.required': 'The CFD 3CX is required.',
      'ws_cfd3cx.min': 'The CFD 3CX is required.',
      'ws_module.required': 'The Module is required.',
      'ws_module.min': 'The Module is required.',
      'ws_code_module.required': 'The Module Code is required.',
      'ws_code_module.minLength': 'The Module Code is required.',
      'ws_no_time_condition.required': 'No Time Condition is required.',
      'ws_no_time_condition.min': 'No Time Condition is required.',
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

      const record = await WorkSchedule.findBy('uuid', params.id);
      record.name = requestData.ws_name
      record.module = requestData.ws_code_module
      record.cfd = requestData.ws_module
      record.cfd_3cx = requestData.ws_cfd3cx
      record.dst01 = requestData.ws_no_time_condition
      record.dst02 = requestData.ws_no_time_condition

      if (requestData.day1) {
        record.day01 = requestData.day1
        record.day01_hour_init = requestData.day1t1
        record.day01_hour_due = requestData.day1t2
        record.day01_dst01 = requestData.day1dst1
        record.day01_dst02 = requestData.day1dst2
      } else {
        record.day01 = false
        record.day01_hour_init = '00:00'
        record.day01_hour_due = '23:59'
        record.day01_dst01 = '0'
        record.day01_dst02 = '0'
      }

      if (requestData.day2) {
        record.day02 = requestData.day2
        record.day02_hour_init = requestData.day2t1
        record.day02_hour_due = requestData.day2t2
        record.day02_dst01 = requestData.day2dst1
        record.day02_dst02 = requestData.day2dst2
      } else {
        record.day02 = false
        record.day02_hour_init = '00:00'
        record.day02_hour_due = '23:59'
        record.day02_dst01 = '0'
        record.day02_dst02 = '0'
      }

      if (requestData.day3) {
        record.day03 = requestData.day3
        record.day03_hour_init = requestData.day3t1
        record.day03_hour_due = requestData.day3t2
        record.day03_dst01 = requestData.day3dst1
        record.day03_dst02 = requestData.day3dst2
      } else {
        record.day03 = false
        record.day03_hour_init = '00:00'
        record.day03_hour_due = '23:59'
        record.day03_dst01 = '0'
        record.day03_dst02 = '0'
      }

      if (requestData.day4) {
        record.day04 = requestData.day4
        record.day04_hour_init = requestData.day4t1
        record.day04_hour_due = requestData.day4t2
        record.day04_dst01 = requestData.day4dst1
        record.day04_dst02 = requestData.day4dst2
      } else {
        record.day04 = false
        record.day04_hour_init = '00:00'
        record.day04_hour_due = '23:59'
        record.day04_dst01 = '0'
        record.day04_dst02 = '0'
      }

      if (requestData.day5) {
        record.day05 = requestData.day5
        record.day05_hour_init = requestData.day5t1
        record.day05_hour_due = requestData.day5t2
        record.day05_dst01 = requestData.day5dst1
        record.day05_dst02 = requestData.day5dst2
      } else {
        record.day05 = false
        record.day05_hour_init = '00:00'
        record.day05_hour_due = '23:59'
        record.day05_dst01 = '0'
        record.day05_dst02 = '0'
      }

      if (requestData.day6) {
        record.day06 = requestData.day6
        record.day06_hour_init = requestData.day6t1
        record.day06_hour_due = requestData.day6t2
        record.day06_dst01 = requestData.day6dst1
        record.day06_dst02 = requestData.day6dst2
      } else {
        record.day06 = false
        record.day06_hour_init = '00:00'
        record.day06_hour_due = '23:59'
        record.day06_dst01 = '0'
        record.day06_dst02 = '0'
      }

      if (requestData.day7) {
        record.day07 = requestData.day7
        record.day07_hour_init = requestData.day7t1
        record.day07_hour_due = requestData.day7t2
        record.day07_dst01 = requestData.day7dst1
        record.day07_dst02 = requestData.day7dst2
      } else {
        record.day07 = false
        record.day07_hour_init = '00:00'
        record.day07_hour_due = '23:59'
        record.day07_dst01 = '0'
        record.day07_dst02 = '0'
      }
      await record.save()

      session.flash('notification', {
        type: 'alert alert-success alert-dismissible text-white fade show',
        message: ['Registro guardado correctamente.'],
      })
      return response.redirect().toRoute('work_schedules.index');

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
    console.log('Change Status Work Schedule ID: ' + params.id);
    const record = await WorkSchedule.findBy('uuid', params.id);
    console.log('Change Status Record ID: ' + record?.id + ' record Name: ' + record?.name + ' record UuID: ' + record?.uuid);
    if (record) {
      record.state = 5
      record.estado = 5
      record.situacion = 5
      await record.save()
      return response.redirect().toRoute('work_schedules.index');
    } else {
      return response.redirect().toRoute('work_schedules.index');
    }

  }

  async search({ request, view }: HttpContext) {
    try {
      const searchState = true
      const searchTerm = request.input('search')
      const page = request.input('page', 1)
      const limit = 20

      const query = WorkSchedule.query()
        .orderBy('name', 'asc')

      if (searchTerm) {
        query.where((q) => {
          q.where('name', 'ILIKE', `%${searchTerm}%`)
            .orWhere('cfd_3cx', 'ILIKE', `%${searchTerm}%`)
            .orWhere('dst01', 'ILIKE', `%${searchTerm}%`)
        })
      }

      const records = await query.paginate(page, limit)
      console.log('Search Work Schedules:', searchTerm)
      records.baseUrl('/work_schedules')
      return view.render('workschedules/index', {
        records: records,
        searchTerm: searchTerm,
        searchState: searchState

      });
    } catch (error) {
      console.error(error)
      return view.render('workschedules/index', {
        records: [],
        error: 'Error en la búsqueda'
      })
    }
  }
}
