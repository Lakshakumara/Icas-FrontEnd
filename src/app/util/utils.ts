import Swal from "sweetalert2";

export class Utils{
    static get today():Date{
    return new Date();
    }
    static currentYear = new Date().getFullYear();
    static nextYear = (new Date().getFullYear()) + 1;

   /* static popMassage(title: any){
        this.popMassage(title, null);
    }*/
    static popMassage(title: any, footer:any){
        Swal.fire({
            icon: 'info',
            title: 'ICAS',
            text: JSON.stringify(title),
            footer: `<a href="">${JSON.stringify(footer)}</a>`
          });
    }
}