/*
  Warnings:

  - You are about to drop the `Meansure` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Meansure";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "avatar" TEXT,
    "experience" TEXT,
    "role" TEXT NOT NULL,
    "chest" INTEGER,
    "waist" INTEGER,
    "hips" INTEGER,
    "sleeve" INTEGER,
    "pr_leng" INTEGER,
    "others" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("avatar", "created_at", "email", "experience", "first_name", "id", "last_name", "phone", "role", "updated_at") SELECT "avatar", "created_at", "email", "experience", "first_name", "id", "last_name", "phone", "role", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
