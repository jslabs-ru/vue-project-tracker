<template>
    <div class="root-page container">
        <div class="row">
            <div class="col">
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

                    <Paginator
                        :pagesCount="pagesCount"
                        @page-click="onPageClick"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TaskService from '@/services/taskService';
import Paginator from '@/components/paginator/Paginator.vue';

const COUNT_ON_PAGE = 10;

export default {
    data () {
        return {
            isLoading: true,
            perPage: 10,
            currentPage: 1,
            items: [],
            pagesCount: 0
        }
    },
    components: {
        Paginator
    },
    computed: {
        rows() {
            return this.items.length
        }
    },
    async created () {
        let tasksCount = await TaskService.getTasksCount();

        this.pagesCount = Math.ceil(tasksCount / COUNT_ON_PAGE);

        TaskService.getAll({})
            .then(tasks => {
                this.items = tasks;
                this.isLoading = false;
            })
    },
    methods: {
        onPageClick (page) {
            let from = page * COUNT_ON_PAGE;
            let to = from + COUNT_ON_PAGE;

            return TaskService.getAll({
                from,
                to
            }).then(tasks => {
                this.items = tasks;
            }).catch(error => {
                console.log('ERROR', error);
            })
        }
    }
}
</script>
