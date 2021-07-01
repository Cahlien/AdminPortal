import { ElementSchemaRegistry } from '@angular/compiler';
import { OnInit, Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { SortableData } from 'src/app/directives/sort/sort.directive';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  sortData: SortableData = { 
    elements: undefined,
    sortProperty: undefined,
    sortOrder: undefined
  };

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.httpService.getUsers().subscribe((res)=>{
      this.sortData.elements = <[]>res;
    })
  }

  allLoadedUsers(): any[] {
    return this.sortData.elements ?? [];
  }

  usersNotYetLoaded(): boolean {
    return this.sortData.elements === undefined;
  }
}

