DROP TABLE IF EXISTS pooluser;
CREATE TABLE pooluser (
    id UUID,
    fName VARCHAR(100),
    lName VARCHAR(100),
    email VARCHAR(200),
    pnumber VARCHAR(10),
    pword VARCHAR(200),
    poolScore INTEGER default 0,
    approved BOOLEAN default false,
    admin BOOLEAN default false,
    PRIMARY KEY (id)
);  