import Swal from "sweetalert2";

const confirmButton = Swal.mixin({
  customClass: {
    confirmButton: "cursor-pointer bg-green-600 p-1 text-white font-semibold rounded-sm px-8 me-2 border border-green-600 text-sm hover:border-white",
    denyButton: "cursor-pointer bg-red-600 border border-red-600 hover:border-white p-1 text-white font-semibold rounded-sm px-8 text-sm",
  },
  buttonsStyling: false,
});

const confirmButtonFire = (titleText, confirmed, denied) => {
  confirmButton
    .fire({
      title: titleText,
      // background: "#374151 border border-white",
      // border: "1px solid white",
      showDenyButton: true,
      confirmButtonText: "<i class='bi bi-check-circle me-1 text-md'></i>Yes",
      denyButtonText: "<i class='bi bi-x-circle me-1 text-md'></i>No",
      showClass: {
        popup: "animate__animated animate__fadeIn animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut animate__faster",
      },
    })
    .then((result) => {
      if (result.isConfirmed) {
        confirmed();
      } else if (result.isDenied) {
        denied();
      }
    });
};
export default confirmButtonFire;
