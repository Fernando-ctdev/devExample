-- Migration file to add certificates table
-- This was applied using prisma db push since we didn't want to lose existing data

-- CreateTable
CREATE TABLE "certificate" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "issuer" TEXT NOT NULL,
  "issueDate" TIMESTAMP(3) NOT NULL,
  "expiryDate" TIMESTAMP(3),
  "credentialId" TEXT,
  "link" TEXT NOT NULL,
  "imageUrl" TEXT,
  "skills" TEXT[],
  "technologyId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "certificate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "certificate" ADD CONSTRAINT "certificate_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE SET NULL ON UPDATE CASCADE;
