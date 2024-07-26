import { Observable } from "rxjs";

export interface IReportStrategy {
   getStatistics(): Observable<any>;
}