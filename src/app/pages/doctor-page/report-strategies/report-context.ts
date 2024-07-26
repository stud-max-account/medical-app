import { Observable } from "rxjs";
import { IReportStrategy } from "./report-strategy.interface";

export class ReportContext {
   private strategy: IReportStrategy;

   setStrategy(strategy: IReportStrategy): void {
      this.strategy = strategy;
   }

   executeStrategy(): Observable<any> {
      return this.strategy.getStatistics();
   }
}