import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './common/app.data-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
	constructor(private dataservice: DataService){}

	ngOnInit(){
		this.dataservice.setPriceConstants();
	}

	getProfile(event){
	}
}
