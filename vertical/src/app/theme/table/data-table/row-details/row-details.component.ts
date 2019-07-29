import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-row-details',
  templateUrl: './row-details.component.html',
  styleUrls: [
    './row-details.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class RowDetailsComponent implements OnInit {
  @ViewChild('myTable') table: any;

  public rows: any[] = [];
  public expanded: any = {};
  public timeout: any;

  rowsFilter = [];
  tempFilter = [];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
      this.tempFilter = [...data];
    });
  }

  ngOnInit() {}

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    //const temp = this.tempFilter.filter(function(d) {
    //  return d.volume.toLowerCase().indexOf(val) !== -1 || !val;
    //});

    const temp = this.tempFilter.filter(function(d) {
      return d.volume.toString().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

}
