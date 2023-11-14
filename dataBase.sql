

/*ALTER TABLE `parcel`
ADD CONSTRAINT `locker_number` FOREIGN KEY (`locker_number`) REFERENCES `locker` (`locker_number`) ON DELETE RESTRICT;

INSERT INTO `user` (`user_name`, `password`, `first_name`, `last_name`, `telephone`, `email`, `street_address`, `postal_code`, `city`) VALUES ('Huyen', 'Huyen2023+', 'Huyen', 'Nguyen', '+358123456789', 'huyen@gmail.com', 'Rantatie 5', '90802', 'Oulu');
INSERT INTO `user` (`user_name`, `password`, `first_name`, `last_name`, `telephone`, `email`, `street_address`, `postal_code`, `city`) VALUES ('Anne', 'Anne2023+', 'Anne', 'Kauppinen', '+358023456789', 'anne@gmail.com', 'Rantatie 9', '90801', 'Oulu');	
INSERT INTO `user` (`user_name`, `password`, `first_name`, `last_name`, `telephone`, `email`, `street_address`, `postal_code`, `city`) VALUES ('Matti', 'Matti2023+', 'Matti', 'Meikäläinen', '+358123456798', 'matti@gmail.com', 'Rantatie 7', '90803', 'Oulu');

INSERT INTO `parcel` (`id_user`, `locker_number`, `reciever_name`, `reciever_telephone`, `reciever_street_address`, `reciever_postal_code`, `reciever_city`, `sender_name`, `sender_telephone`, `sender_street_address`, `sender_postal_code`, `sender_city`, `parcel_dropoff_date`, `parcel_pickup_date`, `parcel_last_pickup_date`, `parcel_dropoff_code`, `parcel_pickup_code`, `status`) VALUES ('1', '1', 'Anne Kauppinen', '+358023456789', 'Rantatie 9', '90801', 'Oulu', 'Matti Meikäläinen', '+358123456798', 'Rantatie 7', '90803', 'Oulu', '2021-05-01', '2021-05-02', '2021-05-03', '123456', '654321', '4');
INSERT INTO `parcel` (`id_user`, `locker_number`, `reciever_name`, `reciever_telephone`, `reciever_street_address`, `reciever_postal_code`, `reciever_city`, `sender_name`, `sender_telephone`, `sender_street_address`, `sender_postal_code`, `sender_city`, `parcel_dropoff_date`, `parcel_pickup_date`, `parcel_last_pickup_date`, `parcel_dropoff_code`, `parcel_pickup_code`, `status`) VALUES ('2', '2', 'Matti Meikäläinen', '+358123456798', 'Rantatie 7', '90803', 'Oulu', 'Anne Kauppinen', '+358023456789', 'Rantatie 9', '90801', 'Oulu', '2021-05-01', '2021-05-02', '2021-05-03', '123456', '654321', '4');
INSERT INTO `parcel` (`id_user`, `locker_number`, `reciever_name`, `reciever_telephone`, `reciever_street_address`, `reciever_postal_code`, `reciever_city`, `sender_name`, `sender_telephone`, `sender_street_address`, `sender_postal_code`, `sender_city`, `parcel_dropoff_date`, `parcel_pickup_date`, `parcel_last_pickup_date`, `parcel_dropoff_code`, `parcel_pickup_code`, `status`) VALUES ('3', '3', 'Huyen Nguyen', '+358123456789', 'Rantatie 5', '90802', 'Oulu', 'Anne Kauppinen', '+358023456789', 'Rantatie 9', '90801', 'Oulu', '2021-05-01', '2021-05-02', '2021-05-03', '123456', '654321', '4');

INSERT INTO `locker` (`parcel_id`, `locker_number`, `cabinet_status`) VALUES ('1', '1', '4');
INSERT INTO `locker` (`parcel_id`, `locker_number`, `cabinet_status`) VALUES ('2', '2', '4');
INSERT INTO `locker` (`parcel_id`, `locker_number`, `cabinet_status`) VALUES ('3', '3', '4');
*/