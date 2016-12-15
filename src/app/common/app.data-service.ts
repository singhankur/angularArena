import { Injectable } from '@angular/core';
import { AppService } from './app.http-service';

@Injectable()
export class DataService{

	profiles: string;
	priceConfig: Object;

  	constructor(public appService: AppService) {}

  	setPriceConfig(res){
  		let priceConfig = {
			kisan:{
				storagePrice: res['storagePricePerPacketKisan'],
				dropPrice: res['dropPricePerPacketKisan'],
				smallPacketPrice: res['storagePricePerSmallPacketKisan']
			},
			vyapari: {
				storagePrice: res['storagePricePerPacketVypari'],
				dropPrice: res['dropPricePerPacketVypari'],
				smallPacketPrice: res['storagePricePerSmallPacketVypari']
			}
		}
  		this.priceConfig = priceConfig;
  	}

  	setPriceConstants(){
  		let year = { year: "2016"};
  		this.appService.getAdminConstant(year)
  			.subscribe(response => this.setPriceConfig(response));
	}

}
