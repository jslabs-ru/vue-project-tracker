<template>
    <ul class="paginator" v-if="pages.length > 1">
        <paginator-item
            v-for="page in pages"
            :page="page"
            :activePage="activePage"
            :key="page"
            @page-click="onPageClick"
        ></paginator-item>
    </ul>
</template>

<script>
import PaginatorItem from '@/components/paginator/PaginatorItem.vue';

export default {
    name: 'Paginator',
    components: {
        PaginatorItem
    },
    data () {
        return {
            activePage: 1
        }
    },
    props: {
        pagesCount: {type: Number}
    },
    computed: {
        pages () {
            let pages = [];
            for (var i = 1; i <= this.pagesCount; i++) {
                pages.push(i);
            }
            return pages;
        },
    },
    methods: {
        onPageClick (page) {
            this.$emit('page-click', page);
        }
    }
}
</script>
