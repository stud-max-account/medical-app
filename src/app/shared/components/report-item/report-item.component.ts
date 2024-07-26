import { Component, Input } from "@angular/core";

@Component({
   standalone: true,
   selector: "report-item",
   templateUrl: "./report-item.component.html",
   styleUrl: "./report-item.component.css"
})
export class ReportItemComponent {

   @Input() title: string = 'Total Patients';

   @Input() number: number = 0;




}