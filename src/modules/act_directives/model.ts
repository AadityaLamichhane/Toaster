import { text, timestamp } from "drizzle-orm/pg-core"
import { serial , pgTable  } from "drizzle-orm/pg-core"
 const act_table  =   pgTable("act",{
    id: serial('id').primaryKey(),
    description_ne: text('description_ne').notNull(),
    description_en: text('description_en').notNull(),
    createdAt:timestamp('created_At').defaultNow(),
    });
    
 const regulation_table  =   pgTable("regulation",{
    id: serial('id').primaryKey(),
    description_ne: text('description_ne').notNull(),
    description_en: text('description_en').notNull(),
    createdAt:timestamp('created_At').defaultNow(),
    });
 const procedure_table  =   pgTable("procedure",{
    id: serial('id').primaryKey(),
    description_en: text('description_en').notNull(),
    description_ne: text('description_ne').notNull(),
    createdAt:timestamp('created_At').defaultNow(),
    });
 const directive_table = pgTable("directive",{
    id: serial('id').primaryKey(),
    description_en: text('description_en').notNull(),
    description_ne: text('description_ne').notNull(),
    createdAt:timestamp('created_At').defaultNow(),
 })
// ----- Forms and format to do 
// export const 

export {act_table , regulation_table , procedure_table , directive_table};