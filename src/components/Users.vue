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

            <div class="overflow-auto" v-if="pagesCount > 0">
                <b-pagination-nav
                    :link-gen="linkGen"
                    :number-of-pages="pagesCount"
                    use-router
                />
            </div>

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
import { isUndefined, isFinite } from 'lodash';
import UserService from '@/services/userService';

const COUNT_ON_PAGE = 5;

export default {
    data () {
        return {
            isLoading: true,
            perPage: COUNT_ON_PAGE,
            currentPage: 1,
            pagesCount: 0,
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
    watch: {
        $route (route) {
            this.getUsersData(route);
        }
    },
    async created () {
        let usersCount = await UserService.getUsersCount();

        if(!usersCount) {
            this.$error('No users found');
            this.isLoading = false;
        } else {
            this.pagesCount = Math.ceil(usersCount / COUNT_ON_PAGE);
            this.getUsersData(this.$route);
        }
    },
    methods: {
        onRowClick (item) {
            this.$router.push({path: `/users/${item.userid}`}, () => {});
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
        },
        linkGen(pageNum) {
            return pageNum === 1 ? '?' : `?page=${pageNum}`;
        },
        getUsersData (route) {
            let from, to,
                { page } = route.query;

            if(isUndefined(page)) {
                page = 0;
            } else {
                page = parseInt(page);
                if(!isFinite(page) || page > this.pagesCount || page <= 0) {
                    return this.$router.push({ path: '/users' }, () => {});
                }
            }

            page = page === 0 ? 0 : page - 1;

            if(page) {
                from = page * COUNT_ON_PAGE + 1;
                to = (page + 1) * COUNT_ON_PAGE;
            }

            UserService.getAll({
                from,
                to
            }).then(users => {
                this.items = users;
                this.isLoading = false;
            })
        }
    }
}
</script>
