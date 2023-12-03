type Parcel = {
  id_parcel: number;
  id_user?: number | null;
  reciever_name: string;
  reciever_telephone: string;
  reciever_street_address: string;
  reciever_postal_code: string;
  reciever_city: string;
  sender_name: string;
  sender_telephone?: string | null;
  sender_street_address?: string | null;
  sender_postal_code?: string | null;
  sender_city?: string | null;
  parcel_dropoff_date?: Date | null;
  parcel_readyforpickup_date?: Date | null;
  parcel_pickup_date?: Date | null;
  parcel_last_pickup_date?: Date | null;
  pin_code?: number | null;
  status: 'ready_to_deliver' | 'parcel_at_dropoff_locker' | 'parcel_in_transportation' | 'parcel_in_pickup_locker' | 'reciever_recieved_parcel';
  desired_dropoff_locker: number;
  desired_pickup_locker: number;
  alternative_pickup_locker?: number | null;
  parcel_height: number;
  parcel_width: number;
  parcel_depth: number;
  parcel_mass: number;
  receiver_email: string;
  sender_email: string;
}

export default Parcel;