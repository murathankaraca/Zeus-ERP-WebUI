import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  hasFailed: boolean = false;

  paramsSubscription: Subscription;

  contact: Contact;
  contactSub: Subscription;

  profileImageUrl: string;

  @Input()
  showDetails = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      const id = +params["id"];
      this.contactSub = this.contactService.getContactById(id)
      .pipe(
        tap(
          data => { this.contact = data; console.log(data) },
          error => this.catchContactDetailsError(error)
        )
      )
      .subscribe();
    });
  }

  ngOnDestroy(): void {
    if(this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if(this.contactSub) {
      this.contactSub.unsubscribe();
    }

  }

  navigate(uris) {
    console.log("Navigation: ", uris);
    this.router.navigate(uris);
  }

  deleteContact() {
    this.contactService.delete(this.contact.id).pipe(
      tap(
        data => { console.log(data); },
        err => { this.catchContactDetailsError(err); }
      )
    ).subscribe();
    
  }

  catchContactDetailsError(err: string) {
    console.warn("An error was encountered during contact details fetch operation:");
    console.error(err);
  }


}
