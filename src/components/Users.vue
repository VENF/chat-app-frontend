<template>
    <div id="users">
        <v-card :users="users" v-for="user of users" :key="user.id" class="user" elevation="1">
            <v-badge bordered bottom color="deep-purple accent-4" dot offset-x="10" offset-y="10">
                <v-avatar size="40">
                    <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-avatar>
            </v-badge>
            <div class="user-info">
                {{ user.userName }} <br>
                state: On
            </div>
            <v-btn color="primary" text elevation="0" fab small>
                <v-icon>mdi-comment-text-outline</v-icon>
            </v-btn>
        </v-card>
    </div>
</template>

<style scoped>
#users{
    background: rgba(167, 161, 190, 0.1);
    overflow-y: scroll;
}
.user{
    display: flex;
    margin: 10px 10px;
    padding: 5px;
}
.user-info{
    margin: 0px 10px;
}
.action{
    display: flex;
    align-items: center;
}
#users::-webkit-scrollbar {
        width: 4px;   
        height: 4px;
}
#users::-webkit-scrollbar-thumb {
    background: rgba(32, 29, 46, 0.1);
    border-radius: 4px;
}
#users::-webkit-scrollbar-thumb:hover {
    background: #6744ec; 
}
#users::-webkit-scrollbar-thumb:active {
    background: #6744ec; 
}
#users::-webkit-scrollbar-track {
    background: rgba(72, 66, 97, 0.1);
    border-radius: 4px;
}
@media (max-width: 800px){
    #users{
        display: flex;
        align-items: center;
        overflow-x: scroll;
    }
}
</style>
<script>
export default {
    name: 'Users',
    props: {
       userName: {
           type: String
       },
       state: {
          type: String,
          default: 'Connected' 
       },
       users: {
           type: Array,
       }
    },
}
</script>