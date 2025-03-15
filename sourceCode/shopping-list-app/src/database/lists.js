//lists.js


import { initializeDatabase } from "../database/database";


export async function addList(name, description = "") {
    try {
        const db = await initializeDatabase();
        if (!db) return;
  
        await db.run(
            "INSERT INTO Lists (name, description) VALUES (?, ?);",
            [name, description]
        );

        await db.close();
    } catch (error) {
        console.error("Error adding list:", error);
    }
}


  
  export async function getLists() {
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
        WHERE Lists.isDeleted = 0 AND Lists.history = 0
        GROUP BY Lists.id
        ORDER BY Lists.created_at DESC;
      `);
  
      await db.close();
      return result.values || [];
    } catch (error) {
      console.error("Error fetching lists:", error);
      return [];
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
  