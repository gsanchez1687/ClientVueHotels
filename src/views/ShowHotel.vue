<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h4><i class="fas fa-store"></i> Hotel</h4>
      </div>
    </div>
    <br>
    <div class="card">
      <div class="card-body">
        <table class="table table-responsive">
          <thead>
            <tr>
              <th>Name Hotel</th>
              <th>Address</th>
              <th>City</th>
              <th>Nit</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Total number of rooms</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="this.loading">
              <td colspan="8"><i class="fas fa-spinner"></i></td>
            </tr>
            <tr v-else>
              <td v-text="this.data_name"></td>
              <td v-text="this.data_address"></td>
              <td v-text="this.data_city"></td>
              <td v-text="this.data_nit"></td>
              <td v-text="this.data_phone"></td>
              <td v-text="this.data_email"></td>
              <td v-text="this.data_amount"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br>
    <div class="card">
      <div class="card-body">
        <h4><i class="fas fa-warehouse"></i> Rooms</h4>
      </div>
    </div>
    <br>
    <div class="card">
      <div class="card-body">
        <table class="table table-responsive">
          <thead>
            <tr>
              <th>Total number of room</th>
              <th>Type Room</th>
              <th>Accommodation</th>
            </tr>
          </thead>
            <tbody>
              <tr v-if="this.loading">
                <td colspan="8"><i class="fas fa-spinner"></i></td>
              </tr>
              <tr v-else v-for="item, i in this.data" :key="item.id">
              <td v-text="item.rhamount"></td>
              <td v-text="item.nameroom"></td>
              <td v-text="item.accommodation"></td>
            </tr>
            </tbody>
        </table>
        <router-link class="btn btn-secondary" to="/AdminHotel"><i class="fas fa-backward"></i> Back</router-link>
      </div>
    </div>

  </div>   
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";

export default({
  data(){
      return{
       data:null,
       data_name:null,
       data_address:null,
       data_city:null,
       data_nit:null,
       data_phone:null,
       data_email:null,
       data_amount:null,
       loading:false,
       urlRoomHotel:'http://127.0.0.1:8001/api/v1/gethotel',
      }
    },
    mounted(){
      this.loading = true
      const route = useRoute();
      this.id = route.params.id;
      this.urlRoomHotel += '/'+this.id;

      axios.get(this.urlRoomHotel).then(resp =>{
        if(resp.status == 200){
          this.data = resp.data.data
          if(resp.data.data[0]){
            this.data_name = resp.data.data[0].name;
            this.data_address = resp.data.data[0].address;
            this.data_city = resp.data.data[0].city;
            this.data_nit = resp.data.data[0].nit;
            this.data_phone = resp.data.data[0].phone;
            this.data_email = resp.data.data[0].email;
            this.data_amount = resp.data.data[0].amount;
          }
          this.loading = false
        }
      });
    },
})
</script>