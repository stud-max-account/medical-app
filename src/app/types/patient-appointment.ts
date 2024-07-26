
export interface PatientAppointment {
   id: number;

   startTime: string;
   endTime: string;
   patient: {
      name: string;
      surname: string;
      imgUrl: string;
   }

}