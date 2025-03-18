import Swal from "sweetalert2";

//custom toast sweetAlert2
const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export const toastFire = (title) => {
    toast.fire({
        icon: "success",
        title: title,
        background: "#374151",
        color: "#fff",
    });
};

export const toastFireFailed = (title) => {
    toast.fire({
        icon: "error",
        title: title,
        background: "#374151",
        color: "#fff",
    });
};
