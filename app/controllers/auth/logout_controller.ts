import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {

  async handle({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toPath('/')
  }
  async show({ }: HttpContext) { }

  async store({ }: HttpContext) { }

}
