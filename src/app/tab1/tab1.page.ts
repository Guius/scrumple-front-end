import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BacklogItemResponseDto } from './dtos/backlog-item.dto';
import { firstValueFrom } from 'rxjs';
import { Tab1Service } from './tab1.service';
import { ModalController } from '@ionic/angular';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DataSharingService } from './data-sharing.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  backlogItems: BacklogItemResponseDto[] = [];

  constructor(
    private http: HttpClient,
    private service: Tab1Service,
    private modalCtrl: ModalController,
    private dataSharing: DataSharingService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getData();
    this.dataSharing.itemEditedEvent.subscribe(async () => {
      await this.getData();
    });
  }

  async openModal(itemId: string) {
    const modal = await this.modalCtrl.create({
      component: EditTaskComponent,
      breakpoints: [0, 0.3, 0.75, 1],
      initialBreakpoint: 0.75,
      componentProps: { itemId: itemId },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello ${data}`);
    }
  }

  async getData() {
    try {
      this.backlogItems = await firstValueFrom(this.service.getBacklogItems());
    } catch (err) {
      console.error(`Backlog Get All Items failed`);
      console.error(err);
    }
  }
}
