import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { BrowserModule } from "@angular/platform-browser";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { Subscription } from "rxjs";
import { ContactsService } from "../../services/contacts.service";
import { SocketService } from "../../services/socket.service";
import { SocketEventsEnum } from "../../shared/types/socketEvents.enum";
// import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
// import { distinctUntilChanged, tap } from "rxjs";

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent implements OnInit, OnDestroy {

  // isMobileView!: boolean
  isSidePopup = false
  contacts!: any

  // readonly breakpoint$ = this.breakpointObserver
  //   .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
  //   .pipe(
  //     tap(value => console.log('OBSERVER', value)),
  //     distinctUntilChanged()
  //   );

  contactsService = inject(ContactsService)

  constructor(
    // private breakpointObserver: BreakpointObserver
    private authService: AuthService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    // this.breakpoint$.subscribe(result => {
    //   console.log('result', result.matches)
    //   this.isMobileView = result.matches
    // })

    this.socketService.emit(SocketEventsEnum.MESSENGER_JOIN, '');

    this.contactsService.getContacts().subscribe(currentContacts => {
      this.contacts = currentContacts[0].contacts;
      this.contactsService.contacts$.next(this.contacts);
      console.log('currentContacts', this.contacts);
    })
  }

  ngOnDestroy() {
  }

  openSidePopup() {
    this.isSidePopup = !this.isSidePopup;
  }

  closeSidePopup() {
    this.isSidePopup = false;
  }

  getAllContacts() {
    this.authService.getAllUsers().subscribe(users => {
      console.log('USERS', users);
      this.contacts = users;
      this.closeSidePopup();
    })
  }

  getCurrentContacts() {
    this.contacts = this.contactsService.contacts$.getValue();
    this.closeSidePopup();
  }

  connectTo(userId: string) {
    this.contactsService.getUserContact(userId).subscribe(userData => {
      this.contactsService.connectedUser$.next(userData)
    })
  }

  initializeListeners() {

  }
}
