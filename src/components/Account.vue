<template>
    <div id="account" :email="email" :username="username" >
        <div class="avatar">
            <v-avatar size="40">
                <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
            </v-avatar>
            <div class="edit-avatar">
                <h3>Edit Avatar</h3>
                <v-btn text fab small color="primary">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </div>
        </div>
        <div class="form">
            <div class="fields">
                <v-text-field label="Edit User" outlined :placeholder="username"></v-text-field>
                <v-text-field label="Edit Email" outlined :placeholder="email"></v-text-field>
            </div>
            <div class="fields">
                <v-text-field label="New password" outlined ></v-text-field>
                <v-text-field label="Confirm Password" outlined ></v-text-field>
            </div>
            <div class="actions">
                <v-btn color="primary" block elevation="1">Update</v-btn>
                <v-btn color="primary" block elevation="1">Reset</v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped>
#account{
    display: grid;
}
.avatar{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
}
.edit-avatar{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px;
}
.form{
    padding: 5px;
}
.fields{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}
.actions{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px; 
}
@media (max-width: 800px){
    .fields{
        grid-template-columns: 1fr;
    }
    .actions{
        grid-template-columns: 1fr;
    }
}
</style>

<script>
export default {
    name: 'Account',
    props:{
        username: {
            type: String,
            default: 'box'
        },
        email: {
            types: String,
            default: 'box'
        },
        state: {
            type: String
        },
        avatar: {
            type: String
        }
    },
}
</script>