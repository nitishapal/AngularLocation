import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularSearchLocation';
  results = [];
  searchForm: FormGroup;
  searchitem: any = 'Placeholder for the Data returned from the API';
  searchedItemList: any = [];


  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[0].data[tooltipItems.index] + ' %';
        }
      }
    },
  };


  constructor(private http: HttpClient, private formBuilder: FormBuilder){
    this.searchForm = this.formBuilder.group({
      searchinput: new FormControl('', [Validators.required]),
    });
  }

  // tslint:disable-next-line:member-ordering
  pieChartLabels: Label[] = ['AU', 'FR', 'GB', 'Others'];

  // tslint:disable-next-line:member-ordering
  pieChartData: number[] = [0, 0, 0, 0];

  // tslint:disable-next-line:member-ordering
  pieChartType: ChartType = 'pie';

  // tslint:disable-next-line:member-ordering
  pieChartLegend = true;

  // tslint:disable-next-line:member-ordering
  pieChartPlugins = [];

  // tslint:disable-next-line:member-ordering
  pieChartColors = [
    {
      backgroundColor: ['#e6de10', '#47ba32', '#b025cc', '#de1021'],
    },
  ];


  search(term: any){
    console.log(term);
    if(term !== ''){
    this.http.get('https://randomuser.me/api/?nat=' + term).toPromise().then((data: any) => {
      console.log(data);
      if (data.results) {
      this.searchitem = ''
      this.results = data.results;
      this.searchitem = data.results[0].location.country;
      let itemObj = {name: term, location: this.searchitem};
      this.searchedItemList.push(itemObj);
      if (term.toUpperCase() === 'AU') {
        this.pieChartData[0] = this.pieChartData[0] + 1;
      } else if (term.toUpperCase() === 'FR') {
        this.pieChartData[1] = this.pieChartData[1] + 1;
      } else if (term.toUpperCase() === 'GB') {
        this.pieChartData[2] = this.pieChartData[2] + 1;
      } else {
        this.pieChartData[3] = this.pieChartData[3] + 1;
      }
      this.pieChartData = [...this.pieChartData];
      }
    }).catch((error: any) => {
      console.log(error);
      alert('No search result found.');
    })
  }
  }




}
