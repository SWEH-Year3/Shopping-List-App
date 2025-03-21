//lists.js
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";

import { initializeDatabase } from "../database/database";
import { sqlite } from '@capacitor-community/sqlite';


export async function addList(name, description = "") {
    
const sqlite = new SQLiteConnection(CapacitorSQLite);
    try {
        await initializeDatabase();
          let db = null;
          sqlite
            .createConnection("shoppingDB", false, "no-encryption", 1)
            .then((connection) => {
              db = connection;
              db.open();
              db.run(
                  "INSERT INTO Lists (name, description) VALUES (?, ?);",
                  [name, description]
                );
                db.close();
            })
              .catch((error) => {
                
              window.prompt(`Error fetching lists from ADD List: ${error}`);
                  console.error("Error creating database connection:", error);
                   db.open();
                   db.run(
                     "INSERT INTO Lists (name, description) VALUES (?, ?);",
                     [name, description]
                   );
                   db.close();
            });
        // await db.open();
        
        // if (!db) {
            
        // window.prompt(`Error fetching lists from ADD list`);
        //     return;
        // };
       

        // await db.run(
        //     "INSERT INTO Lists (name, description) VALUES (?, ?);",
        //     [name, description]
        // );

        // await db.close();
    } catch (error) {
        
        window.prompt(`Error fetching lists from ADD List: ${error}`);
        console.error("Error adding list:", error);
    }
}

export async function updateList(listId, name, description = "") {
    try {
      const db = await initializeDatabase();
      if (!db) return;
  
      await db.run(
        "UPDATE Lists SET name = ?, description = ? WHERE id = ?;",
        [name, description, listId]
      );
  
      await db.close();
    } catch (error) {
      console.error("Error updating list:", error);
    }
}  


export async function getList(listId) {
    try {
      const db = await initializeDatabase();
      if (!db) return [];
  
      const result = await db.query(`
        SELECT
          Lists.id,
          Lists.name,
          Lists.description
        FROM Lists 
        WHERE Lists.isDeleted = 0 AND Lists.history = 0 AND Lists.id = ?;
      `, [listId]);
  
      await db.close();
      return result.values || [];
    } catch (error) {
      console.error("Error fetching list:", error);
      return [];
    }
  }
  
  export async function getLists() {
      const sqlite = new SQLiteConnection(CapacitorSQLite); 
    try {
          await initializeDatabase();
        let db = null;
        let result = null;
        sqlite.createConnection(
            "shoppingDB",
            false,
            "no-encryption",
            1
          ).then((connection) => {
              db = connection;
              db.open();
             return db.query(`
              SELECT
                Lists.*,
                IFNULL(COUNT(Items.name),0) AS ItemCount,
                IFNULL(SUM(Items.price),0) AS TotalCost
              FROM Items 
              RIGHT JOIN Lists ON Items.listID = Lists.id
              WHERE Lists.isDeleted = 0 AND Lists.history = 0
              GROUP BY Lists.id
              ORDER BY Lists.created_at DESC;
            `).then((val) => {
                result = val.values;
                db.close();
                return result;
            });
          }).catch((error) => {
              console.error("Error creating database connection:", error);
              db.open();
              return db
                .query(
                  `
              SELECT
                Lists.*,
                IFNULL(COUNT(Items.name),0) AS ItemCount,
                IFNULL(SUM(Items.price),0) AS TotalCost
              FROM Items 
              RIGHT JOIN Lists ON Items.listID = Lists.id
              WHERE Lists.isDeleted = 0 AND Lists.history = 0
              GROUP BY Lists.id
              ORDER BY Lists.created_at DESC;
            `
                )
                .then((val) => {
                  result = val.values;
                  db.close();
                  return result;
                });
          });
        //   await db.open();
          
    //   if (!db) return [{ id: 1, name: "Dead Connection Default List from Get Lists", description: "", ItemCount: 0, TotalCost: 0 }];
    //   const result = await db.query(`
    //     SELECT
    //       Lists.*,
    //       IFNULL(COUNT(Items.name),0) AS ItemCount,
    //       IFNULL(SUM(Items.price),0) AS TotalCost
    //     FROM Items 
    //     RIGHT JOIN Lists ON Items.listID = Lists.id
    //     WHERE Lists.isDeleted = 0 AND Lists.history = 0
    //     GROUP BY Lists.id
    //     ORDER BY Lists.created_at DESC;
    //   `);
  
        // await db.close();
      return result || [{ id: 1, name: "Default List", description: "", ItemCount: 0, TotalCost: 0 }];
    //   return [{ id: 1, name: "Default List", description: "", ItemCount: 0, TotalCost: 0 }];
    } catch (error) {
        window.prompt(`Error fetching lists: ${error}`);
      console.error("Error fetching lists:", error);
      return [{ id: 1, name: "Error Default List", description: "", ItemCount: 0, TotalCost: 0 }];
    }
  }

  
  export async function deleteList(listId) {
    try {
      const db = await initializeDatabase();
      if (!db) return;
  
      await db.run("UPDATE Lists SET isDeleted = 1 WHERE id = ?;", [listId]);
      await db.run("UPDATE Items SET isDeleted = 1 WHERE listID = ?;", [listId]);
  
      await db.close();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  }

  

  export async function restoreList(listId) {
    try {
      const db = await initializeDatabase();
      if (!db) return;
  
      await db.run("UPDATE Lists SET isDeleted = 0 WHERE id = ?;", [listId]);
      await db.run("UPDATE Items SET isDeleted = 0 WHERE listID = ?;", [listId]);
  
      await db.close();
    } catch (error) {
      console.error("Error restoring list:", error);
    }
  }
  
  
  export async function archiveList(listId) {
    try {
      const db = await initializeDatabase();
      if (!db) return;
  
      await db.run("UPDATE Lists SET history = 1 WHERE id = ?;", [listId]);
  
      await db.close();
    } catch (error) {
      console.error("Error archiving list:", error);
    }
}
  
  
  export async function unarchiveList(listId) {
    try {
      const db = await initializeDatabase();
      if (!db) return;
  
      await db.run("UPDATE Lists SET history = 0 WHERE id = ?;", [listId]);
  
      await db.close();
    } catch (error) {
      console.error("Error unarchiving list:", error);
    }
}
  
export async function getArchivedLists() {
    try {
      const db = await initializeDatabase();
      if (!db) return [];
  
      const result = await db.query(`
        SELECT
          Lists.id,
          Lists.name,
          Lists.description,
          IFNULL(COUNT(Items.name),0) AS ItemCount,
          IFNULL(SUM(Items.price),0) AS TotalCost
        FROM Items 
        RIGHT JOIN Lists ON Items.listID = Lists.id
        WHERE Lists.isDeleted = 0 AND Lists.history = 1
        GROUP BY Lists.id
        ORDER BY Lists.created_at DESC;
      `);
  
      await db.close();
      return result.values || [];
    } catch (error) {
      console.error("Error fetching archived lists:", error);
      return [];
    }
}

export async function getDeletedLists() {
    try {
      const db = await initializeDatabase();
      if (!db) return [];
  
      const result = await db.query(`
        SELECT
          Lists.id,
          Lists.name,
          Lists.description,
          IFNULL(COUNT(Items.name),0) AS ItemCount,
          IFNULL(SUM(Items.price),0) AS TotalCost
        FROM Items 
        RIGHT JOIN Lists ON Items.listID = Lists.id
        WHERE Lists.isDeleted = 1
        GROUP BY Lists.id
        ORDER BY Lists.created_at DESC;
      `);
  
      await db.close();
      return result.values || [];
    } catch (error) {
      console.error("Error fetching deleted lists:", error);
      return [];
    }
}

export async function getDashboardChartData() {
    try {
      const db = await initializeDatabase();
      if (!db) return [];
  
      const result = await db.query(`
        -- chart data
        SELECT
        Lists.created_at as time_stamp,
        IFNULL(COUNT(Items.name),0) As Quantity
        FROM Lists LEFT JOIN Items
        on Lists.id = Items.listID
        WHERE
    	Lists.created_at >= concat(substring(date('now'),1,4),'-01-01')
        AND Lists.created_at <= concat(substring(date('now'),1,4),'-12-31')
        GROUP BY Lists.created_at;
      `);
  
      await db.close();
      return result.values || [];
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return [];
    }
}


export async function getDashboardData() {
    try {
      const db = await initializeDatabase();
      if (!db) return [];
  
        const result = await db.query(`
                select
                Items.name,
                IFNULL(AVG(Items.price),0.0) AS Average_Price,
                IFNULL(COUNT(Items.price),0.0) as Quantity
                FROM Items JOIN Lists
                on Items.listID = Lists.id
                WHERE 
                Lists.created_at >= concat(substring(date('now'),1,4),'-01-01')
                AND Lists.created_at <= concat(substring(date('now'),1,4),'-12-31')
                AND Lists.isDeleted = 0
                AND Items.isDeleted = 0
                GROUP by Items.name
      `);
  
      await db.close();
      return result.values || [];
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return [];
    }
}

export async function getListItems(listId) {
    let sqlite = new SQLiteConnection(CapacitorSQLite);
    try {
        await initializeDatabase();
        let db = null;
        let result = null;
        sqlite.createConnection("shoppingDB", false, "no-encryption", 1).then((conn) => {
            db = conn;
            result = db.query(`
                SELECT
                  Items.id,
                  Items.name,
                  Items.description,
                  Items.price,
                  Items.quantity,
                  Items.img,
                  Items.checked,
                  Items.isDeleted
                FROM Items 
                WHERE Items.isDeleted = 0 AND Items.listID = ?;
              `, [listId]).then((res) => {
                db.close();
                return res.values || [];
              });
        }).catch((error) => {
            console.error("Error fetching list items:", error);
            return [];
        });
    //   if (!db) return [];
  
    //   const result = await db.query(`
    //     SELECT
    //       Items.id,
    //       Items.name,
    //       Items.description,
    //       Items.price,
    //       Items.quantity,
    //       Items.img,
    //       Items.checked,
    //       Items.isDeleted
    //     FROM Items 
    //     WHERE Items.isDeleted = 0 AND Items.listID = ?;
    //   `, [listId]);
  
    //   await db.close();
      return result.values || [];
    } catch (error) {
      console.error("Error fetching list items:", error);
      return [];
    }
}
  
export async function getTotalPriceAndAveragePrice()
{
    try {
      const db = await initializeDatabase();
      if (!db) return [];
  
      const result = await db.query(`
        SELECT
          IFNULL(SUM(Items.price),0) AS TotalCost,
          IFNULL(AVG(Items.price),0) AS AverageCost
        FROM Items 
        WHERE Items.isDeleted = 0;
      `);
  
      await db.close();
      return result.values || [];
    } catch (error) {
      console.error("Error fetching total price and average price:", error);
      return [];
    }
}