-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "board_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "card_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "board" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_card" ("board_id", "created_at", "description", "group", "id", "title", "updated_at") SELECT "board_id", "created_at", "description", "group", "id", "title", "updated_at" FROM "card";
DROP TABLE "card";
ALTER TABLE "new_card" RENAME TO "card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
