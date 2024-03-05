import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ShoppingListRoutesModule } from "./shopping-list-routes.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule,
        FormsModule,
        CommonModule,
        ShoppingListRoutesModule
    ],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ]
})

export class ShoppingListModule { }