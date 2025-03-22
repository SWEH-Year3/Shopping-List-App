// lists.js
import { initializeDatabase } from "./database";

// ----------------------
// List Methods
// ----------------------

// Add a new list
export async function addList(name, description = "") {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    await db.run("INSERT INTO Lists (name, description) VALUES (?, ?);", [
      name,
      description,
    ]);
    return true;
  } catch (error) {
    console.error("Error adding list:", error);
    return false;
  }
}

// Update an existing list
export async function updateList(listId, name, description = "") {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    await db.run("UPDATE Lists SET name = ?, description = ? WHERE id = ?;", [
      name,
      description,
      listId,
    ]);
    return true;
  } catch (error) {
    console.error("Error updating list:", error);
    return false;
  }
}

// Get a single list by its ID
export async function getList(listId) {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    const result = await db.query(
      `SELECT id, name, description FROM Lists 
       WHERE isDeleted = 0 AND history = 0 AND id = ?;`,
      [listId]
    );
    return result.values || [];
  } catch (error) {
    console.error("Error fetching list:", error);
    return [];
  }
}

// Get all lists with item count and total cost
export async function getLists() {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    const result = await db.query(`
      SELECT
        Lists.*,
        IFNULL(COUNT(Items.name), 0) AS ItemCount,
        IFNULL(SUM(Items.price), 0) AS TotalCost
      FROM Items 
      RIGHT JOIN Lists ON Items.listID = Lists.id
      WHERE Lists.isDeleted = 0 AND Lists.history = 0 
      GROUP BY Lists.id
      ORDER BY Lists.created_at DESC;
    `);
    return result.values || [];
  } catch (error) {
    console.error("Error fetching lists:", error);
    return [];
  }
}

// Soft-delete a list and its items
export async function deleteList(listId) {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    await db.run("UPDATE Lists SET isDeleted = 1 WHERE id = ?;", [listId]);
    await db.run("UPDATE Items SET isDeleted = 1 WHERE listID = ?;", [listId]);
    return true;
  } catch (error) {
    console.error("Error deleting list:", error);
    return false;
  }
}

// Restore a deleted list and its items
export async function restoreList(listId) {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    await db.run("UPDATE Lists SET isDeleted = 0 WHERE id = ?;", [listId]);
    await db.run("UPDATE Items SET isDeleted = 0 WHERE listID = ?;", [listId]);
    return true;
  } catch (error) {
    console.error("Error restoring list:", error);
    return false;
  }
}

// Archive a list (set history flag)
export async function archiveList(listId) {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    await db.run("UPDATE Lists SET history = 1 WHERE id = ?;", [listId]);
    return true;
  } catch (error) {
    console.error("Error archiving list:", error);
    return false;
  }
}

// Unarchive a list (clear history flag)
export async function unarchiveList(listId) {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    await db.run("UPDATE Lists SET history = 0 WHERE id = ?;", [listId]);
    return true;
  } catch (error) {
    console.error("Error unarchiving list:", error);
    return false;
  }
}

// Get archived lists (history flag set)
export async function getArchivedLists() {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    const result = await db.query(`
      SELECT
        Lists.id,
        Lists.name,
        Lists.description,
        IFNULL(COUNT(Items.name), 0) AS ItemCount,
        IFNULL(SUM(Items.price), 0) AS TotalCost
      FROM Items 
      RIGHT JOIN Lists ON Items.listID = Lists.id
      WHERE Lists.isDeleted = 0 AND Lists.history = 1
      GROUP BY Lists.id
      ORDER BY Lists.created_at DESC;
    `);
    return result.values || [];
  } catch (error) {
    console.error("Error fetching archived lists:", error);
    return [];
  }
}

// Get deleted lists
export async function getDeletedLists() {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    const result = await db.query(`
      SELECT
        Lists.id,
        Lists.name,
        Lists.description,
        IFNULL(COUNT(Items.name), 0) AS ItemCount,
        IFNULL(SUM(Items.price), 0) AS TotalCost
      FROM Items 
      RIGHT JOIN Lists ON Items.listID = Lists.id
      WHERE Lists.isDeleted = 1
      GROUP BY Lists.id
      ORDER BY Lists.created_at DESC;
    `);
    return result.values || [];
  } catch (error) {
    console.error("Error fetching deleted lists:", error);
    return [];
  }
}

// ----------------------
// Dashboard & Aggregation Methods
// ----------------------

// Get dashboard chart data (e.g., count of lists per day in current year)
export async function getDashboardChartData() {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    const result = await db.query(`
      SELECT
        SUBSTRING(Lists.created_at,1,10) AS date_stamp,
        IFNULL(COUNT(Items.name), 0) AS Quantity
      FROM Lists 
      LEFT JOIN Items ON Lists.id = Items.listID
      WHERE Lists.created_at >= substr(date('now'),1,4) || '-01-01'
        AND Lists.created_at <= substr(date('now'),1,4) || '-12-31'
      GROUP BY Lists.created_at;
    `);
    return result.values || [];
  } catch (error) {
    console.error("Error fetching dashboard chart data:", error);
    return [];
  }
}

// Get dashboard data (e.g., average and quantity per item name for the current year)
export async function getDashboardData() {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    const result = await db.query(`
      SELECT
        Items.name,
        IFNULL(AVG(Items.price), 0.0) AS Average_Price,
        IFNULL(COUNT(Items.price), 0) AS Quantity
      FROM Items 
      JOIN Lists ON Items.listID = Lists.id
      WHERE Lists.created_at >= substr(date('now'),1,4) || '-01-01'
        AND Lists.created_at <= substr(date('now'),1,4) || '-12-31'
        AND Lists.isDeleted = 0
        AND Items.isDeleted = 0
      GROUP BY Items.name;
    `);
    return result.values || [];
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return [];
  }
}

// Get total price and average price of all items
export async function getTotalPriceAndAveragePrice() {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    const result = await db.query(`
      SELECT
        IFNULL(SUM(price), 0) AS TotalCost,
        IFNULL(AVG(price), 0) AS AverageCost
      FROM Items 
      WHERE isDeleted = 0;
    `);
    return result.values || [];
  } catch (error) {
    console.error("Error fetching total and average price:", error);
    return [];
  }
}

// ----------------------
// Items Methods (if needed in the same file)
// ----------------------

// Get items for a specific list
export async function getListItems(listId) {
  try {
    const db = await initializeDatabase();
    if (!db) throw new Error("DB not initialized");
    const result = await db.query(
      `SELECT id, name, description, price, quantity, img, checked, isDeleted
       FROM Items 
       WHERE isDeleted = 0 AND listID = ?;`,
      [listId]
    );
    return result.values || [];
  } catch (error) {
    console.error("Error fetching list items:", error);
    return [];
  }
}

// You can also add methods for adding/updating/deleting individual items if needed.

// // list.js
// import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
// import { initializeDatabase } from "../database/database";

// export async function addList(name, description = "") {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     await db.run("INSERT INTO Lists (name, description) VALUES (?, ?);", [
//       name,
//       description,
//     ]);

//     await db.close();
//   } catch (error) {
//     console.error("Error adding list:", error);
//   }
// }

// export async function updateList(listId, name, description = "") {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     await db.run("UPDATE Lists SET name = ?, description = ? WHERE id = ?;", [
//       name,
//       description,
//       listId,
//     ]);

//     await db.close();
//   } catch (error) {
//     console.error("Error updating list:", error);
//   }
// }

// export async function getList(listId) {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     const result = await db.query(
//       `SELECT id, name, description FROM Lists
//        WHERE isDeleted = 0 AND history = 0 AND id = ?;`,
//       [listId]
//     );

//     await db.close();
//     return result.values || [];
//   } catch (error) {
//     console.error("Error fetching list:", error);
//     return [];
//   }
// }

// export async function getLists() {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     const result = await db.query(`
//       SELECT
//         Lists.*,
//         IFNULL(COUNT(Items.name),0) AS ItemCount,
//         IFNULL(SUM(Items.price),0) AS TotalCost
//       FROM Items
//       RIGHT JOIN Lists ON Items.listID = Lists.id
//       WHERE Lists.isDeleted = 0 AND Lists.history = 0
//       GROUP BY Lists.id
//       ORDER BY Lists.created_at DESC;
//     `);

//     await db.close();
//     return result.values || [];
//   } catch (error) {
//     console.error("Error fetching lists:", error);
//     return [];
//   }
// }

// export async function deleteList(listId) {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     await db.run("UPDATE Lists SET isDeleted = 1 WHERE id = ?;", [listId]);
//     await db.run("UPDATE Items SET isDeleted = 1 WHERE listID = ?;", [listId]);

//     await db.close();
//   } catch (error) {
//     console.error("Error deleting list:", error);
//   }
// }

// export async function restoreList(listId) {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     await db.run("UPDATE Lists SET isDeleted = 0 WHERE id = ?;", [listId]);
//     await db.run("UPDATE Items SET isDeleted = 0 WHERE listID = ?;", [listId]);

//     await db.close();
//   } catch (error) {
//     console.error("Error restoring list:", error);
//   }
// }

// export async function archiveList(listId) {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     await db.run("UPDATE Lists SET history = 1 WHERE id = ?;", [listId]);

//     await db.close();
//   } catch (error) {
//     console.error("Error archiving list:", error);
//   }
// }

// export async function unarchiveList(listId) {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     await db.run("UPDATE Lists SET history = 0 WHERE id = ?;", [listId]);

//     await db.close();
//   } catch (error) {
//     console.error("Error unarchiving list:", error);
//   }
// }

// export async function getArchivedLists() {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     const result = await db.query(`
//       SELECT
//         Lists.id,
//         Lists.name,
//         Lists.description,
//         IFNULL(COUNT(Items.name),0) AS ItemCount,
//         IFNULL(SUM(Items.price),0) AS TotalCost
//       FROM Items
//       RIGHT JOIN Lists ON Items.listID = Lists.id
//       WHERE Lists.isDeleted = 0 AND Lists.history = 1
//       GROUP BY Lists.id
//       ORDER BY Lists.created_at DESC;
//     `);

//     await db.close();
//     return result.values || [];
//   } catch (error) {
//     console.error("Error fetching archived lists:", error);
//     return [];
//   }
// }

// export async function getDeletedLists() {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     const result = await db.query(`
//       SELECT
//         Lists.id,
//         Lists.name,
//         Lists.description,
//         IFNULL(COUNT(Items.name),0) AS ItemCount,
//         IFNULL(SUM(Items.price),0) AS TotalCost
//       FROM Items
//       RIGHT JOIN Lists ON Items.listID = Lists.id
//       WHERE Lists.isDeleted = 1
//       GROUP BY Lists.id
//       ORDER BY Lists.created_at DESC;
//     `);

//     await db.close();
//     return result.values || [];
//   } catch (error) {
//     console.error("Error fetching deleted lists:", error);
//     return [];
//   }
// }

// export async function getDashboardChartData() {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     const result = await db.query(`
//       SELECT
//         Lists.created_at as time_stamp,
//         IFNULL(COUNT(Items.name),0) AS Quantity
//       FROM Lists LEFT JOIN Items ON Lists.id = Items.listID
//       WHERE Lists.created_at >= substr(date('now'),1,4) || '-01-01'
//         AND Lists.created_at <= substr(date('now'),1,4) || '-12-31'
//       GROUP BY Lists.created_at;
//     `);

//     await db.close();
//     return result.values || [];
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//     return [];
//   }
// }

// export async function getDashboardData() {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     const result = await db.query(`
//       SELECT
//         Items.name,
//         IFNULL(AVG(Items.price),0.0) AS Average_Price,
//         IFNULL(COUNT(Items.price),0) AS Quantity
//       FROM Items JOIN Lists ON Items.listID = Lists.id
//       WHERE Lists.created_at >= substr(date('now'),1,4) || '-01-01'
//         AND Lists.created_at <= substr(date('now'),1,4) || '-12-31'
//         AND Lists.isDeleted = 0
//         AND Items.isDeleted = 0
//       GROUP BY Items.name;
//     `);

//     await db.close();
//     return result.values || [];
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//     return [];
//   }
// }

// export async function getListItems(listId) {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     const result = await db.query(
//       `
//       SELECT
//         id,
//         name,
//         description,
//         price,
//         quantity,
//         img,
//         checked,
//         isDeleted
//       FROM Items
//       WHERE isDeleted = 0 AND listID = ?;
//     `,
//       [listId]
//     );

//     await db.close();
//     return result.values || [];
//   } catch (error) {
//     console.error("Error fetching list items:", error);
//     return [];
//   }
// }

// export async function getTotalPriceAndAveragePrice() {
//   try {
//     const db = await initializeDatabase();
//     if (!db) throw new Error("DB not initialized");

//     const result = await db.query(`
//       SELECT
//         IFNULL(SUM(price),0) AS TotalCost,
//         IFNULL(AVG(price),0) AS AverageCost
//       FROM Items
//       WHERE isDeleted = 0;
//     `);

//     await db.close();
//     return result.values || [];
//   } catch (error) {
//     console.error("Error fetching total price and average price:", error);
//     return [];
//   }
// }
