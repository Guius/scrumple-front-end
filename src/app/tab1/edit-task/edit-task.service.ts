import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  BacklogItemRequestDto,
  BacklogItemResponseDto,
} from '../dtos/backlog-item.dto';

@Injectable()
export class EditTaskService {
  constructor(private http: HttpClient) {}

  getBacklogItem(itemId: string): Observable<BacklogItemResponseDto> {
    return this.http.get<BacklogItemResponseDto>(
      `${environment.api_url}/backlog/${itemId}`
    );
  }

  editBacklogItem(
    itemId: string,
    body: BacklogItemRequestDto
  ): Observable<BacklogItemResponseDto> {
    return this.http.patch<BacklogItemResponseDto>(
      `${environment.api_url}/backlog/${itemId}`,
      body
    );
  }
}
