import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

import { MessageService } from 'primeng/api';

import { ProductComponent } from './shared/components/product/product.component';
import { CardModule } from 'primeng/card';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    
    
    
    // component
    ProductComponent
  ],
  exports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    

    // component
    ProductComponent
    
  ],
  providers: [
    MessageService
  ],
})
export class ImportsModule {}
