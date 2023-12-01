DROP DATABASE IF EXISTS parcelDelivery;
CREATE DATABASE parcelDelivery;
USE parcelDelivery;

INSERT INTO `parcel` (
  `id_user`, `reciever_name`, `reciever_telephone`, `reciever_street_address`, `reciever_postal_code`, 
  `reciever_city`, `sender_name`, `sender_telephone`, `sender_street_address`, `sender_postal_code`, 
  `sender_city`, `parcel_dropoff_date`, `status`, `desired_dropoff_locker`, `desired_pickup_locker`, 
  `parcel_height`, `parcel_width`, `parcel_depth`, `parcel_mass`
) VALUES (
  '1', 'John Doe', '1234567890', '1234 Oak Street', '12345', 'Springfield', 'Example Sender', '1234567890', 
  '1234 Oak Street', '12345', 'Springfield', '2023-11-20', 'ready_to_deliver', '1', '1', 
  30.0, 30.0, 30.0, 2.0
);

INSERT INTO `parcel` (
  `id_user`, `reciever_name`, `reciever_telephone`, `reciever_street_address`, `reciever_postal_code`, 
  `reciever_city`, `sender_name`, `sender_telephone`, `sender_street_address`, `sender_postal_code`, 
  `sender_city`, `parcel_dropoff_date`, `status`, `desired_dropoff_locker`, `desired_pickup_locker`, 
  `parcel_height`, `parcel_width`, `parcel_depth`, `parcel_mass`
) VALUES (
  '3', 'Jane Doe', '0987654321', '5678 Maple Street', '54321', 'Shelbyville', 'Example Sender', '1234567890', 
  '1234 Oak Street', '12345', 'Springfield', '2023-11-20', 'ready_to_deliver', '1', '1', 
  30.0, 30.0, 30.0, 2.0
);

INSERT INTO `user` (
  `user_name`, `password`, `first_name`, `last_name`, 
  `telephone`, `email`, `street_address`, `postal_code`, `city`
) VALUES (
  'jane', 'pwd', 'Jane', 'Doe', 
  '54321', 'jane@Shelbyville.com', 'Simpson Road',
  '12345', 'Springfield'
);


CREATE TABLE `user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL UNIQUE,
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
  `id_parcel` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `reciever_name` varchar(45) NOT NULL,
  `reciever_telephone` varchar(45) NOT NULL,
  `reciever_street_address` varchar(45) NOT NULL,
  `reciever_postal_code` char(6) NOT NULL,
  `reciever_city` varchar(45) NOT NULL,
  `sender_name` varchar(45) NOT NULL,
  `sender_telephone` varchar(45) DEFAULT NULL,
  `sender_street_address` varchar(45) DEFAULT NULL,
  `sender_postal_code` char(5) DEFAULT NULL,
  `sender_city` varchar(45) DEFAULT NULL,
  `parcel_dropoff_date` date DEFAULT NULL,
  `parcel_readyforpickup_date` date DEFAULT NULL,
  `parcel_pickup_date` date DEFAULT NULL,
  `parcel_last_pickup_date` date DEFAULT NULL,
  `pin_code` int DEFAULT NULL,
  `status` ENUM('ready_to_deliver', 'parcel_at_dropoff_locker', 'parcel_in_transportation', 'parcel_in_pickup_locker', 'reciever_recieved_parcel') NOT NULL,
  `desired_dropoff_locker` tinyint NOT NULL,
  `desired_pickup_locker` tinyint NOT NULL,
  `alternative_pickup_locker` tinyint DEFAULT NULL,
  `parcel_height` float NOT NULL,
  `parcel_width` float NOT NULL,
  `parcel_depth` float NOT NULL,
  `parcel_mass` float NOT NULL,
  PRIMARY KEY (`id_parcel`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `locker` (
  `id_cabinet` tinyint NOT NULL AUTO_INCREMENT,
  `locker_number` tinyint NOT NULL,
  `cabinet_number` tinyint NOT NULL,
  `cabinet_status` ENUM('free', 'has_dropoff_parcel', 'has_pickup_parcel') NOT NULL,
  `parcel_id` int DEFAULT NULL,
  PRIMARY KEY (`id_cabinet`),
  UNIQUE KEY `id_cabinet_UNIQUE` (`id_cabinet`),
  KEY `parcel_id_idx` (`parcel_id`),
  CONSTRAINT `parcel_id` FOREIGN KEY (`parcel_id`) REFERENCES `parcel` (`id_parcel`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




/* CREATE TABLE `parcel` (
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

/* CREATE TABLE `locker` (
  `id_cabinet` TINYINT NOT NULL,
  `parcel_id` INT DEFAULT NULL,
  `locker_number` TINYINT NOT NULL,
  `cabinet_status` TINYINT NOT NULL,
  PRIMARY KEY (`id_cabinet`),
  UNIQUE KEY `id_cabinet_UNIQUE` (`id_cabinet`),
  KEY `parcel_id_idx` (`parcel_id`),
  CONSTRAINT `parcel_id` FOREIGN KEY (`parcel_id`) REFERENCES `parcel` (`id_parcel`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; */
/*
Values for cabinet status:
free - cabinet is empty
has_dropoff_parcel - cabinet has a parcel to collect by driver
has_pickup_parcel - cabinet has a parcel to pickup by a customer
*/
