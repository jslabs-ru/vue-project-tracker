<template>
    <div>
        <b-spinner
            v-if="isLoading"
            variant="primary"
            label="Spinning"
        ></b-spinner>

        <b-card
            v-if="user"
            :title="user.name"
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-card-text>
                {{ user.email }}
            </b-card-text>

            <b-card-text>
                {{ user.phone }}
            </b-card-text>

            <b-card-text>
                {{ user.company.name }}
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
import UserService from '@/services/userService';

export default {
    name: 'UserData',
    data () {
        return {
            isLoading: true,
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
    }
}
</script>
