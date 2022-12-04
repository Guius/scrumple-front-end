import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BacklogItemResponseDto } from './dtos/backlog-item.dto';
import { firstValueFrom } from 'rxjs';
import { Tab1Service } from './tab1.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  backlogItems: BacklogItemResponseDto[] = [];

  constructor(private http: HttpClient, private service: Tab1Service) {}

  async ngOnInit(): Promise<void> {
    try {
      this.backlogItems = await firstValueFrom(this.service.getBacklogItems());
    } catch (err) {
      console.error(`Backlog Get All Items failed`);
      console.error(err);
    }
  }
}
