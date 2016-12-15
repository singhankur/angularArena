import { Component, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { AppService } from '../../../common/app.http-service';
import { DataService } from '../../../common/app.data-service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
	selector: 'app-kisan-profile',
	templateUrl: './kisan-profile.component.html'
})

export class KisanProfileComponent implements OnInit {

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
		totalWeightAmount: ''
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
	}

	setDetailsOnProfileType(res){
		this.profiles = res[0];
		this.profile = this.profiles[0];
		if(this.profile){	
			if((this.profile['profileType']).toUpperCase() === "K"){
				this.searchForm = false;
				this.showProfile = true;
			}else alert('No Kisan found.')
		}else{
			alert('No Kisan found.');
			return false;
		}

		this.transactions = res[1];
		this.priceConfig = this.dataservice.priceConfig['kisan'];

		this.calculateTotalDropPrice();
		this.calculateGrandTotalTransaction();
		this.total_remaining_packets = this.calculateTotalPackets(this.profiles) - this.calculatePacketsTaken(this.transactions);
	}

	calculateGrandTotalTransaction(){
		let _packetTaken=0, _totalAmount=0, _amountPaid=0, _totalDropPrice=0, _totalWeight=0, _totalWeightAmount=0;

		this.transactions.map((item) => {
			_packetTaken = _packetTaken + Number(item['packetTaken']);
			_totalAmount = _totalAmount + Number(item['totalAmount']);
			_amountPaid = _amountPaid + Number(item['amountPaid']);
			_totalDropPrice = _totalDropPrice + Number(item['totalDropPrice']);
			_totalWeight = _totalWeight + Number(item['totalWeight']);
			_totalWeightAmount = _totalWeightAmount + Number(item['totalWeightAmount']);
		});
		this.grandTotalTransaction['packetTaken'] = _packetTaken;
		this.grandTotalTransaction['totalAmount'] = _totalAmount;
		this.grandTotalTransaction['amountPaid'] = _amountPaid;
		this.grandTotalTransaction['totalDropPrice'] = _totalDropPrice;
		this.grandTotalTransaction['totalWeight'] = _totalWeight;
		this.grandTotalTransaction['totalWeightAmount'] = _totalWeightAmount;

		//this.total_amount_due = _totalAmount + _totalWeightAmount - _amountPaid;
	}

	calculateTotalDropPrice(){
		let profile = this.profiles[0];
		this.priceConfig['totalDropPrice'] = Number(profile['noOfPacket']) * this.priceConfig['dropPrice'];
	}

	calculateTotalPackets(profiles){
		let totalPackets = 0;
		for (let i in profiles) {
			totalPackets = totalPackets + Number(profiles[i].noOfPacket);
		}
		return totalPackets;
	}

	calculatePacketsTaken(transactions){
		let packetTaken = 0;
		for (let i in transactions) {
			packetTaken = packetTaken + Number(transactions[i].packetTaken);
		}
		return packetTaken;
	}

	transactionHimselfForm: boolean = false;
	transactionVyapariForm: boolean = false;
	searchForm: boolean = true;

	showTransactionHimselfForm(){
		this.showProfile = false;
		this.transactionHimselfForm = true;
		this.transactionVyapariForm = false;
		this.searchForm = false;
	}

	showTransactionVyapariForm(){
		this.showProfile = false;
		this.transactionVyapariForm = true;
		this.transactionHimselfForm = false;
		this.searchForm = false;
	}

	close(){

	}
	
	ngOnInit() {
		if(this.dataservice['slipNumber']){
			this.fetchProfileById(this.dataservice['slipNumber']);
			delete this.dataservice['slipNumber'];
		}
	}

}

