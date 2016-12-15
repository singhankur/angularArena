import { Component, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { AppService } from '../../../common/app.http-service';
import { DataService } from '../../../common/app.data-service';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-vyapari-profile',
  templateUrl: './vyapari-profile.component.html'
})
export class VyapariProfileComponent implements OnInit {

	showProfile:boolean = false;
	profiles: Array<Object>;
	transactions: Array<Object>;
	priceConfig: any;
	total_remaining_packets: number = 0;
	total_amount_due: number = 0;
	profile: Object;
	grandTotalTransaction: Object = {
		packetTaken: '',
		totalAmount: '',
		amountPaid: '',
		totalDropPrice: '',
		totalWeight: '',
		totalWeightAmount: '',
		totalSmallPacket: '',
		smallPacketAmount: ''

	};

	constructor(public appService: AppService, private router: Router, private dataservice: DataService) {}

	fetchProfile(event){
		this.fetchProfileById(event.slipNumber);
	}

	fetchProfileById(slipNumber){
		let profileParams = {
			slipNumber: (slipNumber).toString(),
			session_id: "22"
		};
		let transactionParams = {
			slipNumber: (slipNumber).toString()
		}

		let year = { year: "2016"};

		Observable.forkJoin(
			this.appService.getProfile(profileParams),
			this.appService.getUserTranscations(transactionParams),
			).subscribe(response => this.showResponse(response));
	}

	showResponse(res){
		
		
		this.setDetailsOnProfileType(res);

		this.total_remaining_packets = this.calculateTotalPackets(this.profiles) - this.calculatePacketsTaken(this.transactions);
	}

	setDetailsOnProfileType(res){

		this.profiles = res[0];
		this.profile = this.profiles[0];

		if(this.profile){	
			if((this.profile['profileType']).toUpperCase() === "V"){
				this.searchForm = false;
				this.showProfile = true;
			}else alert('No Vyapari found.')
		}else{
			alert('No Vyapari found.');
			return false;
		}

		this.transactions = res[1];
		this.priceConfig = this.dataservice.priceConfig['vyapari'];

		this.calculateGrandTotalTransaction();
		this.calculatePriceConfig(this.transactions);
	}

	calculateGrandTotalTransaction(){
		let _packetTaken=0, _totalAmount=0, _amountPaid=0, _totalDropPrice=0, _totalWeight=0, _totalWeightAmount=0, _totalSmallPacket=0, _smallPacketAmount=0;

		this.transactions.map((item) => {
			_packetTaken = _packetTaken + Number(item['packetTaken']);
			_totalAmount = _totalAmount + Number(item['totalAmount']);
			_amountPaid = _amountPaid + Number(item['amountPaid']);
			_totalDropPrice = _totalDropPrice + Number(item['totalDropPrice']);
			_totalWeight = _totalWeight + Number(item['totalWeight']);
			_totalWeightAmount = _totalWeightAmount + Number(item['totalWeightAmount']);
			_totalSmallPacket = _totalSmallPacket + Number(item['totalSmallPacket']);
			_smallPacketAmount = _smallPacketAmount + Number(item['totalSmallPacket']);
		});
		this.grandTotalTransaction['packetTaken'] = _packetTaken;
		this.grandTotalTransaction['totalAmount'] = _totalAmount;
		this.grandTotalTransaction['amountPaid'] = _amountPaid;
		this.grandTotalTransaction['totalDropPrice'] = _totalDropPrice;
		this.grandTotalTransaction['totalWeight'] = _totalWeight;
		this.grandTotalTransaction['totalWeightAmount'] = _totalWeightAmount;
		this.grandTotalTransaction['totalSmallPacket'] = _totalSmallPacket;
		this.grandTotalTransaction['smallPacketAmount'] = _smallPacketAmount;

		//this.total_amount_due = _totalAmount + _totalWeightAmount - _amountPaid;
	}

	calculatePriceConfig(transactions){
		this.priceConfig['totalSmallPackets'] = this.calculateTotalSmallPackets(transactions)
		let profile = this.profiles[0];
		this.priceConfig['totalDropPrice'] = Number(profile['noOfPacket']) * this.priceConfig['dropPrice'];
		this.priceConfig['totalSmallPacketPrice'] = Number(this.priceConfig['smallPacketPrice']) * Number(this.priceConfig['totalSmallPackets']);
	}

	calculateTotalPackets(profiles){
		let totalPackets = 0;
		for (let i in profiles) {
			totalPackets = totalPackets + Number(profiles[i].noOfPacket);
		}
		return totalPackets;
	}

	calculateTotalSmallPackets(transactions){
		let _smallPacket = 0;
		for (let i in transactions) {
			_smallPacket = _smallPacket + Number(transactions[i].totalSmallPacket);
		}
		return _smallPacket;
	}

	calculatePacketsTaken(transactions){
		let packetTaken = 0;
		for (let i in transactions) {
			packetTaken = packetTaken + Number(transactions[i].packetTaken);
		}
		return packetTaken;
	}

	amountObj: any;
	totalAmount: number;
	totalAmountPaid: number;

	transactionHimselfForm: boolean = false;
	transactionVyapariForm: boolean = false;
	searchForm: boolean = true;
	weightTakenByKisan: boolean = false;
	packetTakenByKisan: boolean = false;

	showPacketTakenByKisan(){
		this.weightTakenByKisan = false;
		this.packetTakenByKisan = true;
		this.showProfile = false;
		this.searchForm = false;
	}

	showWeightTakenByKisan(){
		this.weightTakenByKisan = true;
		this.packetTakenByKisan = false;
		this.showProfile = false;
		this.searchForm = false;
	}

	showTransactionHimselfForm(){
		this.showProfile = false;
		this.transactionHimselfForm = true;
		this.transactionVyapariForm = false;
		this.searchForm = false;
		this.weightTakenByKisan = false;
		this.packetTakenByKisan = false;
	}

	showTransactionVyapariForm(){
		this.showProfile = false;
		this.transactionVyapariForm = true;
		this.transactionHimselfForm = false;
		this.searchForm = false;
		this.weightTakenByKisan = false;
		this.packetTakenByKisan = false;
	}

	ngOnInit() {
		if(this.dataservice['slipNumber']){
			this.fetchProfileById(this.dataservice['slipNumber']);
			delete this.dataservice['slipNumber'];
		}
	}

}

