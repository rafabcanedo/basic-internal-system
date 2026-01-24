import { relations } from 'drizzle-orm'
import { pgTable, uuid, text, pgEnum } from 'drizzle-orm/pg-core'

export const categoryContact = pgEnum('category_contact', [
  'Family',
  'Friend',
  'Work',
])
export const categoryCosts = pgEnum('category_costs', [
  'Food',
  'Payment',
  'Entertainment',
  'Travel',
])
export const categoryTransaction = pgEnum('category_transaction', [
  'Food',
  'Payment',
  'Transfer',
  'Entertainment',
])

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  phone: text().notNull(),
})

export const contacts = pgTable('contacts', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  email: text().notNull().unique(),
  phone: text().notNull(),
  category: categoryContact().notNull(),
})

export const costs = pgTable('costs', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  contactId: uuid('contact_id')
    .notNull()
    .references(() => contacts.id, { onDelete: 'cascade' }),
  value: text().notNull(),
  category: categoryCosts().notNull(),
})

export const transactions = pgTable('transactions', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  contactId: uuid('contact_id')
    .notNull()
    .references(() => contacts.id, { onDelete: 'cascade' }),
  value: text().notNull(),
  category: categoryTransaction().notNull(),
})

/* export const addresses = pgTable('addresses', {
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
}) */

// Definindo as relações
/* export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
}))

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
})) */

export const usersRelations = relations(users, ({ many }) => ({
  contacts: many(contacts),
  costs: many(costs),
  transactions: many(transactions),
}))

export const contactRelations = relations(contacts, ({ one, many }) => ({
  user: one(users, {
    fields: [contacts.userId],
    references: [users.id],
  }),
  costs: many(costs),
  transactions: many(transactions),
}))

export const costsRelations = relations(costs, ({ one }) => ({
  user: one(users, {
    fields: [costs.userId],
    references: [users.id],
  }),
  contact: one(contacts, {
    fields: [costs.contactId],
    references: [contacts.id],
  }),
}))

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  contact: one(contacts, {
    fields: [transactions.contactId],
    references: [contacts.id],
  }),
}))
