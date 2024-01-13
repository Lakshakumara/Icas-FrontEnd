import Swal from "sweetalert2";
import { FormControl } from '@angular/forms';

export class Utils {
    static numberValidator(control: FormControl) {
        if (isNaN(control?.value)) {
          return {
            number: true
          }
        }
        return null;
      }

    static get today(): Date {
        return new Date();
    }
    static get threeMonthbeforetoday(): Date {
        const d: Date = new Date();
        d.setMonth(d.getMonth() - 3);
        return d;
    }

    static currentYear = new Date().getFullYear();
    static nextYear = (new Date().getFullYear()) + 1;

    /* static popMassage(title: any){
         this.popMassage(title, null);
     }*/
    static popMassage(title: any, footer: any) {
        Swal.fire({
            icon: 'info',
            title: 'ICAS',
            text: JSON.stringify(title),
            footer: `<a href="">${JSON.stringify(footer)}</a>`
        });
    }

    static notify(title: any,){
        /*
        'top'
    | 'top-start'
    | 'top-end'
    | 'top-left'
    | 'top-right'
    | 'center'
    | 'center-start'
    | 'center-end'
    | 'center-left'
    | 'center-right'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'bottom-left'
    | 'bottom-right'
    */
        Swal.fire({
            position: "top-end",
            /*
            'success' | 'error' | 'warning' | 'info' | 'question'
            */
            icon: "success",
            title: title,
            showConfirmButton: false,
            timer: 1500
          });
    }
}