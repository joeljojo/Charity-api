CREATE TABLE USERS (
	UserID varchar(255) NOT NULL PRIMARY KEY,
	FirstName TEXT NOT NULL,
	LastName TEXT NOT NULL,
	Email TEXT NOT NULL,
	Password varchar(255) NOT NULL
);

-- Altered table to add three more columns
-- ALTER TABLE IF EXISTS USERS 
-- 	ADD COLUMN IF NOT EXISTS isAdmin boolean DEFAULT false,
-- 	ADD COLUMN IF NOT EXISTS isDonaor boolean DEFAULT false,
-- 	ADD COLUMN IF NOT EXISTS isChildrensHome boolean DEFAULT false;