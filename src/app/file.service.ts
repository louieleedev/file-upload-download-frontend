import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private server = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.server}/file/upload`, formData,{

      // ermögliche, den Fortschritt des Uploads zu verfolgen
      reportProgress: true,

      // Erhalte Zugriff auf die gesamte Sequenz von HttpEvents, nicht nur den finalen Inhalt
      observe: 'events'
    } );
  }

  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.server}/file/download/${filename}`,{

      // ermögliche, den Fortschritt des Uploads zu verfolgen
      reportProgress: true,

      // Erhalte Zugriff auf die gesamte Sequenz von HttpEvents, nicht nur den finalen Inhalt
      observe: 'events',

      // teile Angular mit, dass die erwartete Antwort ein Blob-Objekt ist, das typischerweise für binäre Daten wie Dateien verwendet wird.
      responseType: 'blob'
    } );
  }
}
