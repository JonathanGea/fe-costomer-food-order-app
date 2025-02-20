import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    DrawerModule,
    MenuModule,
    ToastModule,
    AvatarModule,
    PanelMenuModule,
    ToolbarModule,
    FloatLabelModule,
    InputTextModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    InputIconModule,
    IconFieldModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    DrawerModule,
    MenuModule,
    ToastModule,
    AvatarModule,
    PanelMenuModule,
    ToolbarModule,
    FloatLabelModule,
    InputTextModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    InputIconModule,
    IconFieldModule
  ],
  providers: [MessageService],
})
export class ImportsPrimengModule {}
