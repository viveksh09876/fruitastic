import { DeliveryDayService } from './../../../Services/delivery-day.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
declare var Date: any;
@Component({
  selector: 'app-delivery-day',
  templateUrl: './delivery-day.component.html',
  styleUrls: ['./delivery-day.component.css']
})
export class DeliveryDayComponent implements OnInit, AfterViewChecked {
  deliverDayForm: FormGroup;
  days: any[];
  deliverDay: any[];
  userId: any;
  constructor(
    private fb: FormBuilder,
    private deliveryDayService: DeliveryDayService,
    private router: Router
  ) {
    this.days = [
      { name: 'Monday' },
      { name: 'Tuesday' },
      { name: 'Wednesday' },
      { name: 'Thursday' },
      { name: 'Friday' }
    ];
  }
  ngOnInit() {
    let localU = localStorage.getItem('user');
    if(localU) {
      this.userId = localU;
      this.createForm();
    } else {
      localStorage.removeItem('user');
      this.router.navigate(['/cart']);
    }
    this.calendarInit();
  }
  ngAfterViewChecked() {
    $(".order-bar ul>li a").each(function() {
      if($(this).hasClass('active')) {
        $(".order-bar ul>li").removeClass("active");
        $(this).parent('li').addClass('active')
      }
    });
  }
  createForm() {
    // this.deliverDayForm = this.fb.group({
    //   days: this.fb.array([], Validators.required),
    //   orderType: ['', Validators.required]
    // });
    this.deliverDayForm = this.fb.group({
      //date: ['', Validators.required]
    });
  }
  // onChange(day: string, isChecked: boolean) {
  //   const dayFormArray = <FormArray>this.deliverDayForm.controls.days;

  //   if (isChecked) {
  //     dayFormArray.push(new FormControl(day));
  //   } else {
  //     let index = dayFormArray.controls.findIndex(x => x.value == day)
  //     dayFormArray.removeAt(index);
  //   }
  // }
  // formSubmit(values) {
  //   this.deliveryDayService.deliverDay.subscribe(d => this.deliverDay = d);
  //   this.deliverDay[0] = values;
  //   this.router.navigate(['/cart/payment']);
  // }
  formSubmit(values) {
    console.log(values);
    this.deliveryDayService.deliverDay.subscribe(d => this.deliverDay = d);
    this.deliverDay[0] = values.date;
    this.router.navigate(['/cart/payment']);
  }

  calendarInit() {
    const self = this;
    $("#calendar").datepicker({
      minDate: 0,
      inline: true,
      dateFormat: 'yy-mm-dd',
      beforeShowDay: function(date){ 
        var day = date.getDay(); 
        return [day == 2 || day == 4,""];
      },
      onSelect: function (date) {
        self.deliverDayForm['controls']['date'].setValue(date);
      }
    });
  }

}
