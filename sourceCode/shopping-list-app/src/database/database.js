
// database.js
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";

const sqlite = new SQLiteConnection(CapacitorSQLite);
let connection = null;

export async function initializeDatabase() {
  try {
    // If connection already exists and is open, return it.
    if (connection && connection.isOpen) {
      return connection;
    }

    // Check if connection exists in Capacitor's pool
    const isConn = await sqlite.isConnection("shoppingDB");
    if (isConn.result) {
      connection = await sqlite.retrieveConnection("shoppingDB");
      if (!connection.isOpen) {
        await connection.open();
      }
    } else {
      // Create a new connection and open it
      connection = await sqlite.createConnection(
        "shoppingDB",
        false,
        "no-encryption",
        1
      );
      await connection.open();

      // Create the Lists table if it does not exist
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS Lists (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT DEFAULT '',
          history INTEGER DEFAULT 0,
          created_at TEXT DEFAULT (DATETIME('now')),
          isDeleted INTEGER DEFAULT 0
        );
      `);
      // Create the Items table if it does not exist
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS Items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT DEFAULT '',
          price FLOAT DEFAULT 0.0,
          quantity TEXT DEFAULT '0',
          img BLOB DEFAULT '',
          checked INTEGER DEFAULT 0,
          isDeleted INTEGER DEFAULT 0,
          listID INTEGER,
          FOREIGN KEY (listID) REFERENCES Lists(id)
        );
      `);
    }
    return connection;
  } catch (error) {
    console.error("SQLite Initialization Error:", error);
    return null;
  }
}

// Optional: call this when your app shuts down to close the connection.
export async function closeDatabase() {
  try {
    if (connection && connection.isOpen) {
      await connection.close();
    }
  } catch (error) {
    console.error("Error closing database:", error);
  }
}
