<template>
  <div class="container mt-5">
    <div class="card">
    <div class="card-body">
      <h4><i class="fab fa-buromobelexperte"></i> Associate Rooms {{ this.name }}</h4>
    </div>
  </div>
  <br>
  <div class="card">
  <div class="card-body">
    <form @submit="saveRoomHotel">
        <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <select v-model="room_id" name="room" id="room" class="form-control">
                <option v-for="item, i in this.data" v-bind:value="item.id" v-text="item.name"></option>
              </select>
            </div>
            <div class="text-danger">{{ RoomError }}</div>
        </div>
        
        <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <input type="number" v-model="amount" id="amount" placeholder="amount" maxlength="20" class="form-control">
            </div>
            <div class="text-danger">{{ amountError }}</div>
        </div>

        <div class="grid col-6 mx-auto mb-3">
            <div class="input-group">
              <router-link class="btn btn-secondary" to="/AdminHotel"><i class="fas fa-backward"></i> Back</router-link>
              <button type="submit" class="btn btn-primary"><i class="far fa-save"></i> Create Room</button>
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
  import { useRoute } from "vue-router";
  export default{
    
    data(){
      return{
       name:null,
       data:null,
       room_id:null,
       amount:null,
       amountError:null,
       RoomError:null,
       id:0,
       urlRoomHotel:'http://127.0.0.1:8001/api/v1/roomhotel', //Guarda en la tabla room_hotel
       urlHotel:'http://127.0.0.1:8001/api/v1/hotels',
       urlRoom:'http://127.0.0.1:8001/api/v1/rooms', //Consulta la tabla rooms
      }
    },
    mounted(){
      const route = useRoute();
      this.id = route.params.id;
      this.urlHotel += '/'+this.id;

      axios.get(this.urlHotel).then(resp =>{
        if(resp.status == 200){
          this.name = resp.data.data.name;
        }
      });

      axios.get(this.urlRoom).then(resp =>{
        if(resp.status == 200){
          this.data = resp.data.data;
        }
      })

    },
    methods:{
      saveRoomHotel(){
        event.preventDefault();
        if(this.room_id == null){
          this.RoomError = 'Room cannot be empty'
        }

        if(this.amount == null){
          this.amountError ='Amaunt cannot be empty'
        }

        if(this.room_id != null && this.amount != null){
          let param = {
            hotel_id:this.id,
            room_id:this.room_id,
            amount:this.amount
          }
          send('POST',param,this.urlRoomHotel,'registered room','/CreateRoom/'+this.id)
        } 
      }
    },
  }

</script>
  