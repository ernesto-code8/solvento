-- Creación de la tabla Address
CREATE TABLE Address (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    city VARCHAR(255),
    zipCode VARCHAR(20)
);

-- Creación de la tabla Truck
CREATE TABLE Truck (
    id SERIAL PRIMARY KEY,
    plateNumber VARCHAR(255),
    maxWeightCapacity NUMERIC,
    workDays VARCHAR(255) -- Enum se ha representado como VARCHAR para simplificar
);

-- Creación de la tabla Trip, ajustada para incluir una referencia a Truck
CREATE TABLE Trip (
    id SERIAL PRIMARY KEY,
    departure TIMESTAMP,
    state VARCHAR(255), -- Enum se ha representado como VARCHAR para simplificar
    truck_id INTEGER REFERENCES Truck(id) NULL-- Clave foránea para relacionar con Truck, permite NULLs para reflejar la relación 0..*
);

-- Creación de la tabla Purchase
CREATE TABLE Purchase (
    id SERIAL PRIMARY KEY,
    customerName VARCHAR(255),
    price NUMERIC,
    weight NUMERIC,
    deliveryDate TIMESTAMP,
    trip_id INTEGER REFERENCES Trip(id) NULL -- Clave foránea para relacionar con Trip
);

-- Creación de la tabla Item
CREATE TABLE Item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price NUMERIC,
    weight NUMERIC,
    purchase_id INTEGER REFERENCES Purchase(id) NULL-- Clave foránea para relacionar con Purchase
);

-- Tabla intermedia para la relación muchos a muchos entre Purchase y Address
CREATE TABLE PurchaseAddress (
    purchase_id INTEGER REFERENCES Purchase(id),
    address_id INTEGER REFERENCES Address(id),
    PRIMARY KEY (purchase_id, address_id)
);
