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
                <v-alert type="success" color="primary" v-if="alertS === true">
                    {{ alertMsgS }}
                </v-alert>
                <div class="fields">
                    <v-text-field  label="Your Name" v-model="signupData.name" outlined></v-text-field>
                    <v-text-field  label="Your Last Name" v-model="signupData.lastName" outlined></v-text-field>
                </div>
                <div class="fields">
                    <v-text-field  label="Your Email" v-model="signupData.email" outlined></v-text-field>
                    <v-text-field  label="Your User" v-model="signupData.userName" outlined></v-text-field>
                </div>
                <div class="fields">
                    <v-text-field  label="Your Password" v-model="signupData.password" type="password" outlined></v-text-field>
                    <v-text-field  label="Confirm Password"  v-model="signupData.confirm" type="password" outlined></v-text-field>
                </div>
                <div class="actions">
                    <v-btn color="primary" block elevation="0" @click="signup()">Signup</v-btn>
                    <router-link to="/">
                        <v-btn color="primary" block elevation="0">Signin</v-btn>
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
    background-size: 30%;
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
export default {
    data() {
        return {
            alert: false,
            alertS: false,
            alertMsgS: '',
            alertMsg: '',
            signupData: {
                name: '',
                lastName: '',
                email: '',
                userName: '',
                password: '',
                confirm: ''
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
        signup(){
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let name = this.signupData.name.replace(/ /g, '');
            let lastName = this.signupData.lastName.replace(/ /g, '');
            let email = this.signupData.email.replace(/ /g, '');
            let userName = this.signupData.userName.replace(/ /g, '');
            let password = this.signupData.password.replace(/ /g, '');
            let confirm = this.signupData.confirm.replace(/ /g, ''); 
            if(name === '' || lastName === '' || email === '' || userName === '' || password === '' || confirm === ''){
                this.alert = true;
                this.alertMsg = 'Empty Fields';
                this.alertState();
                return false;
            }else{
                let validateEmail = re.test(email);
                if(!validateEmail){
                    this.alert = true;
                    this.alertMsg = 'Please, send a valid email';
                    this.alertState();
                    this.clean();
                   return false
                }else{
                    if(password != confirm){
                        this.alert = true;
                        this.alertMsg = "Password don't match";
                        this.alertState();
                        this.clean();
                        return false
                    }else{
                        this.axios.post('/signup', {
                            name: name,
                            lastName: lastName,
                            userName: userName,
                            email: email,
                            password: password
                        })
                            .then(res => {
                                this.alertS = true;
                                this.alertMsgS = res.data.msg;
                                this.alertStateS();
                                this.clean();
                            })
                            .catch(err => {
                                if(!err.response.data.error){
                                    this.alert = true;
                                    this.alertMsg = err.response.data.msg;
                                    this.alertState();
                                    this.clean();
                                }else{
                                    let search = 'userName_1';
                                    let find = err.response.data.error.errmsg.indexOf(search);
                                    if(find != -1){
                                        this.alert = true;
                                        this.alertMsg = 'This user already exist';
                                        this.alertState();
                                        this.clean();
                                    }
                                }
                            })
                    }
                }
            }
        },
        clean(){
            this.signupData.name = '';
            this.signupData.lastName = '';
            this.signupData.userName = '';
            this.signupData.email = '';
            this.signupData.password = '';
            this.signupData.confirm = '';
        },
        alertState(){
            setTimeout(() => {
                this.alert = false;
            },3000);
        },
        alertStateS(){
            setTimeout(() => {
                this.alertS = false;
            },3000);
        }
    },
}
</script>