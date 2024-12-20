CREATE
    TABLE
        IF NOT EXISTS pooluser(
            id UUID,
            fName VARCHAR(100),
            lName VARCHAR(100),
            email VARCHAR(200),
            pnumber VARCHAR(10),
            pword VARCHAR(200),
            poolScore INTEGER DEFAULT 0,
            approved BOOLEAN DEFAULT FALSE,
            admin BOOLEAN DEFAULT FALSE,
            PRIMARY KEY(id)
        );

CREATE
    TABLE
        IF NOT EXISTS appointment(
            id UUID,
            owneruuid UUID,
            approved BOOLEAN DEFAULT FALSE,
            start_date TIMESTAMP WITH TIME ZONE NOT NULL,
            end_date TIMESTAMP WITH TIME ZONE NOT NULL,
            PRIMARY KEY(id)
        );

CREATE
    TABLE
        IF NOT EXISTS appointment_guest(
            ID SERIAL PRIMARY KEY,
            appointmentid UUID,
            guestid UUID
        );

CREATE
    TABLE
        IF NOT EXISTS snack(
            id UUID PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            TYPE VARCHAR(200)
        );

CREATE
    TABLE
        IF NOT EXISTS appointment_snack(
            ID SERIAL PRIMARY KEY,
            appointmentid UUID,
            snackid UUID
        );