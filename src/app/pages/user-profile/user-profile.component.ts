import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from "../../shared/components/toast/toast.component";

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface User {
  name: string;
  email: string;
  address: string;
  imageUrl: string;
}

@Component({
  selector: 'app-user-profile',
  imports: [ImportsPrimengModule, FormsModule, ToastComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {

  user: User | undefined;

  isEditing: boolean = false;

  originalName: string = '';
  originalEmail: string = '';

  countries: any[] | undefined;
  selectedCountry: any;
  filteredCountries: any[] | undefined;

  constructor(
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('ok user profile');
    this.loadData();
    this.countries = [
      {
        name: 'Bank Central Asia Foresta Lantai 9',
        code: 'bca-f-lt9',
      },
      {
        name: 'Bank Central Asia Foresta Lantai 8',
        code: 'bca-f-lt8',
      },
    ];
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      // Simpan nilai asli sebelum masuk ke mode edit
      this.originalName = this.user!.name;
      this.originalEmail = this.user!.email;
      this.originalEmail = this.user!.email;
    }
  }

  saveProfile() {
    // Implementasi logika penyimpanan data ke backend di sini
    console.log('Saving profile...');

    // Contoh tampilan pesan sukses
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Profile updated successfully',
    });

    this.isEditing = false; // Keluar dari mode edit setelah penyimpanan
  }

  cancelEdit() {
    this.isEditing = false;
    this.user!.name = this.originalName;
    this.user!.email = this.originalEmail;
  }

  derectToMenuPage() {
    this.router.navigate(['/']);
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (const element of this.countries as any[]) {
      let country = element;
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  loadData() {
    this.user = {
      'name': 'John Doe',
      'email': 'john.doe@example.com',
      'address': 'Bank Central Asia Foresta Lantai 8',
      'imageUrl': 'https://picsum.photos/id/237/200/300'
    }
  }
}
