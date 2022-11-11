import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  contacts: Array<Contact>;
  contactsSub: Subscription;

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contactsSub = this.contactService.getAllContacts()
    .subscribe(c => this.contacts = c);
  }

  ngOnDestroy(): void {
    if(this.contactsSub) {
      this.contactsSub.unsubscribe();
    }
  }

  addContact() {
    this.router.navigate(['/', 'inventory', 'contacts', 'add']);
  }

  editContact(id: number) {
    this.router.navigate(['/', 'inventory', 'contacts', 'edit', id.toString()]);
  }

  showContactDetails(id: number) {
    this.router.navigate(['/', 'inventory', 'contacts', 'add']);
  }

}
