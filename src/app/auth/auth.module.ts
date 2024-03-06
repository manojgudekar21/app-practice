import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
    AuthComponent
    ],
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: [
        AuthComponent,
        FormsModule,
        CommonModule
    ]
})
export class AuthModule{}