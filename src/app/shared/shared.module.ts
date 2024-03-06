import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { BestDirective } from "./best.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        BestDirective,
        LoadingSpinnerComponent,
        AlertComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        BestDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        CommonModule
    ]
})

export class SharedModule { }