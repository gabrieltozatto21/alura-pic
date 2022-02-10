import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPhoto } from './newPhoto';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

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

  upload(newPhoto: NewPhoto){

    const formData = new FormData();
    formData.append('description', newPhoto.description);
    formData.append('allowComments', newPhoto.allowComments ? 'true':'false');
    formData.append('imageFile', newPhoto.file);

    return this.http.post(`${API}/photos/upload`, formData);
  }

  findById(id: number){
    return this.http.get<Photo>(`${API}/photos/${id}`)
  }

  getComments(photoId: number){
    return this.http.get<PhotoComment[]>(`${API}/photos/${photoId}/comments`)
  }

  addComment(photoId: number, commentText: string){
    return this.http.post<PhotoComment>(`${API}/photos/${photoId}/comments`, {commentText})
  }

  removePhoto(photoId: number){
    return this.http.delete(`${API}/photos/${photoId}`);
  }

}
