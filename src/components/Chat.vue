<template>
    <div id="chat" :userName="userName">
        <div class="content-top"></div>
        <div class="content-center">
            <div class="message" v-for="message of messages" :key="message.id">
                <div class="user px-5 py-2">
                    <v-avatar size="40">
                        <v-img :src="message.avatar"></v-img>
                    </v-avatar>
                    <span class="mx-4">{{ message.user}}</span>
                </div>
                <div class="img" v-if="message.img != ''">
                    <v-hover>
                        <template v-slot:default="{ hover }">
                        <v-card class="img" >
                            <v-img :src="message.img" aspect-ratio="1"  class="message-img"></v-img>

                            <v-fade-transition>
                            <v-overlay v-if="hover" absolute color="primary">
                                <a :href="message.img"><v-btn color="primary">View</v-btn></a>
                            </v-overlay>
                            </v-fade-transition>
                        </v-card>
                        </template>
                    </v-hover>  
                </div>
                <div class="message-text">
                    <p>
                        {{ message.message }}                       
                    </p>
                </div>
            </div>
        </div>
        <div class="content-end">
            <div class="send">
                <v-btn small fab text class="mx-2" color="primary" @click="send()">
                    <v-icon>mdi-send</v-icon>
                </v-btn>
                <v-textarea class="mx-2" rows="1" rounded dense filled placeholder="Send a Message..." v-model="msg.message"></v-textarea>
                <v-btn small fab text class="mx-2" color="primary">
                    <v-icon> mdi-headset</v-icon>
                </v-btn>
                <v-btn small fab text class="mx-2" color="primary">
                    <v-icon> mdi-image-outline </v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #chat{
        display: grid;
        grid-template-rows: 1fr 5fr 1fr;
        height: 100%;
    }
    .content-top{
        display: flex;
        justify-content: center;
        align-items: center;
        background: url('../assets/logo.svg') no-repeat left #6744ec;
        background-size: 20%;
    }
    .content-center{
        overflow-y: scroll;
        max-height: 600px;
    }
    .message{
        margin: 10px 0px;
    }
    .message-text{
        padding-left: 5em;
    }
    .message-text p{
        display: inline-block;
        padding: 15px;
        border-radius: 0px 20px 20px 20px;
        background: #6744ec;
        color: #f2f2f2;
        margin-right: 10px;
    }
    .img{
        border-radius: 0px 10px 10px 0px;
        max-width: 400px;
        min-height: 300px;
        max-height: 500px;
        position: relative;
        left: 40px;
    }
    .message-img{
        border-radius: 0px 10px 10px 0px;
    }
    .content-end{
        display: grid;
        align-items: center;
        background: rgba(170, 153, 240, 0.1);
    }
    .send{
        display: flex;
    }
    .logo{
        width: 20px;
    }
    .content-center::-webkit-scrollbar {
            width: 4px;   
            height: 4px;
    }
    .content-center::-webkit-scrollbar-thumb {
        background: rgba(32, 29, 46, 0.1);
        border-radius: 4px;
    }
    .content-center::-webkit-scrollbar-thumb:hover {
        background: #6744ec; 
    }
    .content-center::-webkit-scrollbar-thumb:active {
        background: #6744ec; 
    }
    .content-center::-webkit-scrollbar-track {
        background: rgba(72, 66, 97, 0.1);
        border-radius: 4px;
    }
    @media (max-width: 800px){
        #chat{
           grid-template-rows:  5fr 1fr; 
        }
        .content-top{
            display: none;
        }
        .content-center{
            max-height: 430px;
        }
    }
</style>

<script>
import io from 'socket.io-client';
export default {
    name: 'Chat',
    props: {
        userName:{
            type: String,
            default: 'none'
        }
    },
    data() {
        return {
            overlay: false,
            socket : io('http://localhost:4000'),
            msg: {
                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                username: '',
                message: '',
                img: ''
            },
            messages: [],
        }
    },
    created() {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.axios.get('messages', config)
            .then(res => {
                this.messages = res.data.messages;
            })
    },
    methods: {
        send(){
            this.msg.username = this.userName;
            this.socket.emit('NEW:MSG', this.msg, (data) => {
                this.messagesAll();
            })
        },
        messagesAll(){
            this.socket.on('MESSAGES', (data) => {
                this.messages = data;
                this.msg.message = '';
            })
        }
    },
}
</script>