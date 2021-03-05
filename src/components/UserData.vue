<template>
    <div>
        <b-spinner
            v-if="isLoading"
            variant="primary"
            label="Spinning"
        ></b-spinner>

        <b-tabs content-class="mt-3" v-if="user">
            <b-tab title="User" >
                <b-card
                    v-if="user"
                    :title="user.name"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text>
                        {{ user.username }}
                    </b-card-text>

                    <b-card-text>
                        {{ user.email }}
                    </b-card-text>
                </b-card>
            </b-tab>
            <b-tab
                title="Dangerous"
            >
                <button
                    v-if="!isDeleted"
                    type="submit"
                    class="btn btn-danger"
                    v-on:click="onDelete"
                >Delete this user</button>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import UserService from '@/services/userService';

const CONFIRMATION_DELETE_MESSAGE = 'Delete this user?';

export default {
    name: 'UserData',
    data () {
        return {
            isLoading: true,
            isDeleted: false,
            user: null
        }
    },
    computed: {
        userid () {
            return this.$route.params.userid;
        }
    },
    created () {
        UserService.getUserAccountData(this.userid)
            .then(user => {
                this.user = user;
            })
            .catch(error => {
                switch (error.response.status) {
                    case 404:
                        this.$error('User not found');
                        break;
                    default:
                        this.$error('Something went wrong');
                }
            })
            .finally(() => {
                this.isLoading = false;
            })
    },
    methods: {
        getSuccessMessage (timer) {
            return `User deleted. You are going to be redirected to users list in ${timer} seconds`;
        },
        onDelete () {
            if (window.confirm(CONFIRMATION_DELETE_MESSAGE)) {
                UserService.deleteUserAccount(this.userid)
                    .then(res => {
                        let timer = 5;
                        this.isDeleted = true;
                        let vm = this;

                        let countDownInterval = setInterval(function traceMessage() {
                            if(timer === 0) {
                                clearInterval(countDownInterval)
                                vm.$router.push({path: '/users'}, () => {})
                            } else {
                                vm.$success(vm.getSuccessMessage(timer));
                                timer--;
                            }
                            return traceMessage;
                        }(), 1000);
                    })
            }
        }
    }
}
</script>
