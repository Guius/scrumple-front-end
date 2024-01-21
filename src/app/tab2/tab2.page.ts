import { Component } from '@angular/core';
import { Tab2Service } from './tab2.service';
import { GetNotCompleteSprintResponseDto } from './dtos/not-complete-sprints-response.dto';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  nonCompleteSprints: GetNotCompleteSprintResponseDto[] = [];

  constructor(private service: Tab2Service) {}

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  async getData() {
    try {
      this.nonCompleteSprints = await firstValueFrom(
        this.service.getNonCompleteSprints()
      );
    } catch (err) {
      console.error(`Non complete sprints get all failed`);
      console.error(err);
    }
  }
}
