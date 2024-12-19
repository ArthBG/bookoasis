-- AlterTable
ALTER TABLE "_UserBook" ADD CONSTRAINT "_UserBook_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserBook_AB_unique";
