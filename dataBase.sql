drop database if exists parcelDelivery;
create database parcelDelivery;
use parcelDelivery;

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
  `locker_number` TINYINT DEFAULT NULL,
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
  `parcel_dropoff_code` INT DEFAULT NULL,
  `parcel_pickup_code` INT DEFAULT NULL,
  `status` TINYINT NOT NULL,
  PRIMARY KEY (`id_parcel`),
  KEY `locker_number_idx` (`locker_number`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*
Values for parcel status:
1 - parcel is in the dropoff locker
2 - parcel is transported (by consumer user to dropoff locker or by driver to pickup locker)
3 - parcel is in the pickup locker
4 - parcel is delivered to the reciever (final status)
*/

CREATE TABLE `locker` (
  `id_cabinet` TINYINT NOT NULL,
  `parcel_id` INT DEFAULT NULL,
  `locker_number` TINYINT NOT NULL,
  `cabinet_status` TINYINT NOT NULL,
  PRIMARY KEY (`id_cabinet`),
  KEY `parcel_id_idx` (`parcel_id`),
  CONSTRAINT `parcel_id` FOREIGN KEY (`parcel_id`) REFERENCES `parcel` (`id_parcel`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*
Values for cabinet status:
1 - cabinet is empty
2 - parcel to dropoff
3 - parcel to pickup
*/

/*
ALTER TABLE `parcel`
ADD CONSTRAINT `locker_number` FOREIGN KEY (`locker_number`) REFERENCES `locker` (`locker_number`) ON DELETE SET NULL;
*/

ALTER TABLE `parcelDelivery`.`parcel` 
ADD COLUMN `parcel_dropoff_locker` TINYINT(5) NOT NULL AFTER `status`,
ADD COLUMN `parcel_pickup_locker` TINYINT(5) NOT NULL AFTER `parcel_dropoff_locker`,
ADD COLUMN `parcel_height` FLOAT NOT NULL AFTER `parcel_pickup_locker`,
ADD COLUMN `parcel_width` FLOAT NOT NULL AFTER `parcel_height`,
ADD COLUMN `parcel_depth` FLOAT NOT NULL AFTER `parcel_width`,
ADD COLUMN `marcel_mass` FLOAT NOT NULL AFTER `parcel_depth`;