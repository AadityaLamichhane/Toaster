import { integer, pgTable   ,text   , serial} from "drizzle-orm/pg-core";
const admin_table = pgTable("admin",{
    id:serial().primaryKey(),
    username:text("username").unique().notNull(),
    password:text("password").notNull(), 
});

export { admin_table };