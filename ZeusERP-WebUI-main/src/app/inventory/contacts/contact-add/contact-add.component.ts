import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit, OnDestroy, AfterViewInit {

  contactId: number;
  
  contactAddSub: Subscription;
  contactEditSub: Subscription;

  @Input()
  inDialogMode: boolean = false;

  @Output()
  AddContact: EventEmitter<Contact> = new EventEmitter<Contact>();

  @Output()
  DialogDiscard: EventEmitter<boolean> = new EventEmitter<boolean>();

  contactForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      companyName: [],
      jobPosition: [],
      emailAddress: [],
      phoneNumber: [],
      websiteLink: [],
      photoPath: [],
      extraInfo: [],
    });
   }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.contactId = +param['id'];

      console.log(this.contactId);
      // If an id parameter was given during routing.
      if (this.contactId) {

        console.log('Edit operation will be done. Contact Id is: ' + this.contactId);

        this.contactEditSub = this.contactService.getContactById(this.contactId).subscribe(c => {
          if(c) {
            this.contactForm.patchValue({
              id: c["id"],
              name: c["name"],
              surname: c["surname"],
              companyName: c["companyName"],
              jobPosition: c["jobPosition"],
              emailAddress: c["emailAddress"],
              phoneNumber: c["phoneNumber"],
              websiteLink: c["websiteLink"],
              extraInfo: c["extraInfo"],
            });
          }
        });
      }
    })
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if(this.contactAddSub) {
      this.contactAddSub.unsubscribe();
    }
    if(this.contactEditSub) {
      this.contactEditSub.unsubscribe();
    }
  }

  navigate(uri) {
    console.log('Called route is: ', uri);
    this.router.navigate(uri);
  }

  onSubmit() {

    const contact: Contact = {
      name: this.contactForm.get('name').value,
      surname: this.contactForm.get('surname').value,
      companyName: this.contactForm.get('companyName').value,
      jobPosition: this.contactForm.get("jobPosition").value,
      emailAddress: this.contactForm.get("emailAddress").value,
      phoneNumber: this.contactForm.get("phoneNumber").value,
      websiteLink: this.contactForm.get("websiteLink").value,
      extraInfo: this.contactForm.get("extraInfo").value,
    };

    if(this.contactId) {
      
      contact.id = this.contactId;

      if(this.inDialogMode) {
        this.AddContact.emit(contact);
      } else {
        
        // Add product to db.
        this.contactService.update(contact)
        .pipe(
          tap(
            data => { console.log(data); this.navigate(['/','inventory','contacts']); },
            error => this.catchContactAddError(error)
          )
        ).subscribe();
  
      }
    } else {

      if(this.inDialogMode) {
        this.AddContact.emit(contact);
      } else {
        // Add product to db.
        this.contactService.add(contact)
        .pipe(
          tap(
            data => { console.log(data) },
            error => this.catchContactAddError(error)
          )
        ).subscribe();
  
      }
    }
  }

  catchContactAddError(err: string) {
    console.warn("Some of the values you have entered are incorrect. Error:");
    console.error(err);
  }

  onDiscard() {
    if(this.inDialogMode) {
      this.DialogDiscard.emit(true);
    }
  }



}
