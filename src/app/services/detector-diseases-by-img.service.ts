import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const BASE_URL: string = 'http://localhost:5000';

@Injectable()
export class DetectorDiseasesByImgService {

   constructor(private http: HttpClient) {

   }

   checkPresenceOfTumorFromPhotos(files: File[]) {
      const fullUrl = `${BASE_URL}/check-presence-tumor/`;

      const formData = new FormData();

      files.map(f => formData.append("files", f))

      return this.http.post(fullUrl, formData);

   }

}
