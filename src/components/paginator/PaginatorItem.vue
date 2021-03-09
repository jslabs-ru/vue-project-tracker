<template>
    <a
        class="paginator-item"
        v-bind:class="{'paginator-item--active': isActive}"
        @click="$emit('page-click', page)"
    >&nbsp;{{ page }}&nbsp;</a>
</template>

<script>
export default {
    name: 'PaginatorItem',
    props: {
        page: {type: Number},
        activePage: {type: Number},
    },
    computed: {
        isActive () {
            return this.activePage === this.page;
        },
    }
}
</script>
