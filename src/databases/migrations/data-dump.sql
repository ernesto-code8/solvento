
INSERT INTO Address (address, city, zipCode) VALUES
('Calle Reforma 123', 'Ciudad de México', '06600'),
('Avenida Juárez 456', 'Guadalajara', '44100'),
('Paseo de Montejo 789', 'Mérida', '97000'),
('Boulevard 5 de Mayo 101', 'Puebla', '72000'),
('Avenida Universidad 102', 'Querétaro', '76000'),
('Calle 60 Norte 103', 'Cancún', '77500'),
('Avenida Paseo Tabasco 104', 'Villahermosa', '86000'),
('Calle 50-A 105', 'Campeche', '24000'),
('Avenida Hidalgo 106', 'Tampico', '89000'),
('Calle Principal 107', 'Oaxaca', '68000'),
('Avenida Centenario 108', 'Acapulco', '39300'),
('Boulevard Kukulcán Km 9.5 109', 'Cancún', '77500'),
('Calle Victoria 110', 'San Luis Potosí', '78000'),
('Avenida Revolución 111', 'Tijuana', '22000'),
('Avenida Morelos 112', 'Cuernavaca', '62000');


INSERT INTO Truck (plateNumber, maxWeightCapacity, workDays) VALUES
('ABC123', 5000, 'Monday'),
('DEF456', 6000, 'Friday'),
('GHI789', 5500, 'Tuesday'),
('JKL012', 6200, 'Saturday'),
('MNO345', 5100, 'Wednesday'),
('STU901', 5400, 'Sunday'),
('YZA567', 5900, 'Monday'),
('QRS345', 5600, 'Thursday');


INSERT INTO Item (name, price, weight, purchase_id) VALUES
('Item 1', 10.50, 1000, NULL),
('Item 2', 15.75, 200, NULL),
('Item 3', 20.00, 100, NULL),
('Item 4', 5.25, 300, NULL),
('Item 5', 17.50, 400, NULL),
('Item 6', 8.99, 700, NULL),
('Item 7', 3.50, 1000, NULL),
('Item 8', 14.00, 1000, NULL),
('Item 9', 22.50, 1000, NULL),
('Item 10', 11.00, 1000, NULL),
('Item 11', 9.95, 3000, NULL),
('Item 12', 12.30, 6000, NULL),
('Item 13', 14.55, 1000, NULL),
('Item 14', 3.10, 500, NULL),
('Item 15', 18.20, 1000, NULL);


INSERT INTO Purchase (customerName, price, weight) VALUES
('Customer A', 0, 0),
('Customer B', 0, 0),
('Customer C', 0, 0),
('Customer D', 0, 0),
('Customer E', 0, 0);

-- Actualizar Purchase 1 con Items 1, 2, 3
UPDATE Purchase SET
price = (SELECT SUM(price) FROM Item WHERE id IN (1, 2, 3,4,5)),
weight = (SELECT SUM(weight) FROM Item WHERE id IN (1, 2, 3,4,5))
WHERE id = 1;

-- Actualizar Purchase 2 con Items 4, 5, 6
UPDATE Purchase SET
price = (SELECT SUM(price) FROM Item WHERE id IN (1,6, 7)),
weight = (SELECT SUM(weight) FROM Item WHERE id IN (1,6, 7))
WHERE id = 2;

-- Actualizar Purchase 3 con Items 7, 8, 9
UPDATE Purchase SET
price = (SELECT SUM(price) FROM Item WHERE id IN (3, 8, 9)),
weight = (SELECT SUM(weight) FROM Item WHERE id IN (3, 8, 9))
WHERE id = 3;

-- Actualizar Purchase 4 con Items 10, 11, 12
UPDATE Purchase SET
price = (SELECT SUM(price) FROM Item WHERE id IN (10, 11, 12)),
weight = (SELECT SUM(weight) FROM Item WHERE id IN (10, 11, 12))
WHERE id = 4;

-- Actualizar Purchase 5 con Items 13, 14, 15
UPDATE Purchase SET
price = (SELECT SUM(price) FROM Item WHERE id IN (13, 14, 15)),
weight = (SELECT SUM(weight) FROM Item WHERE id IN (13, 14, 15))
WHERE id = 5;

--actualizando items
update item set  purchase_id = 1 where id in (1,2,3,4,5);
update item set  purchase_id = 2 where id in (6,7);
update item set  purchase_id = 3 where id in (8,9);
update item set  purchase_id = 4 where id in (10, 11, 12);
update item set  purchase_id = 4 where id in (13, 14, 15);

INSERT INTO PurchaseAddress (purchase_id, address_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 4),
(2, 5),
(2, 7),
(3, 8),
(3, 9),
(4, 1),
(4, 2),
(4, 3),
(5, 6),
(5, 7),
(5, 8);