import { Component, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ContactsService } from "../../services/contacts.service";
import { concatMap, Subscription } from "rxjs";
import { MessagesService } from "../../services/messages.service";
import { User, UserConnections } from "../../interfaces/user";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-connected-user',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './connected-user.component.html',
  styleUrl: './connected-user.component.scss'
})
export class ConnectedUserComponent implements OnDestroy {

  form!: FormGroup;
  disabled!: boolean;
  connectedUser!: User;

  connections!: UserConnections[];

  connectedUserSubscription = Subscription.EMPTY;
  connectionsSubscription = Subscription.EMPTY;

  formValueSubscription = Subscription.EMPTY;

  constructor(
    fb: FormBuilder,
    private contactsService: ContactsService,
    private messagesService: MessagesService
  ) {
    this.form = fb.group({
      message: [''],
      files: ['']
    });

    // this.disabled = !(this.form.value.message || this.form.value.files);

    this.formValueSubscription = this.form.valueChanges.subscribe(val => {
      this.disabled = !(val.message || val.files)
    });

    this.connectedUserSubscription = this.contactsService.connectedUser$.subscribe(user => {
      this.connectedUser = user;
      console.log('this.connectedUser', this.connectedUser);
    });

    this.connectionsSubscription = this.contactsService.contacts$.subscribe(contacts => {
      this.connections = contacts;
      console.log('this.connections', this.connections);
    })
  }

  ngOnDestroy() {
    this.connectedUserSubscription.unsubscribe();
    this.formValueSubscription.unsubscribe();
    this.connectionsSubscription.unsubscribe();
  }

  send() {
    console.log('form.value', this.form.value);
    // console.log('send message')
  }

  onSubmit() {
    const isContactNotAdded = !(this.connections.find(contact => {
      return contact._id === this.connectedUser._id
    }));

    console.log('isContactNotAdded', isContactNotAdded);

    isContactNotAdded &&
      this.contactsService.addContact(this.connectedUser).pipe(
        concatMap(contact => {
          console.log('contact', contact.contacts);
          const newContacts = contact.contacts
          newContacts && this.contactsService.contacts$.next(newContacts);
          return this.messagesService.firstMessage(this.form.value , this.connectedUser._id)
        })
      ).subscribe(v => {
        console.log('message', v);
        this.form.reset();
      });


  }
}
