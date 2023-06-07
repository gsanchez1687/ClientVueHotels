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
              <th>total number of rooms</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="this.loading">
              <td colspan="8"><i class="fas fa-spinner"></i></td>
            </tr>
            <tr v-else v-for="item, i in this.data" :key="item.id">
              <td v-text="item.name"></td>
              <td v-text="item.address"></td>
              <td v-text="item.city"></td>
              <td v-text="item.nit"></td>
              <td v-text="item.phone"></td>
              <td v-text="item.email"></td>
              <td v-text="item.amount"></td>
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
          this.data = resp.data.data;
          this.loading = false
        }
      });
    },
})

</script>