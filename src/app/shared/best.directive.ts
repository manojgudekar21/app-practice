import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBest]'
})
export class BestDirective {

  @HostBinding('class.open') clickedopen:boolean=false

  constructor() { }

  @HostListener('click') Clicked(){
    this.clickedopen = !this.clickedopen
  }

}
