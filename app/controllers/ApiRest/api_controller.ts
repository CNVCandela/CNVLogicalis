import type { HttpContext } from '@adonisjs/core/http'
import ValidateApiRest from '#models/validate_api_rest'
import WorkSchedule from '#models/work_schedule'
import Holiday from '#models/holiday' // Asegúrate de que la ruta sea correcta
import { DateTime } from 'luxon'
import logger from '@adonisjs/core/services/logger'

export default class ApiController {
  /*
  async store_hl({ request, response }: HttpContext) {
    const data = request.all();
    console.log(data);
    return response.json(data);
  }
  */
  async store_hl({ request, response }: HttpContext) {
    // const initialResponse = { status: 0, destination: '0', message: '', data: {} } // No es necesario inicializar aquí

    const requestData = request.all() // Usar un nombre diferente para evitar conflicto con el modelo ValidateApiRest

    const currentDate = DateTime.now().toFormat('yyyy-MM-dd')
    const currentTime = DateTime.now().toFormat('HH:mm')
    const dayOfWeek = DateTime.now().toFormat('EEEE') // Nombre completo del día de la semana (e.g., 'Monday')

    logger.info("Date Record Validate HL " + DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
    logger.info(request.all())
    logger.info("Hora Actual: " + currentTime)
    logger.info("Fecha Actual: " + currentDate)

    let finalStatus: number
    let finalMessage: string
    let finalDestination: string = '0' // Inicializar con '0' como en Laravel

    const validate = await Holiday.query().where('state', 1).where('dateIssue', currentDate).first()

    if (validate) {
      const result = await Holiday.query()
        .where('state', 1)
        .where('dateIssue', currentDate)
        .where((query) => {
          query.where('dateStart', '<=', currentTime)
            .where('dateEnd', '>=', currentTime)
        })
        .first()

      if (result) {
        finalStatus = 1
        finalMessage = "Validacion - Holiday is OK"
      } else {
        finalStatus = 2
        finalMessage = "Validacion - Holiday No Found"
      }
    } else {
      finalStatus = 3
      finalMessage = "Validacion - Holiday No Found"
    }

    // Guardar el registro en ValidateApiRest
    const validateApiRest = new ValidateApiRest()
    validateApiRest.apirest = 2
    validateApiRest.state = 1
    validateApiRest.type = finalStatus
    validateApiRest.creation = DateTime.now()
    validateApiRest.data = JSON.stringify(requestData) // Almacenar los datos de la solicitud como JSON string
    validateApiRest.time = currentTime
    validateApiRest.dateIssue = DateTime.fromFormat(currentDate, 'yyyy-MM-dd') // Convertir string a Luxon DateTime
    validateApiRest.did = requestData.did ?? null
    validateApiRest.ani = requestData.ani ?? null
    validateApiRest.dnis = requestData.dnis ?? null
    validateApiRest.extensionfrom = requestData.extensionfrom ?? null
    validateApiRest.extensionto = finalDestination // Ya es string
    validateApiRest.status = finalStatus.toString() // Asegurarse de que sea string
    validateApiRest.day = dayOfWeek
    validateApiRest.hour = currentTime
    validateApiRest.message = finalMessage

    await validateApiRest.save()

    // Preparar la respuesta final
    const responseData = {
      status: finalStatus,
      destination: finalDestination,
      message: finalMessage,
      data: validateApiRest.serialize() // Serializar el modelo guardado para incluirlo en la respuesta
    }

    logger.info(JSON.stringify(responseData))

    // Actualizar el campo 'result' del registro recién creado
    const updateRecord = await ValidateApiRest.find(validateApiRest.id)
    if (updateRecord) {
      updateRecord.result = JSON.stringify(responseData)
      await updateRecord.save()
    }

    return response.json(responseData)
  }
  /*
  async store_ws({ request, response }: HttpContext) {
      const data = request.all();
      logger.info(data);
      return response.json(data);
  }
  */

  async store_ws({ request, response }: HttpContext) {
    logger.info("Date Record of Validate WS " + DateTime.now().toString())
    logger.info(JSON.stringify(request.all()))

    //console.log("Date Record of Validate WS " + DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
    //console.log(request.all())

    const data = request.all()

    const cfd = data.cfd ?? '0'
    const module = data.module ?? '0'
    const currentTime = DateTime.now().toFormat('HH:mm') // Formato HH:mm para comparación de horas
    const currentDate = DateTime.now().toFormat('yyyy-MM-dd') // Formato YYYY-MM-DD para fecha
    const dayOfWeek = DateTime.now().toFormat('EEEE') // Nombre completo del día de la semana (e.g., 'Monday')

    logger.info(`CFD: ${cfd} - MODULE: ${module} - Time: ${currentTime} - Date: ${currentDate} - DAY: ${dayOfWeek}`)

    const validator = await WorkSchedule.query().where('cfd', cfd).where('module', module).first()

    let finalStatus: number
    let finalMessage: string
    let finalDestination: string | number
    let dayColumn: string = '' // Variable para almacenar 'day01', 'day02', etc.

    if (validator) {
      // Determinar la columna del día dinámicamente
      switch (dayOfWeek) {
        case 'Monday':
          dayColumn = 'day01'
          break
        case 'Tuesday':
          dayColumn = 'day02'
          break
        case 'Wednesday':
          dayColumn = 'day03'
          break
        case 'Thursday':
          dayColumn = 'day04'
          break
        case 'Friday':
          dayColumn = 'day05'
          break
        case 'Saturday':
          dayColumn = 'day06'
          break
        case 'Sunday':
          dayColumn = 'day07'
          break
        default:
          dayColumn = '' // En caso de que el formato 'EEEE' devuelva algo inesperado
      }

      // Validar si el día está activo en el WorkSchedule
      const validateDay = await WorkSchedule.query()
        .where('cfd', cfd)
        .where('module', module)
        .where(dayColumn, true) // Acceso dinámico a la columna del día
        .first()

      if (validateDay) {
        const hourInitColumn = `${dayColumn}_hour_init`
        const hourDueColumn = `${dayColumn}_hour_due`

        // Validar el rango de horas para el día actual
        const result01 = await WorkSchedule.query()
          .where('cfd', cfd)
          .where('module', module)
          .where((query) => {
            // Acceso dinámico a las columnas de hora
            query.where(hourInitColumn, '<=', currentTime).where(hourDueColumn, '>=', currentTime)
          })
          .first()

        if (result01) {
          const dstColumn = `${dayColumn}_dst01`
          finalStatus = 1
          finalMessage = "Validacion Day OK - YES Valite Hours"
          // Acceso dinámico a la columna de destino
          finalDestination = result01[dstColumn] as string
        } else {
          const dstColumn = `${dayColumn}_dst02`
          finalStatus = 2
          finalMessage = "Validacion Day OK - NOT Valite Hours"
          // Acceso dinámico a la columna de destino
          finalDestination = validateDay[dstColumn] as string
        }
      } else {
        finalStatus = 3
        finalMessage = "Validacion Day in Rules No Found"
        finalDestination = validator.dst01 ?? '0' // Usar el destino por defecto si no hay día válido
      }
    } else {
      finalStatus = 5
      finalMessage = "The Value of CFD or Module Does Not Exist in the MDL"
      finalDestination = 0
    }

    // Guardar el registro en ValidateApiRest
    const validateApiRest = new ValidateApiRest()
    validateApiRest.apirest = 1
    validateApiRest.state = 1
    validateApiRest.type = finalStatus
    validateApiRest.creation = DateTime.now() // Luxon DateTime object
    validateApiRest.data = JSON.stringify(data) // Almacenar los datos de la solicitud como JSON string
    validateApiRest.cfd = cfd
    validateApiRest.module = module
    validateApiRest.did = data.did ?? null
    validateApiRest.ani = data.ani ?? null
    validateApiRest.dnis = data.dnis ?? null
    validateApiRest.extensionfrom = data.extensionfrom ?? null
    validateApiRest.extensionto = finalDestination.toString() // Asegurarse de que sea string
    validateApiRest.status = finalStatus.toString() // Asegurarse de que sea string
    validateApiRest.day = dayOfWeek
    validateApiRest.hour = currentTime
    validateApiRest.message = finalMessage
    validateApiRest.time = currentTime
    validateApiRest.dateIssue = DateTime.fromFormat(currentDate, 'yyyy-MM-dd') // Luxon DateTime object

    await validateApiRest.save()

    // Preparar la respuesta final
    const responseData = {
      status: finalStatus,
      destination: finalDestination.toString(),
      day: dayOfWeek,
      hour: currentTime,
      message: finalMessage,
      data: validateApiRest.serialize() // Serializar el modelo guardado para incluirlo en la respuesta
    }

    logger.info(responseData)
    logger.info(JSON.stringify(responseData))

    // Actualizar el campo 'result' del registro recién creado
    // Se hace en un paso separado porque 'result' depende de la 'responseData' completa
    const updateRecord = await ValidateApiRest.find(validateApiRest.id)
    if (updateRecord) {
      updateRecord.result = JSON.stringify(responseData)
      await updateRecord.save()
    }

    return response.json(responseData)
  }

}
