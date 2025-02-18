import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,    
  ],
  providers: [
    MessageService
  ],
})
export class Imports {}
