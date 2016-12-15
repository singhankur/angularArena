import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

declare var google:any;

@Component({
  selector: 'app-year-wise-pattern',
  templateUrl: 'year-wise-pattern.component.html'
})
export class YearWisePatternComponent implements OnInit {
  private static googleLoaded:any;
  arrayForBarGraph: any[];

  constructor(public dashboardservice: DashboardService, private router: Router, private route: ActivatedRoute) {
  }

  @Output() showDashboard = new EventEmitter();

 // _priceConst = this.dashboardservice.priceConstants;

  gotoDashboardAccount(){
      this.showDashboard.emit({value: true});
  }

  createDateCall(date, name){
    let transactionObj = {
          startDate: date,
          session_id: ""
        },
        _id;

    if (date) {
      switch(name) {
        case "chart1-date": _id = "columnchart_values1";
          this.dashboardservice.packetGraphLastSevenDays(transactionObj)
            .subscribe(response=> this.selectedDateGraph(response, _id));
          break;
        case "chart2-date": _id = "columnchart_values2";
          this.dashboardservice.packetGraphPerDay(transactionObj)
            .subscribe(response=> this.selectedDateGraph(response, _id));
          break;
        case "chart3-date": _id = "columnchart_values3";
          this.dashboardservice.revenueGraphLastSevenDays(transactionObj)
            .subscribe(response=> this.selectedDateGraph(response, _id));
          break;
        case "chart4-date": _id = "columnchart_values4";
          this.dashboardservice.revenueGraphPerDay(transactionObj)
            .subscribe(response=> this.selectedDateGraph(response, _id));
          break;
        default: _id = null;
          break;
      }
    }
  }

  selectedDateGraph(res, id){
    let _processData = res;

    this.drawChart(_processData, id);
  }

  drawChart(processData, ID) {
    let givenData = processData || [{"00:00-Hrs": "0.0"}],
        mappedArr;
    
    mappedArr = this.arrayForBarGraph = [["Element", "Value", { role: "style" } ]];
    if (givenData) {
      givenData.map(function(item,index){
        if(index%2 == 0){
          mappedArr.push([Object.keys(item)[0],parseInt(item[Object.keys(item)[0]]),"#042C61"]);
        }else{
          mappedArr.push([Object.keys(item)[0],parseInt(item[Object.keys(item)[0]]),"#f1efeb"]);
         }
      });
    }

    let data, view, options, chart;
        data = google.visualization.arrayToDataTable(this.arrayForBarGraph);
        view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);
        options = {
          title: "",
          width: 1800,
          height: 400,
          bar: {groupWidth: "95%"},
          legend: { position: "none"},
        };
        chart = new google.visualization.ColumnChart(document.getElementById(ID));
        chart.draw(view, options);
  }


  ngOnInit() {
    if(!YearWisePatternComponent.googleLoaded) {
      YearWisePatternComponent.googleLoaded = true;
      google.charts.load('current',  {packages: ['corechart', 'bar']});
    }
    google.charts.setOnLoadCallback(() => this.drawChart(null, "columnchart_values1"));
    google.charts.setOnLoadCallback(() => this.drawChart(null, "columnchart_values2"));
    google.charts.setOnLoadCallback(() => this.drawChart(null, "columnchart_values3"));
    google.charts.setOnLoadCallback(() => this.drawChart(null, "columnchart_values4"));
  }

}