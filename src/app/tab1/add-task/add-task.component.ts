import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { DataSharingService } from '../data-sharing.service';
import { AddTaskService } from './add-task.service';

interface EditForm {
  name: string;
  description: string;
  points: number;
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  form: EditForm = {
    name: '',
    description: '',
    points: 0,
  };

  submitted = false;

  constructor(
    private modalCtrl: ModalController,
    private service: AddTaskService,
    private dataSharing: DataSharingService,
    private toastController: ToastController
  ) {}

  async ngOnInit(): Promise<void> {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async onSubmit() {
    console.log('form submitted');
    try {
      const result = await firstValueFrom(
        this.service.addBacklogItem(this.form)
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
        message: 'Error adding item',
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
}
