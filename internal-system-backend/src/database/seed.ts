import { fakerPT_BR as faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { db } from './client'
import { contact, costs, transactions, users } from './schema'
import type { InferInsertModel } from 'drizzle-orm'

const CONTACT_CATEGORIES = ['Family', 'Friend', 'Work'] as const
const COST_CATEGORIES = ['Food', 'Payment', 'Entertainment', 'Travel'] as const
const TRANSACTION_CATEGORIES = [
  'Food',
  'Payment',
  'Transfer',
  'Entertainment',
] as const

async function seed() {
  await db.transaction(async (trx) => {
    const userRows: InferInsertModel<typeof users>[] = Array.from({
      length: 5,
    }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('123456', 10),
      phone: faker.phone.number({ style: 'national' }),
    }))

    const insertedUsers = await trx.insert(users).values(userRows).returning()

    const contactRows: InferInsertModel<typeof contact>[] = []

    insertedUsers.forEach((u) => {
      for (let i = 0; i < 2; i++) {
        contactRows.push({
          userId: u.id,
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number({ style: 'national' }),
          category: faker.helpers.arrayElement(CONTACT_CATEGORIES),
        })
      }
    })

    const insertedContacts = await trx
      .insert(contact)
      .values(contactRows)
      .returning()

    const costRows: InferInsertModel<typeof costs>[] = []

    insertedContacts.forEach((c) => {
      for (let i = 0; i < 3; i++) {
        costRows.push({
          userId: c.userId,
          contactId: c.id,
          value: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
          category: faker.helpers.arrayElement(COST_CATEGORIES),
        })
      }
    })

    await trx.insert(costs).values(costRows)

    const transactionRows: InferInsertModel<typeof transactions>[] = []

    insertedContacts.forEach((c) => {
      for (let i = 0; i < 2; i++) {
        transactionRows.push({
          userId: c.userId,
          contactId: c.id,
          value: faker.finance.amount({ min: 50, max: 5000, dec: 2 }),
          category: faker.helpers.arrayElement(TRANSACTION_CATEGORIES),
        })
      }
    })

    await trx.insert(transactions).values(transactionRows)
  })

  console.log('✅ Create mocks with success!')
}

seed()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => process.exit(0))
