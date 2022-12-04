import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BacklogItemResponseDto } from './dtos/backlog-item.dto';

@Injectable()
export class Tab1Service {
  constructor(private http: HttpClient) {}

  getBacklogItems(): Observable<BacklogItemResponseDto[]> {
    return this.http.get<BacklogItemResponseDto[]>(
      `${environment.api_url}/backlog`
    );
  }
}
