// item.js
import { initializeDatabase } from "../database/database";

export async function addItem(
  listId,
  name,
  description = "",
  price = 0,
  quantity = 0,
  img = ""
) {
  try {
    const db = await initializeDatabase();
    if (!db) return;
    await db.run(
      "INSERT INTO Items (name, description, price, quantity, img, listID) VALUES (?, ?, ?, ?, ?, ?);",
      [name, description, price, quantity, img, listId]
    );
  } catch (error) {
    console.error("Error adding item:", error);
  }
}

export async function updateItem(
  itemId,
  name,
  description = "",
  price = 0,
  quantity = 0,
  img = ""
) {
  try {
    const db = await initializeDatabase();
    if (!db) return;
    await db.run(
      "UPDATE Items SET name = ?, description = ?, price = ?, quantity = ?, img = ? WHERE id = ?;",
      [name, description, price, quantity, img, itemId]
    );
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

export async function deleteItem(itemId) {
  try {
    const db = await initializeDatabase();
    if (!db) return;
      await db.run("UPDATE Items SET isDeleted = 1 WHERE id = ?;", [itemId]);
      console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

export async function restoreItem(itemId) {
  try {
    const db = await initializeDatabase();
    if (!db) return;
    await db.run("UPDATE Items SET isDeleted = 0 WHERE id = ?;", [itemId]);
  } catch (error) {
    console.error("Error restoring item:", error);
  }
}

export async function getItems(listId) {
  try {
    const db = await initializeDatabase();
    if (!db) return [];
    const result = await db.query(
      `
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
      `,
      [listId]
    );
    return result.values || [];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

export async function getItem(itemId) {
  try {
    const db = await initializeDatabase();
    if (!db) return [];
    const result = await db.query(
      `
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
      WHERE Items.isDeleted = 0 AND Items.id = ?;
      `,
      [itemId]
    );
    return result.values || [];
  } catch (error) {
    console.error("Error fetching item:", error);
    return [];
  }
}

export async function checkItem(itemId) {
  try {
    const db = await initializeDatabase();
    if (!db) return;
    await db.run("UPDATE Items SET checked = 1 WHERE id = ?;", [itemId]);
  } catch (error) {
    console.error("Error checking item:", error);
  }
}

export async function uncheckItem(itemId) {
  try {
    const db = await initializeDatabase();
    if (!db) return;
    await db.run("UPDATE Items SET checked = 0 WHERE id = ?;", [itemId]);
  } catch (error) {
    console.error("Error unchecking item:", error);
  }
}

export async function deleteAllItems(listId) {
  try {
    const db = await initializeDatabase();
    if (!db) return;
    await db.run("UPDATE Items SET isDeleted = 1 WHERE listID = ?;", [listId]);
  } catch (error) {
    console.error("Error deleting all items:", error);
  }
}

export async function restoreAllItems(listId) {
  try {
    const db = await initializeDatabase();
    if (!db) return;
    await db.run("UPDATE Items SET isDeleted = 0 WHERE listID = ?;", [listId]);
  } catch (error) {
    console.error("Error restoring all items:", error);
  }
}
