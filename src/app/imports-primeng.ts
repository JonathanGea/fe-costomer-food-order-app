import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    DrawerModule,
    MenuModule,
    ToastModule,
  ],
  exports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    DrawerModule,
    MenuModule,
    ToastModule
  ],
  providers: [MessageService],
})
export class ImportsModule {}
