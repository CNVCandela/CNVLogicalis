import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, targets } from '@adonisjs/core/logger'

const loggerConfig = defineConfig({
  default: 'app',

  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL', 'debug'),
      transport: {
        targets: targets()
          .pushIf(!app.inProduction, targets.pretty())
          .push(
            targets.file({
              destination: app.makePath('storage/logs/app.log'), // Archivo específico
              rotation: {
                enabled: true,
                interval: '1d',  // Rotación diaria
                keep: 30         // Conservar 30 días
              }
            })
          )
          .toArray(),
      },
    },
  },
})

export default loggerConfig

declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}