import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from '../../photo/photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnChanges {
  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['photos'].currentValue){
      this.rows = this.groupColumns(changes['photos'].currentValue);
    }
  }
  
  groupColumns(photos: Photo[]): any[] {
    const newRows = [];

    for (let i = 0; i < photos.length; i += 3) {
      newRows.push(photos.slice(i, i + 3))
    }

    return newRows;
  }
}
