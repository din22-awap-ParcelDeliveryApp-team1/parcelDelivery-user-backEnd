DROP DATABASE IF EXISTS parcelDelivery;
CREATE DATABASE parcelDelivery;
USE parcelDelivery;

CREATE TABLE `user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `telephone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `street_address` VARCHAR(45) NOT NULL,
  `postal_code` CHAR(5) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `parcel` (
  `id_parcel` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT DEFAULT NULL,
  `reciever_name` VARCHAR(45) NOT NULL,
  `reciever_telephone` VARCHAR(45) NOT NULL,
  `reciever_street_address` VARCHAR(45) NOT NULL,
  `reciever_postal_code` CHAR(6) NOT NULL,
  `reciever_city` VARCHAR(45) NOT NULL,
  `sender_name` VARCHAR(45) NOT NULL,
  `sender_telephone` VARCHAR(45) DEFAULT NULL,
  `sender_street_address` VARCHAR(45) DEFAULT NULL,
  `sender_postal_code` CHAR(5) DEFAULT NULL,
  `sender_city` VARCHAR(45) DEFAULT NULL,
  `parcel_dropoff_date` DATE NOT NULL,
  `parcel_pickup_date` DATE NOT NULL,
  `parcel_last_pickup_date` DATE NOT NULL,
  `parcel_dropoff_code` INT NOT NULL,
  `parcel_pickup_code` INT NOT NULL,
  `status` TINYINT NOT NULL,
  PRIMARY KEY (`id_parcel`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `locker` (
  `locker_number` TINYINT NOT NULL,
  `id_cabinet` TINYINT NOT NULL,
  `cabinet_status` TINYINT NOT NULL,

  PRIMARY KEY (`id_cabinet`),
  KEY `parcel_id_idx` (`parcel_id`),
  CONSTRAINT `parcel_id` FOREIGN KEY (`parcel_id`) REFERENCES `parcel` (`id_parcel`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `parcelDelivery`.`parcel` 
ADD COLUMN `parcel_dropoff_locker` TINYINT(5) NOT NULL AFTER `status`,
ADD COLUMN `parcel_pickup_locker` TINYINT(5) NOT NULL AFTER `parcel_dropoff_locker`,
ADD COLUMN `parcel_height` FLOAT NOT NULL AFTER `parcel_pickup_locker`,
ADD COLUMN `parcel_width` FLOAT NOT NULL AFTER `parcel_height`,
ADD COLUMN `parcel_depth` FLOAT NOT NULL AFTER `parcel_width`,
ADD COLUMN `marcel_mass` FLOAT NOT NULL AFTER `parcel_depth`;
/*
Values for cabinet status:
1 - cabinet is empty
2 - cabinet has a parcel to collect by driver
3 - cabinet has a parcel to pickup by a customer
*/

/*
Values for parcel status:
0 - parcel is ready (moment when sender confirm the action of sending parcel)
1 - parcel is in the dropoff locker (moment when sender drop off the parcel at dropoff locker and close the cabinet door)
2 - parcel is in transportation (from the moment of driver collect the parcel and transport it to the destination locker)
3 - parcel is in the pickup locker (moment when driver put the package in the destination(pickup location) locker and close the door
4 - parcel is delivered to the reciever (moment when reciever collect the parcel from pickup locker and close the cabinet door )
*/

-- insert values:
-- Insert user data
-- INSERT INTO `user` 
--   (`user_name`, `password`, `first_name`, `last_name`, `telephone`, `email`, `street_address`, `postal_code`, `city`)
-- VALUES
--   ('john_doe', 'password123', 'John', 'Doe', '123456789', 'john.doe@example.com', '123 Main St', '12345', 'City1'),
--   ('jane_smith', 'pass456', 'Jane', 'Smith', '987654321', 'jane.smith@example.com', '456 Oak St', '54321', 'City2'),
--   ('ora_smith', 'pass856', 'Ora', 'Silva', '987654321', 'or.silvah@example.com', '45 west St', '5643', 'City4');
  

-- -- Insert parcel data
-- INSERT INTO `parcel`
--   (`id_user`, `reciever_name`, `reciever_telephone`, `reciever_street_address`, `reciever_postal_code`, `reciever_city`,
--    `sender_name`, `sender_telephone`, `sender_street_address`, `sender_postal_code`, `sender_city`,
--    `parcel_dropoff_date`, `parcel_pickup_date`, `parcel_last_pickup_date`,
--    `parcel_dropoff_code`, `parcel_pickup_code`, `parcel_status`, `parcel_dropoff_locker`, `parcel_pickup_locker`,
--    `parcel_height`, `parcel_width`, `parcel_depth`, `parcel_mass`)
-- VALUES
--   (1, 'Receiver1', '987654321', '789 Elm St', '67890', 'City3', 'Sender1', '123456789', '123 Maple St', '54321', 'City4',
--    '2023-11-10', '2023-11-12', '2023-11-15',
--    1001, 2001, 0, 1, 2, 10.5, 8.2, 5.0, 2.3),
--   (2, 'Receiver2', '555555555', '456 Pine St', '12345', 'City5', 'Sender2', '111111111', '789 Birch St', '98765', 'City6',
--    '2023-11-11', '2023-11-13', '2023-11-16',
--    1002, 2002, 0, 1, 2, 12.0, 9.8, 6.2, 3.5),
--    (3, 'Receiver3', '556655555', '456 Pine St', '12345', 'City5', 'Sender2', '111111111', '789 Birch St', '98765', 'City6',
--    '2023-11-11', '2023-11-13', '2023-11-16',
--    1003, 2003, 0, 2, 2, 12.0, 9.8, 6.2, 3.5);

-- -- Insert locker data
-- INSERT INTO `locker` (`locker_number`,`id_cabinet`,  `cabinet_status`, `parcel_id`) VALUES
-- (1, 1, 2, NULL),
-- (1, 2, 2, NULL),
-- (1, 3, 2, NULL),
-- (1, 4, 2, NULL),
-- (1, 5, 1, NULL),

-- (2, 1, 1, NULL),
-- (2, 2, 1, NULL),
-- (2, 3, 1, NULL),
-- (2, 4, 1, NULL),
-- (2, 5, 1, NULL),

-- (3, 1, 1, NULL);


-- select * from user;
-- select * from parcel;
-- select * from locker;



