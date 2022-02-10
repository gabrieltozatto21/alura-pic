import { Directive, ElementRef, OnInit } from "@angular/core";
import { PlataformService } from "src/app/core/plataform/plataform.service";

@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

    constructor(private element: ElementRef<any>, private plataformDetector: PlataformService){

    }
    ngOnInit(): void {
        this.plataformDetector.isPlatformBrowser() &&
            this.element.nativeElement.click();
    }
}