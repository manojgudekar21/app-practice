import { NgModule } from "@angular/core";
import { EditComponent } from "./recepie-details/edit/edit.component";
import { RecepieDetailsComponent } from "./recepie-details/recepie-details.component";
import { RecepieItemComponent } from "./recepie-list/recepie-item/recepie-item.component";
import { RecepieListComponent } from "./recepie-list/recepie-list.component";
import { RecepiesComponent } from "./recepies.component";
import { StartComponent } from "./start/start.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        RecepiesComponent,
        RecepieDetailsComponent,
        EditComponent,
        RecepieListComponent,
        RecepieItemComponent,
        StartComponent,
    ],
    imports: [RouterModule, ReactiveFormsModule, CommonModule],
    exports: [
        RecepiesComponent,
        RecepieDetailsComponent,
        EditComponent,
        RecepieListComponent,
        RecepieItemComponent,
        StartComponent,
    ]
})

export class RecepiesModule { }