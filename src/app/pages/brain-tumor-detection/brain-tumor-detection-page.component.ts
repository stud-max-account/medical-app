import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { FilePondComponent } from 'ngx-filepond';
import { FilePondOptions } from "filepond";
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { CommonModule, NgIf } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { DetectorDiseasesByImgService } from "../../services/detector-diseases-by-img.service";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);




@Component({
   standalone: true,
   selector: "brain-tumor-detection-page",
   encapsulation: ViewEncapsulation.None,
   templateUrl: "./brain-tumor-detection-page.component.html",
   styleUrl: "./brain-tumor-detection-page.component.css",
   providers: [DetectorDiseasesByImgService],
   imports: [CommonModule, NgIf, FilePondModule, ButtonModule]
})
export class BrainTumorDetectionPageComponent {


   @ViewChild('myPond') myPond: FilePondComponent;


   isLoading: boolean = false;
   isBtnDisabled: boolean = true;

   public pondOptions: FilePondOptions = {
      allowMultiple: true,
      labelIdle: 'Drop files here...',
      acceptedFileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
      credits: false,
      maxFiles: 5,



   }

   resultsDetection: { fileName: string, result: number }[] = [];

   constructor(private detectorDiseasesByImgService: DetectorDiseasesByImgService) {

   }

   onRemoveFileHandler() {
      this.resultsDetection = [];
      this.updateFileCount();
   }

   updateFileCount() {
      this.isBtnDisabled = (this.myPond as any).getFiles().length == 0;
   }


   onButtonClickHandler() {

      const files: File[] = [];

      const pondFiles = (this.myPond as any).getFiles();


      pondFiles.forEach((pondFile: { file: File }) => {
         files.push(pondFile.file)
      });

      this.isLoading = true;
      this.detectorDiseasesByImgService.checkPresenceOfTumorFromPhotos(files)
         .subscribe((data: any) => {
            this.resultsDetection = data;
            this.isLoading = false;
         });
   }


}
