import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class DataSharingService {
  public itemEditedEvent = new EventEmitter<void>();

  constructor() {}
}
