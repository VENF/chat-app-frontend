<template>
  <div id="home">
    <Navbar :userName="user.userName"></Navbar>
    <Users :users="usersConnected"></Users>
    <div class="content">
      <Account v-if="accountState === true" :username="user.userName" :email="user.email" ></Account>
      <Chat v-if="chatState === true" :userName="user.userName"></Chat>
    </div>
  </div>
</template>

<style scoped>
#home{
  height: 100vh;
  display: grid;
  grid-template-columns: 200px 270px 3fr;
}
.content{
  background: rgba(170, 153, 240, 0.1);
}
.content-users{
  background: rgba(103,68,236,.1);
}
@media (max-width: 800px){
  #home{
    grid-template-columns: 1fr;
    grid-template-rows: .3fr  .2fr 1fr;
  }
}
</style>

<script>
import Navbar from '../components/Navbar'
import Users from '../components/Users'
import Account from '../components/Account'
import Chat from '../components/Chat'
import { mapState } from 'vuex'
import io from 'socket.io-client';

export default {
  name: 'Home',
  components:{
    Navbar,
    Users,
    Account,
    Chat
  },
  data() {
    return {
      socket : io('http://localhost:4000'),
      usersConnected: [],
      user: {},
      active: false
    }
  },
  computed: {
    ...mapState(['chatState', 'accountState'])
  },
  beforeCreate() {
    let token = localStorage.getItem('token');
    if(!token){
        this.$router.push('/');
    }
  },
  created() {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    this.axios.get('/home', config)
      .then(res => {
        this.user = res.data.user;
        this.socket.emit('NEW:USER', res.data.user, (data) => {
          this.usersOn();
        })
      })
      .catch(err => {
          localStorage.removeItem('token');
          this.$router.push('/');
      })
  },
  methods: {
    usersOn(){
      this.socket.on('USERS', (data) => {
        this.usersConnected = data;
      })
    }
  },
}
</script>
