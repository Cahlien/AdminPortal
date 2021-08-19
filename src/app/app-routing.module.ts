import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './admin/user/user.component';
import { LayoutComponent } from './layout/layout.component';
<<<<<<< HEAD
import { AuthComponent } from "./auth/auth.component";
import { AccountComponent } from "./admin/accounts/accounts.component"
=======
import {AuthComponent} from "./auth/auth.component";
import { CardComponent } from './admin/card/card.component';
>>>>>>> Feature-BeardtrustLLC-132/133/135

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
<<<<<<< HEAD
        path: 'auth',
        component: AuthComponent
      },
      {
        path: 'accounts',
        component: AccountComponent
=======
        path: 'cards',
        component: CardComponent
      },
      {
        path: 'auth',
        component: AuthComponent
>>>>>>> Feature-BeardtrustLLC-132/133/135
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
