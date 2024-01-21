import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetNotCompleteSprintResponseDto } from './dtos/not-complete-sprints-response.dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class Tab2Service {
  constructor(private http: HttpClient) {}

  getNonCompleteSprints(): Observable<GetNotCompleteSprintResponseDto[]> {
    return this.http.get<GetNotCompleteSprintResponseDto[]>(
      `${environment.api_url}/sprint/not-complete`
    );
  }
}
