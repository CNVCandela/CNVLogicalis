import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory.define(User, ({ faker }) => {
  return {
    roleId: faker.number.int({ min: 1, max: 4 }),
    areaId: faker.number.int({ min: 1, max: 6 }),
    state: faker.number.int({ min: 0, max: 1 }),
    type: faker.number.int({ min: 1, max: 2 }),
    situation: faker.number.int({ min: 0, max: 1 }),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'password', // Default password
    recover: 'N3wP4ssw0rd',
  }
}).build()
