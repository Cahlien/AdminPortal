import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './admin/user/user.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children:[
      {
        path:'',
        component: AdminComponent,
        pathMatch: 'full'
      },
      {
        path:'users',
        component: UserComponent
      }

    ]
  }      

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
