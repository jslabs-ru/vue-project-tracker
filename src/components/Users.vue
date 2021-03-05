<template>
    <div>
        <div>
            <b-table
                :busy="isLoading"
                id="my-table"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                small
                @row-clicked="onRowClick"
            >
                <template #table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle" variant="primary"></b-spinner>
                    </div>
                </template>
            </b-table>

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
