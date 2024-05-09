-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client_id" INTEGER,
    "tailor_id" INTEGER,
    "type_clothing" TEXT NOT NULL,
    "preferred_fabric" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "contact_times_start" TEXT NOT NULL,
    "contact_times_end" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "chest" INTEGER,
    "waist" INTEGER,
    "hips" INTEGER,
    "sleeve" INTEGER,
    "pr_leng" INTEGER,
    "others" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Order_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_tailor_id_fkey" FOREIGN KEY ("tailor_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("chest", "client_id", "contact_times_end", "contact_times_start", "created_at", "email", "first_name", "hips", "id", "last_name", "others", "phone", "pr_leng", "preferred_fabric", "requirements", "sleeve", "status", "tailor_id", "type_clothing", "updated_at", "waist") SELECT "chest", "client_id", "contact_times_end", "contact_times_start", "created_at", "email", "first_name", "hips", "id", "last_name", "others", "phone", "pr_leng", "preferred_fabric", "requirements", "sleeve", "status", "tailor_id", "type_clothing", "updated_at", "waist" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
