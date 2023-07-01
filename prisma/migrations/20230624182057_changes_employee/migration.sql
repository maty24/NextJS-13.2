-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
