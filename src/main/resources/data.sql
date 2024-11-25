TRUNCATE TABLE city CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE item CASCADE;
TRUNCATE TABLE claim CASCADE;

INSERT INTO city (zipcode, city_id, name)
VALUES (1300, 1, 'Kumanovo');
INSERT INTO city (zipcode, city_id, name)
VALUES (1000, 2, 'Skopje');
INSERT INTO city (zipcode, city_id, name)
VALUES (2200, 3, 'Bitola');

INSERT INTO users (phone_number, city_id, user_id, email, name, password, role)
VALUES (123456789, 1, 1, 'john_doe@hotmail.com', 'John Doe', 'password123', 'ROLE_DONOR');
INSERT INTO users (phone_number, city_id, user_id, email, name, password, role)
VALUES (456789123, 2, 2, 'james_smith@gmail.com', 'James Smith', 'password456', 'ROLE_RECIPIENT');
INSERT INTO users (phone_number, city_id, user_id, email, name, password, role)
VALUES (789456123, 2, 3, 'maggie_smith@yahoo.com', 'Maggie Smith', 'password789', 'ROLE_DONOR');
INSERT INTO users (phone_number, city_id, user_id, email, name, password, role)
VALUES (5555555, 2, 4, 'admin@admin.com', 'admin', 'admin', 'ROLE_ADMIN');

INSERT INTO item (date_created, city_id, donor_id, item_id, description, name, status)
VALUES ('2024-11-06', 1, 1, 1, 'A warm winter jacket', 'Winter Jacket', 'AVAILABLE');
INSERT INTO item (date_created, city_id, donor_id, item_id, description, name, status)
VALUES ('2024-11-03', 2, 3, 2, 'A red cozy blanket', 'Blanket', 'CLAIMED');
INSERT INTO item (date_created, city_id, donor_id, item_id, description, name, status)
VALUES ('2024-11-01', 1, 1, 3, 'Comfortable baby boots', 'Boots', 'CLAIMED');

INSERT INTO claim (claim_date, claim_id, item_id, recipient)
VALUES ('2024-11-06', 1, 2, 2);
INSERT INTO claim (claim_date, claim_id, item_id, recipient)
VALUES ('2024-11-09', 2, 3, 2);
