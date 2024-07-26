export interface PatientVisits {

   id: number
   reason: string
   notes: any
   status: string
   startTime: string
   scheduleDate: string
   doctor: {
      surname: string
      name: string
      jobTitle: string
      specialization: string
   }
   hospital: {
      name: string
      address: string
   }
}