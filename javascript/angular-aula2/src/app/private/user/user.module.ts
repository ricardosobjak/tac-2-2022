import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'new', component: FormComponent},
  { path: 'novo', component: FormComponent},
  { path: ':id', component: FormComponent}
];

@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ]
})
export class UserModule { }
