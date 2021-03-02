<template>
    <b-container>
        <b-navbar class="bg-light">
            <b-navbar-nav>
                <b-nav-item to="/">Main</b-nav-item>
                <b-nav-item to="/tasks">Tasks</b-nav-item>
            </b-navbar-nav>
        </b-navbar>

        <RouterView />
    </b-container>
</template>

<script>
export default {
    name: 'App'
}
</script>
