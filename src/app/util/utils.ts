import Swal from "sweetalert2";

export class Utils {
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
}