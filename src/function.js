import Swal from "sweetalert2";
import axios from "axios";

export function showAlert(title,icon,location){
    
    Swal.fire({
        title:title,
        icon:icon,
        customClass:{
            confirmButton:'btn btn-primary',
            popup:'animated zoonIn'
        },
        buttonsStyling:false
    }).then( (response) => {
        if(response.isConfirmed){
            window.location.href = location
        }
    })
}

export function ConfirmAlert(url,id,tit,ico,message){
  let urlApi = url+id;
  const SwalBoostrap = Swal.mixin({
    customClass:{
        confirmButton:'btn btn-primary me-3',
        cancelButton:'btn btn-danger'
    }
  });

  SwalBoostrap.fire({
    title:tit,
    text:message,
    icon:'question',
    showCancelButton:true,
    confirmButtonText:'<i class="fas fa-check"></i> Yes, Delete',
    cancelButtonText:'<i class="fas fa-ban"></i> Cancel'
  }).then( (response)=>{
    if(response.isConfirmed){
        send('DELETE',{id:id},urlApi,'has been removed');
    }else{
        showAlert('operation cancelled','info');
    }
  }).catch((error) => {
    showAlert(error.message)
  })

  Swal.fire({
    title:tit,
    icon:ico,
    customClass:{
        confirmButton:'btn btn-primary',
        popup:'animated zoonIn'
    },
    buttonsStyling:false
  });
}

export function send(method,param,url,messaje,location = '/AdminHotel'){
    axios({
        method:method,
        url:url,
        data:param
    }).then( function(response){
        if(response.status == 200){
            showAlert(messaje,'success',location);
        }else{
            showAlert('Server not available','error',location);
        }
    }).catch((error) => {
        showAlert(error.message)
    });
}