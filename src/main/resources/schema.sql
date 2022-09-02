CREATE TABLE IF NOT EXISTS pooluser (
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
CREATE TABLE IF NOT EXISTS appointment (
    id UUID,
    owneruuid UUID,
    approved BOOLEAN default false,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY (id)
);  
