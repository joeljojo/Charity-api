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
