<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h4><i class="far fa-save"></i> Create Hotels</h4>
      </div>
    </div>
    <br>
    <div class="card">
      <div class="card-body">
        <form @submit="saveHotel">

          <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <input type="text" v-model="name" id="name" placeholder="Name" maxlength="100" class="form-control">
            </div>
            <div class="text-danger">{{ nameError }}</div>
          </div>

          <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <input type="text" v-model="address" id="address" placeholder="Address" maxlength="1000" class="form-control">
            </div>
            <div class="text-danger">{{ addressError }}</div>
          </div>

          <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <input type="text" v-model="nit" id="nit" placeholder="Nit" maxlength="20" class="form-control">
            </div>
            <div class="text-danger">{{ nitError }}</div>
          </div>

          <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <input type="text" v-model="email" id="email" placeholder="email" maxlength="100" class="form-control">
            </div>
            <div class="text-danger">{{ emailError }}</div>
          </div>

          <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <input type="text" v-model="phone" id="phone" placeholder="phone" maxlength="20" class="form-control">
            </div>
            <div class="text-danger">{{ phoneError }}</div>
          </div>

          <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <input type="number" v-model="amount" id="amount" placeholder="amount" maxlength="20" class="form-control">
            </div>
            <div class="text-danger">{{ amountError }}</div>
          </div>

          <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <select v-model="city_id" name="city_id" id="city_id" class="form-control">
                <option v-for="item, i in this.data" v-bind:value="item.id" v-text="item.name"></option>
              </select>
            </div>
            <div class="text-danger">{{ cityError }}</div>
          </div>

          <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <router-link class="btn btn-secondary" to="/AdminHotel"><i class="fas fa-backward"></i> Back</router-link>
              <button type="submit" class="btn btn-primary"><i class="far fa-save"></i> Create Hotel</button>
            </div>
          </div>

        </form>
      </div>
    </div>

  </div>
  </template>

<script>
  import axios from "axios";
  import { showAlert, send } from "../function.js"
  export default{
    
    data(){
      return{
        ApiCreateHotel:'http://127.0.0.1:8001/api/v1/hotels',
        ApiGetCity:'http://127.0.0.1:8001/api/v1/city',
        data:null,
        city_id:null,
        loading:false,
        name:null,
        address:null,
        nit:null,
        email:null,
        phone:null,
        amount:null,
        nameError:null,
        addressError:null,
        nitError:null,
        emailError:null,
        phoneError:null,
        amountError:null,
        cityError:null
      }
    },
    mounted() {
          axios.get(this.ApiGetCity).then(resp =>{
          if(resp.status == 200){
            this.data = resp.data.data;
          }
          }).catch((error) => {
            showAlert(error.message)
          })
      },
    methods:{
      saveHotel(){
        event.preventDefault();
        this.validateHotel();
        if(this.name != null && this.address != null && this.nit != null && this.email != null &&  this.phone != null && this.amount != null){
          let param = {
            city_id:this.city_id,
            department_id:1,
            name:this.name,
            address:this.address,
            nit:this.nit,
            email:this.email,
            phone:this.phone,
            amount:this.amount,
            status:1
          }
          send('POST',param,this.ApiCreateHotel,'The hotel has been registered','/AdminHotel');
        }
      },
      validateHotel(){
        if(this.name == null){
          this.nameError ='Name cannot be empty'
        } 
        if(this.address == null){
          this.addressError = 'Addres cannot be empty'
        }
        if(this.nit == null){
          this.nitError = 'Nit cannot be empty'
        }
        if(this.email == null){
          this.emailError = 'Email cannot be empty'
        }
        if(this.phone == null){
          this.phoneError = 'Phone cannot be empty'
        }
        if(this.amount == null){
          this.amountError = 'Amount cannot be empty'
        }
        if(this.city_id == null){
          this.cityError = 'City cannot be empty'
        }
      }
    }
  }

</script>
  