import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {FileService} from "./file.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private fileService: FileService) { }

  onUploadFiles(files: File[]): void {
    const formData: FormData = new FormData();
    for(const file of files) {
      formData.append('files', file, file.name);
    }
    this.fileService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onDownloadFiles(filename: string): void {
    const formData: FormData = new FormData();
    this.fileService.download(filename).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


  private reportProgress(event: HttpEvent<string[]>) {
    throw new Error("Method not implemented.");
  }
}
