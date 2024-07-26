export interface PatientRegistrationDto {
   email: string;
   password: string;
   name: string;
   surname: string;
   dateBirth: string;
   phone?: string;
   address?: string;
   gender: string;
   nationality?: string;
   bloodGroup: string;
   emergencyContactName: string;
   emergencyContactPhone: string;
}