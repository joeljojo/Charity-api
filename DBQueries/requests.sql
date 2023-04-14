CREATE TABLE IF NOT EXISTS Requests(
	RequestId varchar(255) PRIMARY KEY NOT NULL,
	RequestTitle TEXT NOT NULL,
	RequestDescription TEXT NOT NULL,
	FacilityName TEXT NOT NULL,
	NumberOfChildren integer DEFAULT 0 NOT NULL,
	Location TEXT NOT NULL,
	AmountRequired integer DEFAULT 0 NOT NULL,
	isDonorApproved boolean DEFAULT true NOT NULL,
	isAdminAproved boolean DEFAULT true NOT NULL,
	childrensHomeId varchar(255) NOT NULL,
	FOREIGN KEY(childrensHomeId) REFERENCES users(userid)	
);

-- Added DonorID column to requests table
-- ALTER TABLE IF EXISTS Requests
-- 	ADD COLUMN IF NOT EXISTS DonorId varchar(255) NOT NULL,
-- 	ADD FOREIGN KEY(DonorId) REFERENCES users(userid);

--Altered Requests table
-- ALTER TABLE IF EXISTS Requests ALTER isDonorApproved set DEFAULT false
-- ALTER TABLE IF EXISTS Requests ALTER isAdminAproved set DEFAULT false

--Altered the Requests table
-- ALTER TABLE IF EXISTS Requests ALTER isDonorApproved set DEFAULT null;
-- ALTER TABLE IF EXISTS Requests ALTER isAdminAproved set DEFAULT null;
-- ALTER TABLE IF EXISTS Requests ALTER COLUMN isDonorApproved DROP NOT NULL;
-- ALTER TABLE IF EXISTS Requests ALTER COLUMN isAdminAproved DROP NOT NULL;