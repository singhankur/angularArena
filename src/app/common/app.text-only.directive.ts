import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ngText]'
})
export class TextOnlyDirective {

  constructor() { }

  @HostListener('keypress') onkeypress(e){
  	let event = e || window.event;
    if(event){
  	  return this.isTextKey(event);
    }
  }

  isTextKey(event){
     let charCode = (event.which) ? event.which : event.keyCode;
     if(((charCode > 64) && (charCode < 91))  || ((charCode > 96) && (charCode < 123)) || (charCode === 32)){
        return true;
     }
     return false;
  }
}
