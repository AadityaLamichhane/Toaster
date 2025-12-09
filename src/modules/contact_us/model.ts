import {pgTable ,  serial , text } from "drizzle-orm/pg-core"
const contact_us_table = pgTable('contact_us',{
    id:serial('id').primaryKey(),
    name_en:text('name_en').notNull(),
    name_ne:text('name_ne').notNull(),
    contact_number : text('contact_number').notNull(),
    email:text('email').unique(),
    subject: text('subject'),
    messege:text('messege')
})
export {contact_us_table};
