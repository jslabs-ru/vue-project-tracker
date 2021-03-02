<template>
    <div>
        <b-spinner
            v-if="isLoading"
            variant="primary"
            label="Spinning"
        ></b-spinner>

        <div v-else>
            <b-table
                id="my-table"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                small
                @row-clicked="onRowClick"
            ></b-table>

            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
            ></b-pagination>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/userService';

export default {
    data () {
        return {
            isLoading: true,
            perPage: 10,
            currentPage: 1,
            items: []
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    },
    created () {
        UserService.getAll()
            .then(users => {
                this.items = users;
                this.isLoading = false;
            })
    },
    methods: {
        onRowClick (item) {
            this.$router.push({path: `/users/${item.id}`}, () => {})
        }
    }
}
</script>
