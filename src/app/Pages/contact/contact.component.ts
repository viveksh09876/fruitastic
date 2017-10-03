import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetListService } from './../../Services/get-list.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  pageContent: any;
  contactForm: FormGroup;
  constructor(
    private getList: GetListService,
    private _fM: FlashMessagesService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
    // this.getContent();
    this.createForm();
  }
  createForm() {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      address: [''],
      email: ['', Validators.required],
      contact_no: [''],
      message: ['']
    });
  }
  submitForm(value) {
    this.getList.Getlist('http://www.binaryfrog.co/web/api/contact.php?name=test &email='+ value.email +'&contact_no='+ value.contact_no +'&message='+ value.message)
    .map((res: Response) => {
      return res.json();
    }).subscribe((d) => {
      if(d == 1) {
        this._fM.show('<h5>Thank you!</h5><p>We appreciate you contacting us about getting in touch.<br>One of our colleagues will get back to you shortly.</p>', { cssClass: 'alert-success', timeout: 6000 });
        this.contactForm.reset();
      } else {
        this._fM.show('Error please try again!', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }
  // getContent() {
  //   this.getList.Getlist('http://www.binaryfrog.co/web/api/get_content.php?pname=contact_us').map(d => {
  //     return d.json();
  //   }).subscribe((data) => {
  //     console.log(data);
  //     this.pageContent = data[0]['description'];
  //   })
  // }

}
