import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from './photo';

const API = 'http://localhost:3000'

@Injectable({ providedIn: 'root' })
export class PhotoService {
  constructor(private http: HttpClient) {}

  listaPhotosUser(userName: string):Observable<Photo[]> {
    return this.http.get<Photo[]>(`${API}/${userName}/photos`);
  }

  listaPhotosUserPaginated(userName: string, page: number):Observable<Photo[]> {
    const params = new HttpParams().append('page', page.toString())
    return this.http.get<Photo[]>(`${API}/${userName}/photos`, { params });
  }

}
