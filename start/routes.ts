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
import ApiController from '#controllers/ApiRest/api_controller'
import HolidaysController from '#controllers/holidays_controller'
import WorkSchedulesController from '#controllers/work_schedules_controller'

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
    router.post('users/search', [SysUsersController, 'search']).as('users.search');
    router.post('users/:id', [SysUsersController, 'update']).as('users.update');
    router.get('users/:id/state', [SysUsersController, 'state']).as('users.state');
    router.resource('users', SysUsersController).only(['index', 'create', 'store', 'show', 'edit'])

    router.post('areas/:id', [SysAreasController, 'update']).as('areas.update');
    router.resource('areas', SysAreasController).only(['index', 'store', 'show'])

    router.post('roles/:id', [SysRolesController, 'update']).as('roles.update');
    router.resource('roles', SysRolesController).only(['index', 'store', 'show'])

  }).prefix('sysadmin').as('sysadmin')

  router.group(() => {
    router.post('holidays/search', [HolidaysController, 'search']).as('holidays.search');
    router.get('holidays/:id/state', [HolidaysController, 'state']).as('holidays.state');
    router.post('holidays/:id', [HolidaysController, 'update']).as('holidays.update');
    router.resource('holidays', HolidaysController).only(['index', 'create', 'store', 'show', 'edit'])

    router.post('work_schedules/search', [WorkSchedulesController, 'search']).as('work_schedules.search');
    router.get('work_schedules/:id/state', [WorkSchedulesController, 'state']).as('work_schedules.state');
    router.post('work_schedules/:id', [WorkSchedulesController, 'update']).as('work_schedules.update');
    router.resource('work_schedules', WorkSchedulesController).only(['index', 'create', 'store', 'show', 'edit'])
  })

}).use(middleware.auth())


router
  .group(() => {
    router.get('validate_hl', [ApiController, 'store_hl']).as('rest.store_hl')
    router.get('validate_ws', [ApiController, 'store_ws']).as('rest.store_ws')
  })
  .prefix('apirest').as('api')
