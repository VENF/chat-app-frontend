<template>
    <div id="navbar" :userName="userName">
        <div class="user-info">
            <v-badge bordered bottom color="deep-purple accent-4" dot offset-x="10" offset-y="10">
                <v-avatar size="40">
                    <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-avatar>
            </v-badge>
            <p> {{ userName }} </p>
        </div>
        <v-divider class="divider"></v-divider>
        <div class="options">
            <div class="item">
                <v-btn text dark block ><v-icon>mdi-account-group</v-icon>Users</v-btn>
            </div>
            <div class="item">
                <v-btn text dark block @click="chat()">  <v-icon>mdi-comment-multiple</v-icon> Chat</v-btn>
            </div>
            <div class="item">
                <v-btn text dark block @click="account()" ><v-icon>mdi-account</v-icon> Account</v-btn>
            </div>
            <div class="item">
                <v-btn text dark block ><v-icon>mdi-notebook-outline</v-icon>List</v-btn>
            </div>
            <div class="item">
                <v-btn text dark block  @click="logout()"> <v-icon>mdi-export</v-icon>Logout</v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped>
#navbar{
    background: #6744ec;
}
.user-info{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: #f2f2f2;
    margin: 20px;
}
.options{
    height: 40%; 
    display: grid;
}
@media (max-width: 800px){
    .divider{
        display: none;
    }
    #navbar{
        display: grid;
        grid-template-columns: 0.5fr 1fr;
    }
    .options{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: center;
        overflow-x: scroll;
        height: initial;
    }
    .options::-webkit-scrollbar {
        width: 4px;   
        height: 4px;
    }
    .options::-webkit-scrollbar-thumb {
        background: #6744ec;
        background: -webkit-linear-gradient(to right, #36247e, #6744ec);  
        background: linear-gradient(to right, #36247e, #6744ec);
        border-radius: 4px;
    }

    .options::-webkit-scrollbar-thumb:hover {
        background: #6a3093; 
        background: -webkit-linear-gradient(to right, #a044ff, #6a3093);
        background: linear-gradient(to right, #a044ff, #6a3093);
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }

    .options::-webkit-scrollbar-thumb:active {
        background: #6a3093; 
        background: -webkit-linear-gradient(to right, #a044ff, #6a3093);
        background: linear-gradient(to right, #a044ff, #6a3093);
    }
    .options::-webkit-scrollbar-track {
        background: #36247e;
        border-radius: 4px;
    }
}
</style>

<script>
import { mapMutations, mapState } from 'vuex'
import io from 'socket.io-client';
export default {
    props: {
        userName: {
            tye: String,
            default: 'box'
        },
        avatar: {
            type: String,
            default: 'sdas'
        }
    },
    name: 'Navbar',
    data() {
        return {
            socket : io('http://localhost:4000'),
        }
    },
    methods: {
        ...mapMutations(['chatM', 'accountM']),
        chat(){
            this.chatM();
        },
        account(){
            this.accountM();
        },
        logout(){
            this.socket.emit('DISCONNECT', this.userName, (data) => {
                localStorage.removeItem('token');
                this.$router.push('/');
            })
        }
    },
}
</script>