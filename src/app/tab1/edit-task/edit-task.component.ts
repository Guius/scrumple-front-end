import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { BacklogItemResponseDto } from '../dtos/backlog-item.dto';
import { EditTaskService } from './edit-task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  name: string = 'hello';
  backlogItem: BacklogItemResponseDto = {
    id: '',
    name: '',
    description: '',
    points: 0,
    label: '',
  };

  submitted = false;

  @Input() itemId: string = '';

  constructor(
    private modalCtrl: ModalController,
    private service: EditTaskService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(this.itemId);
    this.backlogItem = await firstValueFrom(
      this.service.getBacklogItem(this.itemId)
    );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async onSubmit() {
    console.log('form submitted');
    console.debug(this.backlogItem);
    try {
      this.backlogItem = await firstValueFrom(
        this.service.editBacklogItem(this.itemId, this.backlogItem)
      );
    } catch (err) {
      console.error(err);
    }
    this.submitted = true;
  }
}
