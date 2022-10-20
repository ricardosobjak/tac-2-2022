import { NgModule } from '@angular/core';
import { PrivateComponent } from './private/private.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  declarations: [PrivateComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class PrivateModule {}
