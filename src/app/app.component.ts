import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularSearchLocation';
  results = [];
  searchForm: FormGroup;
  searchitem: any = '';
  searchedItemList: any = [];
  constructor(private http: HttpClient, private formBuilder: FormBuilder){
    this.searchForm = this.formBuilder.group({
      searchinput: new FormControl('', [Validators.required]),
    });
  }
  search(term: any){
    console.log(term);
    if(term !== ''){
    this.http.get('https://randomuser.me/api/?nat=' + term).toPromise().then((data: any) => {
      console.log(data);
      if (data.results) {
      this.searchitem = ''
      this.results = data.results;
      this.searchitem = data.results[0].location.country;
      let itemObj = {name: term, location:this.searchitem};
      this.searchedItemList.push(itemObj);
      }
    }).catch((error: any) => {
      console.log(error);
      alert('No search result found.');
    })
  }
  }
}
