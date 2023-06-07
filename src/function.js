import Swal from "sweetalert2";
import axios from "axios";

export function showAlert(title,icon,foco=''){
    if(foco!=''){
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title:title,
        icon:icon,
        customClass:{
            confirmButton:'btn btn-primary',
            popup:'animated zoonIn'
        },
        buttonsStyling:false
    });
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
  }).then( (res)=>{
    if(res.isConfirmed){
        send('DELETE',{id:id},urlApi,'has been removed');
    }else{
        showAlert('operation cancelled','info');
    }
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
    }).then( function(resp){
        if(resp.status == 200){
            showAlert(messaje,'success');
            window.setTimeout( function() {
                window.location.href = location
            },2000);
        }else{
            showAlert('Server not available','error');
        }
    } ).catch( function(error){
        showAlert('Error when saving data','error');
    });
}