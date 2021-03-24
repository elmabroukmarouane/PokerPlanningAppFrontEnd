import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GenericService<TEntity> {

  constructor(private http: HttpClient) { }

  getAll(endPoint: string) {
    return this.http.get<TEntity[]>(`${API_URL}/${endPoint}`, httpOptions);
  }

  getById(endPoint: string, id: number) {
    return this.http.get<TEntity>(`${API_URL}/${endPoint}/${id}`, httpOptions);
  }

  Add(endPoint: string, entity: TEntity) {
    return this.http.post(`${API_URL}/${endPoint}`, entity, httpOptions);
  }

  Update(endPoint: string, entity: TEntity) {
    return this.http.put(`${API_URL}/${endPoint}`, entity, httpOptions);
  }

  Delete(endPoint: string, id: number) {
    return this.http.delete(`${API_URL}/${endPoint}/${id}`, httpOptions);
  }

}
