<template>
    <b-container>
        <b-navbar class="bg-light">
            <b-navbar-nav>
                <b-navbar-brand to="/">Project Tracker</b-navbar-brand>
                <b-nav-item to="/projects">Projects</b-nav-item>
                <b-nav-item to="/users">Users</b-nav-item>
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
