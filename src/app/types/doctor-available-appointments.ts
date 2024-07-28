export interface DoctorAvailableAppointments {

   doctor: {
      id: number;
      name: string;
      surname: string;
      jobTitle: string;
      imgUrl: string;
   }
   hospitals: {
      id: number;
      name: string;

      address: string;

      appointmentsTime: { id: number; startTime: string; isAvailable: boolean }[]
   }[]




}