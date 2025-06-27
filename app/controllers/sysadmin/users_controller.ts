import User from '#models/user'
import Role from '#models/role'
import Area from '#models/area'
import type { HttpContext } from '@adonisjs/core/http'
//import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'

export default class UsersController {
  async index({ request, view }: HttpContext) {
    try {
      const searchTerm = ''
      const searchState = false
      const page = request.input('page', 1)
      const limit = 20
      //const records = await db.from('users').select('*');
      const records = await User.query().preload('area').preload('role').orderBy('fullName', 'asc').paginate(page, limit);
      records.baseUrl('/sysadmin/users')
      return view.render('sysadmin/sysusers/index', {
        records: records,
        searchTerm: searchTerm,
        searchState: searchState
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return view.render('sysadmin/sysusers/index', {
        records: [],
        error: 'Error fetching data'
      });
    }
  }

  async search({ request, view }: HttpContext) {
    try {
      const searchState = true
      const searchTerm = request.input('search')
      const page = request.input('page', 1)
      const limit = 20

      const query = User.query()
        .preload('area')
        .preload('role')
        .orderBy('fullName', 'asc')

      if (searchTerm) {
        query.where((q) => {
          q.where('fullName', 'ILIKE', `%${searchTerm}%`)
            .orWhere('email', 'ILIKE', `%${searchTerm}%`)
        })
      }

      const records = await query.paginate(page, limit)
      records.baseUrl('/sysadmin/users')

      return view.render('sysadmin/sysusers/index', {
        records: records,
        searchTerm: searchTerm,
        searchState: searchState
      })
    } catch (error) {
      console.error(error)
      return view.render('sysadmin/sysusers/index', {
        records: [],
        error: 'Error en la búsqueda'
      })
    }
  }

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

  async store({ request, response, session }: HttpContext) {
    const username = request.input('form_name');
    const email = request.input('form_email');
    const password = request.input('form_password');
    const roles = request.input('form_role');
    const areas = request.input('form_area');

    console.log('New User' + ' Fullname:', username + ' Email:', email + ' Password:', password + ' Role:', roles + ' Area:', areas);

    const existingUser = await User.findBy('email', email);
    if (existingUser) {
      session.flash('validationError', {
        type: 'alert alert-danger alert-dismissible text-white fade show',
        message: ['El correo electrónico ya está registrado.']
      });
      return response.redirect().back();
    }

    const registerValidator = vine.object({
      username: vine.string().maxLength(100),
      email: vine.string().email(),
      password: vine.string().minLength(8),
      roles: vine.number().min(1),
      areas: vine.number().min(1),
    });

    const messages = {
      'username.required': 'El nombre de usuario es obligatorio.',
      'username.maxLength': 'El nombre de usuario no puede tener más de 100 caracteres.',
      'email.required': 'El correo electrónico es obligatorio.',
      'email.email': 'Debe ingresar un correo electrónico válido.',
      'password.required': 'La contraseña es obligatoria.',
      'password.minLength': 'La contraseña debe tener al menos 8 caracteres.',
      'roles.min': 'El rol debe ser diferente de 0.',
      'areas.min': 'El área debe ser diferente de 0.',
    };

    let data;
    try {
      data = await vine.validate({
        schema: registerValidator,
        data: {
          username,
          email,
          password,
          roles,
          areas,
        },
        messages,
      });
    } catch (error) {
      const customErrors = error.messages.map((message) => ({
        message: messages[`${message.field}.${message.rule}`] || message.message,
      }));
      console.log("Se Producjo Error en Campos");
      console.log(customErrors);
      session.flash('old', {
        username,
        email,
        password,
        roles,
        areas,
      });
      session.flash('notification', {
        type: 'alert alert-warning alert-dismissible text-white fade show',
        message: customErrors.map(error => error.message)
      });
      return response.redirect().back();
    }

    const userData = {
      fullName: data.username,
      email: data.email,
      password: data.password,
      recover: data.password,
    };

    console.log(userData);

    //const user = await User.create(userData);
    const user = new User()
    user.state = 1
    user.type = 1
    user.situation = 1
    user.fullName = data.username
    user.email = data.email
    user.password = data.password
    user.recover = data.password
    user.areaId = data.areas
    user.roleId = data.roles
    await user.save()

    console.log(user);

    return response.redirect().toRoute('sysadmin.users.index');
  }

  async show({ params, view, response }: HttpContext) {
    const user = await User.find(params.id);
    console.log('Show User ID: ' + user?.id + ' User Name: ' + user?.fullName + ' User Email: ' + user?.email);
    if (user) {
      const roles = await Role.query().orderBy('name', 'asc');
      const areas = await Area.query().orderBy('name', 'asc');
      return view.render('sysadmin/sysusers/edit', {
        record: user,
        roles: roles,
        areas: areas
      });
    } else {
      return response.redirect().toRoute('sysadmin.users.index');
    }

  }

  async state({ params, response, session }: HttpContext) {
    console.log('Change Status User ID: ' + params.id);
    const record = await User.findBy('uuid', params.id);
    const currentDate = new Date().toISOString().split('T')[0];

    console.log('Change Status User ID: ' + record?.id + ' record Name: ' + record?.fullName + ' record UuID: ' + record?.uuid);
    if (record) {
      if (record.state === 1) {
        record.state = 5
        record.situation = 5
        record.password = 'D1s4bl3dUs3r' + currentDate
        record.recover = 'D1s4bl3dUs3r' + currentDate

        session.flash('notification', {
          type: 'alert alert-info alert-dismissible text-white fade show',
          message: ['The user [' + record.fullName + '] was deactivated.'],
        })

      } else {
        record.state = 1
        record.situation = 1
        record.password = 'N3wP4ssw0rd' + currentDate
        record.recover = 'N3wP4ssw0rd' + currentDate

        session.flash('notification', {
          type: 'alert alert-success alert-dismissible text-white fade show',
          message: ['The User [' + record.fullName + '] is activated, the new password is: ' + 'N3wP4ssw0rd' + currentDate],
        })

      }
      await record.save()

      return response.redirect().toRoute('sysadmin.users.index');

    } else {
      return response.redirect().toRoute('sysadmin.users.index');
    }

  }

  async edit({ params, view, response }: HttpContext) {
    const user = await User.findBy('uuid', params.id);
    console.log('Edit User ID: ' + user?.id + ' User Name: ' + user?.fullName + ' User Email: ' + user?.email);
    if (user) {
      const roles = await Role.query().orderBy('name', 'asc');
      const areas = await Area.query().orderBy('name', 'asc');
      return view.render('sysadmin/sysusers/edit', {
        record: user,
        roles: roles,
        areas: areas
      });
    } else {
      return response.redirect().toRoute('sysadmin.users.index');
    }
  }

  async update({ request, response, session }: HttpContext) {
    const userID = request.input('user_id');
    const username = request.input('form_name');
    const password = request.input('form_password');
    const roles = request.input('form_role');
    const areas = request.input('form_area');

    console.log('Edit User' + ' Fullname:', username + ' Password:', password + ' Role:', roles + ' Area:', areas);

    const registerValidator = vine.object({
      username: vine.string().maxLength(100),
      password: vine.string().minLength(8),
      roles: vine.number().min(1),
      areas: vine.number().min(1),
    });

    const messages = {
      'username.required': 'El nombre de usuario es obligatorio.',
      'username.maxLength': 'El nombre de usuario no puede tener más de 100 caracteres.',
      'password.required': 'La contraseña es obligatoria.',
      'password.minLength': 'La contraseña debe tener al menos 8 caracteres.',
      'roles.min': 'El rol debe ser diferente de 0.',
      'areas.min': 'El área debe ser diferente de 0.',
    };

    let data;
    try {
      data = await vine.validate({
        schema: registerValidator,
        data: {
          username,
          password,
          roles,
          areas,
        },
        messages,
      });
    } catch (error) {
      const customErrors = error.messages.map((message) => ({
        message: messages[`${message.field}.${message.rule}`] || message.message,
      }));
      console.log(customErrors);

      session.flash('notification', {
        type: 'alert alert-warning alert-dismissible text-white fade show',
        message: customErrors.map(error => error.message)
      });
      return response.redirect().back();
    }

    const user = await User.findOrFail(userID);
    user.areaId = data.areas
    user.roleId = data.roles
    user.fullName = data.username
    user.password = data.password
    user.recover = data.password
    await user.save()

    return response.redirect().toRoute('sysadmin.users.index');
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
