/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "last_name" TEXT,
    "avatar" TEXT,
    "experience" TEXT,
    "chest" INTEGER,
    "waist" INTEGER,
    "hips" INTEGER,
    "sleeve" INTEGER,
    "pr_leng" INTEGER,
    "others" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("avatar", "chest", "created_at", "email", "experience", "first_name", "hips", "id", "last_name", "others", "phone", "pr_leng", "role", "sleeve", "updated_at", "waist") SELECT "avatar", "chest", "created_at", "email", "experience", "first_name", "hips", "id", "last_name", "others", "phone", "pr_leng", "role", "sleeve", "updated_at", "waist" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
