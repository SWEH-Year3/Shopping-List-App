//database.js

import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";

const sqlite = new SQLiteConnection(CapacitorSQLite);

export async function initializeDatabase() {
  try {
    const db = await sqlite.createConnection("shoppingDB", false, "no-encryption", 1);
    await db.open();

    await db.execute(`
    CREATE TABLE
    if NOT EXISTS Lists
    (	
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name Text NOT NULL,
      description Text DEFAULT(''),
      history Integer DEFAULT(0),
      created_at Text DEFAULT(date('now')),
      isDeleted Integer DEFAULT (0)
    );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS Items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT DEFAULT(''),
        price FLOAT DEFAULT(0.0),
        quantity TEXT DEFAULT(0),
        img TEXT DEFAULT(''),
        checked INTEGER DEFAULT 0,
        isDeleted INTEGER DEFAULT 0,
        listID INTEGER,
        FOREIGN KEY (listID) REFERENCES Lists(id)
      );
    `);

    return db;
  } catch (error) {
    console.error("SQLite Initialization Error:", error);
    return null;
  }
}
