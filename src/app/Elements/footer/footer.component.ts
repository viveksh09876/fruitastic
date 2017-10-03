import { GetListService } from './../../Services/get-list.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  newsLetterForm: FormGroup;
  constructor(private fb: FormBuilder,
  private getService: GetListService,
  private _fM: FlashMessagesService) {
   }
  ngOnInit() {
    this.createForms();
  }
  createForms() {
    this.newsLetterForm = this.fb.group({
      email: ['', Validators.required]
    });
  }
  
  submitForm(value) {
    this.getService.Getlist('http://www.binaryfrog.co/web/api/newsletter.php?foot_email='+ value.email)
    .map((res: Response) => {
      return res.json();
    }).subscribe((d) => {
      if(d == 1) {
        this._fM.show('<h5>Thank you for your subscription.!</h5><p>This newsletter is generally sent out a weekly basis.</p>', { cssClass: 'alert-success', timeout: 6000 });
        this.newsLetterForm.reset();
      } else if(d == 2) {
        this._fM.show('Your are already subscribe!', { cssClass: 'alert-info', timeout: 3000 });
        this.newsLetterForm.reset();
      }
      if(d == 0) {
        this._fM.show('Error please try again!', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
