/*
  Warnings:

  - You are about to drop the column `client` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `tailor` on the `Review` table. All the data in the column will be lost.
  - Added the required column `email` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client_id" INTEGER,
    "tailor_id" INTEGER NOT NULL,
    "type_clothing" TEXT NOT NULL,
    "preferred_fabric" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "contact_times" TEXT NOT NULL,
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
    CONSTRAINT "Order_tailor_id_fkey" FOREIGN KEY ("tailor_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("client_id", "contact_times", "created_at", "id", "preferred_fabric", "requirements", "status", "tailor_id", "type_clothing", "updated_at") SELECT "client_id", "contact_times", "created_at", "id", "preferred_fabric", "requirements", "status", "tailor_id", "type_clothing", "updated_at" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Review" ("created_at", "id", "message", "rate", "updated_at") SELECT "created_at", "id", "message", "rate", "updated_at" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
