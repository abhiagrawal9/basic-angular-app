import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropDownDirective {
  // My solution

  // constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  // @HostListener('click')
  // toggleOpenClass(event: Event): void {
  //   if (!this.elementRef.nativeElement.classList.contains('open')) {
  //     this.renderer.addClass(this.elementRef.nativeElement, 'open');
  //   } else {
  //     this.renderer.removeClass(this.elementRef.nativeElement, 'open');
  //   }
  // }

  // @HostBinding('class.open')
  // isOpen = false;

  // @HostListener('click')
  // toggleOpenClass(event: Event): void {
  //   this.isOpen = !this.isOpen;
  // }

  // closing dropdown by clicking anywhere in the view
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event): void {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
}
