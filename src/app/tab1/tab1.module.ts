import { IonicModule, ToastController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HttpClientModule } from '@angular/common/http';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { Tab1Service } from './tab1.service';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { EditTaskService } from './edit-task/edit-task.service';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { DataSharingService } from './data-sharing.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    HttpClientModule,
    NgbToastModule,
  ],
  declarations: [Tab1Page, EditTaskComponent],
  providers: [Tab1Service, EditTaskService, DataSharingService],
})
export class Tab1PageModule {}
