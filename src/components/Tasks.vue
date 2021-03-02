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
    async created () {
        const data = await import(/* webpackChunkName: "tasks-data" */ '@/../data/data.json');

        this.items = data.default;
        this.isLoading = false;
    }
}
</script>
