-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_board" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_board" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "board";
DROP TABLE "board";
ALTER TABLE "new_board" RENAME TO "board";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
