<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h4><i class="fab fa-buromobelexperte"></i> Associate Rooms <b>{{ this.name }}</b></h4>
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
    <br>
    <div class="card">
    <div class="card-body">
      <h4><i class="fab fa-buromobelexperte"></i> List Rooms <b>{{ this.name }}</b></h4>
    </div>
    </div>
    <br>
    <div class="card">
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Room Type</th>
            <th>Accommodation</th>
            <th>Created</th>
            <th>updated</th>
          </tr>
        </thead>
        <tbody>
            <tr v-if="this.loading">
              <td colspan="5"><i class="fas fa-spinner"></i></td>
            </tr>
            <tr v-else v-for="room, in this.dataRoom">
              <td v-text="room.amountroom"></td>
              <td v-text="room.nameroom"></td>
              <td v-text="room.accommodation"></td>
              <td v-text="room.roomcreate"></td>
              <td v-text="room.roomupdated"></td>
            </tr>
         </tbody>
      </table>  
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
      loading:false,
       name:null,
       data:null,
       dataRoom:null,
       room_id:null,
       amount:null,
       amountError:null,
       RoomError:null,
       id:0,
       urlRoomHotel:'http://127.0.0.1:8001/api/v1/roomhotel', //Guarda en la tabla room_hotel
       urlHotel:'http://127.0.0.1:8001/api/v1/hotels',
       urlRoom:'http://127.0.0.1:8001/api/v1/rooms', //Consulta la tabla rooms
       urlGetRoomById:'http://127.0.0.1:8001/api/v1/getroom'
      }
    },
    mounted(){
      const route = useRoute();
      this.id = route.params.id;
      this.urlHotel += '/'+this.id;
      this.urlGetRoomById += '/'+this.id;
      this.getHotel()
      this.getRooms()
     this.getRoomById()
    },
    methods:{
        getHotel(){
          axios.get(this.urlHotel).then(resp =>{
          if(resp.status == 200){
            this.name = resp.data.data.name;
          }
        }).catch((error) => {
            showAlert(error.message)
        });
      },
        getRooms(){
          axios.get(this.urlRoom).then(resp =>{
          if(resp.status == 200){
            this.data = resp.data.data;
          }
        }).catch((error) => {
            showAlert(error.message)
        });
      },
      validate(){
        if(this.room_id == null){
          this.RoomError = 'Room cannot be empty'
        }
        if(this.amount == null){
          this.amountError ='Amount cannot be empty'
        }
      },
      saveRoomHotel(){
        event.preventDefault();
        this.validate()
        if(this.room_id != null && this.amount != null){
          let param = {
            hotel_id:this.id,
            room_id:this.room_id,
            amount:this.amount
          }
          send('POST',param,this.urlRoomHotel,'Room registered for the hotel: '+this.name,'/CreateRoom/'+this.id)
        } 
      },
      getRoomById(){
        this.loading = true
        axios.get(this.urlGetRoomById).then(resp =>{
        if(resp.status == 200){
          this.dataRoom = resp.data.data
          this.loading = false
        }
      }).catch((error) => {
          showAlert(error.message)
        })

      },
    },
  }

</script>
  