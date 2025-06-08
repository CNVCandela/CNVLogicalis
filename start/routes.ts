/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import LoginController from '#controllers/auth/login_controller'
import LogoutController from '#controllers/auth/logout_controller'
import DashboardController from '#controllers/dashboard_controller'

import SysUsersController from '#controllers/sysadmin/users_controller'
import SysAreasController from '#controllers/sysadmin/areas_controller'
import SysRolesController from '#controllers/sysadmin/roles_controller'

router.get('/', async (ctx) => {
  await ctx.auth.check()
  return ctx.view.render('auth/login')
})

router
  .group(() => {
    router.get('/login', [LoginController, 'show']).as('login.show')
    router.post('/login', [LoginController, 'store']).as('login.store')
    router.post('/logout', [LogoutController, 'handle']).as('logout')
  })
  .as('auth')


router.group(() => {
  router.get('/dashboard', [DashboardController, 'index']).as('dashboard')

  router.group(() => {
    router.post('users/:id', [SysUsersController, 'update']).as('users.update');
    router.resource('users', SysUsersController).only(['index', 'store', 'show'])

    router.post('areas/:id', [SysAreasController, 'update']).as('areas.update');
    router.resource('areas', SysAreasController).only(['index', 'store', 'show'])

    router.post('roles/:id', [SysRolesController, 'update']).as('roles.update');
    router.resource('roles', SysRolesController).only(['index', 'store', 'show'])

  }).prefix('sysadmin').as('sysadmin')

}).use(middleware.auth())
