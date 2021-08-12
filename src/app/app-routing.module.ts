import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './admin/user/user.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from "./auth/auth.component";
import { AccountComponent } from "./admin/accounts/accounts.component"

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
      },
      {
        path: 'auth',
        component: AuthComponent
      },
      {
        path: 'accounts',
        component: AccountComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
