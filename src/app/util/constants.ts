import Swal from "sweetalert2";

export class Constants{
    static CATEGORY_OPD: string="OPD";
    static CATEGORY_SHE: string="Surgical & Hospital Expenses"

    static claimTypes: string[] = ['In Patient benefits', 'Out Patient benefits', 'Personal Accidents', 'Spectacles', 'Critical Illness'];
    static relationShip: string[] = ['Father', 'Mother','Spouce','Daughter', 'Son', 'Brother', 'Sister'];
    static claimCategory: string[] = ['ALL',Constants.CATEGORY_OPD, Constants.CATEGORY_SHE];
    
    static CLAIMSTATUS_PENDING: string="pending";
    static CLAIMSTATUS_MEDICAL_DECISION_PENDING: string="mec";
    static CLAIMSTATUS_MEDICAL_DECISION_APPROVED: string="mec_approved";


    static Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
}