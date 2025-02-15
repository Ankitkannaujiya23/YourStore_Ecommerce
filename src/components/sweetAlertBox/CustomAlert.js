import Swal from 'sweetalert2';

export const PopupAlertBox=(alertData)=>{
    const{isSuccess, message, timer}=alertData ?? {};
    Swal.fire({
        position: "top-end",
        icon: isSuccess ? "success":"error",
        title: message,
        showConfirmButton: false,
        timer: timer
      });
}


