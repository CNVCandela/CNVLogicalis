import WorkSchedule from '#models/work_schedule'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class WorkScheduleSeeder extends BaseSeeder {
  async run() {
    const schedules = []

    // Función para generar datos base
    const generateSchedule = (cfd: string, prefix: string, startNum: number) => {
      for (let i = 0; i <= 9; i++) {
        schedules.push({
          uuid: faker.string.uuid(),
          userId: 1001,
          name: `Option ${i}`,
          module: i.toString(),
          cfd_3cx: `${prefix}${i}`,
          cfd: cfd,
          dst01: '8000',
          day01: true,
          day02: true,
          day03: true,
          day04: true,
          day05: true,
          day06: true,
          day07: true,
          day01_hour_init: '06:00:00',
          day01_hour_due: '22:00:00',
          day01_dst01: '8080',
          day01_dst02: '8282',

          day02_hour_init: '06:00:00',
          day02_hour_due: '22:00:00',
          day02_dst01: '8080',
          day02_dst02: '8282',

          day03_hour_init: '06:00:00',
          day03_hour_due: '22:00:00',
          day03_dst01: '8080',
          day03_dst02: '8282',

          day04_hour_init: '06:00:00',
          day04_hour_due: '22:00:00',
          day04_dst01: '8080',
          day04_dst02: '8282',

          day05_hour_init: '06:00:00',
          day05_hour_due: '22:00:00',
          day05_dst01: '8080',
          day05_dst02: '8282',

          day06_hour_init: '06:00:00',
          day06_hour_due: '22:00:00',
          day06_dst01: '8080',
          day06_dst02: '8282',

          day07_hour_init: '06:00:00',
          day07_hour_due: '22:00:00',
          day07_dst01: '8080',
          day07_dst02: '8282',

          // ... (resto de campos horarios igual que antes)
        })
      }
    }

    // Generar CFD=1 (8130-8139)
    generateSchedule('1', '813', 0)

    // Generar CFD=2 (8150-8159)
    generateSchedule('2', '815', 0)

    await WorkSchedule.createMany(schedules)
  }
}
