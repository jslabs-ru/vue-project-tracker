<template>
    <div>
        <b-spinner
            v-if="isLoading"
            variant="primary"
            label="Spinning"
        ></b-spinner>

        <div v-else>
            <b-table
                :busy="isLoading"
                id="my-table"
                :fields="fields"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                small
                sticky-header
                @row-clicked="onRowClick"
            >
                <template #cell(actions)="row">
                    <b-button size="sm"
                        class="mr-1"
                        @click="info(row.item, row.index, $event.target)"
                    >
                        user json
                    </b-button>
                </template>
            </b-table>

            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
            ></b-pagination>

            <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                <pre>{{ infoModal.content }}</pre>
                <template #modal-footer>
                    <div class="w-100">
                        <p class="float-left">Modal Footer Content</p>
                        <b-button
                            variant="primary"
                            size="sm"
                            class="float-right"
                            @click="hideModal(infoModal.id)"
                        >
                            Close
                        </b-button>
                    </div>
                </template>
            </b-modal>
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
            fields: [
                { key: 'name', label: 'Full Name' },
                { key: 'username', label: 'Username' },
                { key: 'email', label: 'Email' },
                { key: 'actions', label: 'Actions' }
            ],
            items: [],
            infoModal: {
                id: 'info-modal',
                title: '',
                content: ''
            }
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
            this.$router.push({path: `/users/${item.id}`}, () => {});
        },
        info (item, index, button) {
            this.infoModal.title = item.name;
            this.infoModal.content = JSON.stringify(item, null, 2);
            this.$bvModal.show(this.infoModal.id, button);
        },
        resetInfoModal () {
            this.infoModal.title = '';
            this.infoModal.content = '';
        },
        hideModal (id) {
            this.$bvModal.hide(id);
        }
    }
}
</script>
