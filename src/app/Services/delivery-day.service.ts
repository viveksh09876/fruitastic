import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
@Injectable()
export class DeliveryDayService {
  private deliverDaySource = new BehaviorSubject<any>([]);
  deliverDay = this.deliverDaySource.asObservable();
  private delDay: any[];
  constructor() { }
  deleteDays() {
    this.deliverDay.subscribe(p => this.delDay = p);
    this.delDay.length = 0;
  }

}
