import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CardModule } from "src/app/shared/component/card/card.module";
import { DarkenOnHoverModule } from "src/app/shared/directive/darken-on-hover/dark-on-hover.module";
import { PhotoModule } from "../photo/photo.module";
import { FilterByDescriptionPipe } from "./filter-by-description.pipe";
import { LoadButtonComponent } from "./load-button/load-button.component";
import { PhotoListComponent } from "./photo-list.component";
import { PhotosComponent } from "./photos/photos.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
    declarations: [
        PhotosComponent,
        LoadButtonComponent,
        PhotoListComponent,
        FilterByDescriptionPipe,
        SearchComponent
    ],
    imports: [PhotoModule, CommonModule, CardModule, DarkenOnHoverModule, RouterModule]
})
export class PhotoListModule{ }