import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { BacklogItemResponseDto } from '../dtos/backlog-item.dto';
import { EditTaskService } from './edit-task.service';
import { Output, EventEmitter } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';

interface EditForm {
  name: string;
  description: string;
  points: number;
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  form: EditForm = {
    name: '',
    description: '',
    points: 0,
  };

  submitted = false;

  @Input() itemId: string = '';

  constructor(
    private modalCtrl: ModalController,
    private service: EditTaskService,
    private dataSharing: DataSharingService,
    private toastController: ToastController
  ) {}

  async ngOnInit(): Promise<void> {
    const result = await firstValueFrom(
      this.service.getBacklogItem(this.itemId)
    );

    this.form.description = result.description;
    this.form.name = result.name;
    this.form.points = result.points;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async onSubmit() {
    console.log('form submitted');
    try {
      const result = await firstValueFrom(
        this.service.editBacklogItem(this.itemId, this.form)
      );
      // update the form inputs
      this.form.description = result.description;
      this.form.name = result.name;
      this.form.points = result.points;

      // emit an event so that the list page can update it's data
      this.dataSharing.itemEditedEvent.emit();
      this.modalCtrl.dismiss();
    } catch (err) {
      console.error(err);
      const toast = await this.toastController.create({
        message: 'Error editing item',
        duration: 2000, // Duration in milliseconds
        position: 'bottom', // Set position to bottom
        color: 'danger', // Optional: Set the color of the toast
        buttons: [
          {
            side: 'end',
            text: 'Close',
            handler: () => {
              console.log('Close button clicked');
            },
          },
        ],
      });
      await toast.present();
      this.modalCtrl.dismiss();
    }
    this.submitted = true;
  }

  delete() {
    this.service.deleteBacklogItem(this.itemId).subscribe({
      next: () => {
        this.dataSharing.itemEditedEvent.emit();
        this.modalCtrl.dismiss();
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Error deleting item',
          duration: 2000, // Duration in milliseconds
          position: 'bottom', // Set position to bottom
          color: 'danger', // Optional: Set the color of the toast
          buttons: [
            {
              side: 'end',
              text: 'Close',
              handler: () => {
                console.log('Close button clicked');
              },
            },
          ],
        });
        await toast.present();
        this.modalCtrl.dismiss();
      },
    });
  }
}
