<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h4><i class="fas fa-hotel"></i> Administration Hotels</h4>
      </div>
    </div>
    <div class="row">
    <div class="col-lg-12 col-md-12">
      <div class="table-responsive mt-5">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Nit</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Created</th>
              <th>Update</th>
              <th>View</th>
              <th>Edit</th>
              <th>Rooms</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="content">
            <tr v-if="this.loading">
              <td colspan="13"><i class="fas fa-spinner"></i></td>
            </tr>
            <tr v-else v-for="hotel, i in this.hotels" :key="hotel.id">
              <td v-text="(i+1)"></td>
              <td v-text="hotel.id"></td>
              <td v-text="hotel.name"></td>
              <td v-text="hotel.address"></td>
              <td v-text="hotel.nit"></td>
              <td v-text="hotel.email"></td>
              <td v-text="hotel.phone"></td>
              <td v-text="hotel.amount"></td>
              <td v-text="new Date(hotel.created_at).toLocaleDateString()"></td>
              <td v-text="new Date(hotel.updated_at).toLocaleDateString()"></td>
              <td><router-link :to="{path:'ShowHotel/'+hotel.id}" class="btn btn-outline-dark"><i class="fas fa-eye"></i></router-link></td>
              <td><router-link :to="{path:'UpdateHotel/'+hotel.id}" class="btn btn-outline-dark"><i class="fas fa-pencil-alt"></i></router-link></td>
              <td><router-link :to="{path:'CreateRoom/'+hotel.id}" class="btn btn-outline-dark"><i class="fas fa-plus-square"></i></router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>    
  </div>
</template>

<script>
import { showAlert } from '@/function';
import axios from 'axios';
export default{
  data(){
    return{
      data:'http://127.0.0.1:8001/api/v1/hotels',
      hotels:null,
      loading:false
    }
  },
  methods:{
    getHotels(){
      this.loading = true
      axios.get(this.data).then(
        response => {
          if(response.status == 200){
            this.hotels = response.data.data;
            this.loading = false;
          }
          
        }).catch((error) => {
          showAlert(error.message)
        })
    }
  },
  mounted(){
    this.getHotels()
  },
}
</script>