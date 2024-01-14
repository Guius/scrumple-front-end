import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  BacklogItemRequestDto,
  BacklogItemResponseDto,
} from '../dtos/backlog-item.dto';

@Injectable()
export class AddTaskService {
  constructor(private http: HttpClient) {}

  addBacklogItem(
    body: BacklogItemRequestDto
  ): Observable<BacklogItemResponseDto> {
    return this.http.post<BacklogItemResponseDto>(
      `${environment.api_url}/backlog`,
      body
    );
  }
}
