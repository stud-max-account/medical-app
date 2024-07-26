import { IDoctor } from "./doctor.interface";
import { IPatient } from "./patient.interface";

export interface AuthorizedUser {
   userId: number;
   email: string;
   role: string;
   details: IDoctor | IPatient
}