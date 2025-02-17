import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [ImportsPrimengModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  name: string = 'John Doe';
  email: string = 'john.doe@example.com';
  userAvatar: string = 'https://picsum.photos/id/237/200/300';
  isEditing: boolean = false;
  originalName: string = '';
  originalEmail: string = '';

  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {
    console.log('ok user profile');
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      // Simpan nilai asli sebelum masuk ke mode edit
      this.originalName = this.name;
      this.originalEmail = this.email;
    }
  }

  saveProfile() {
    // Implementasi logika penyimpanan data ke backend di sini
    console.log('Saving profile...', this.name, this.email);

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
    this.name = this.originalName;
    this.email = this.originalEmail;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
