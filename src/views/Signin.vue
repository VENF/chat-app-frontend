<template>
    <div id="signin">
        <div class="content-left">
           <img src="../assets/logo.svg" alt="BlirtChat" class="logo">
           <h1>Blirt Chat</h1>
        </div>
        <div class="content-right">
            <div class="form">
                <v-alert type="error" color="primary" v-if="alert === true">
                    {{ alertMsg }}
                </v-alert>
                <div class="fields">
                    <v-text-field  label="Your User" v-model="signinData.userName"  outlined></v-text-field>
                    <v-text-field  label="Your Password" v-model="signinData.password" outlined type="password"></v-text-field>
                </div>
                <div class="actions">
                    <v-btn color="primary" block elevation="0" @click="signin()">Signin</v-btn>
                    <router-link to="/signup">
                        <v-btn color="primary" block elevation="0">Signup</v-btn>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#signin{
    height: 100vh;
    display: grid;
    grid-template-columns: .5fr 1fr;
}
.content-left{
    background: #6744ec;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: #f2f2f2;
}
.content-left .logo{
    width: 30%;
}
.content-left h1{
    font-size: 4rem;
    margin: 20px 0px;
}
.content-right{
    display: flex;
    flex-flow: column;
    justify-content: center;
    background: url('../assets/dec.svg') no-repeat top right rgba(170, 153, 240, 0.1);
    background-size: 40%;
}
.content-right .form{
    padding: 30px;
}
.content-right .fields{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}
.content-right .actions{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}
a{
    text-decoration: none;
}

@media (max-width: 1000px){
    .content-left .logo{
        width: 60%;
    }
    .content-left h1{
        font-size: 3rem;
    }
}
@media (max-width: 700px){
    #signin{
        grid-template-columns: 1fr;
        grid-template-rows: .5fr 1fr;
    }
    .content-left .logo{
        width: 20%;
    }
    .content-left h1{
        font-size: 2rem;
    }   
}
</style>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            alert: false,
            alertMsg: '',
            signinData: {
                userName: '',
                password: '',
            }
        }
    },
    beforeCreate() {
        let token = localStorage.getItem('token');
        if(token){
            this.$router.push('/home');
        }
    },
    methods: {
        signin(){
            let userName = this.signinData.userName.replace(/ /g, '');
            let password = this.signinData.userName.replace(/ /g, '');
            if(userName === '' || password === ''){
                this.alert = true;
                this.alertMsg = 'Empty fields',
                this.alertState();
                return false
            }else{
                this.axios.post('/signin', {
                    userName: this.signinData.userName,
                    password: this.signinData.password
                })
                    .then(res => {
                        localStorage.setItem('token', res.data.token);
                        this.$router.push('/home')
                    })
                    .catch(err => {
                        this.alert = true;
                        this.alertMsg = err.response.data.msg;
                        this.alertState();
                    })
            }
        },
        alertState(){
            setTimeout(() => {
                this.alert = false;
            },3000);
        },
    },
}
</script>