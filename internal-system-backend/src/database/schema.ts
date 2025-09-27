import { relations } from 'drizzle-orm'
import { pgTable, uuid, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  phone: text().notNull(),
})

export const addresses = pgTable('addresses', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  street: text().notNull(),
  number: text().notNull(),
  complement: text(),
  neighborhood: text().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zipCode: text('zip_code').notNull(),
})

// Definindo as relações
export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
}))

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}))
