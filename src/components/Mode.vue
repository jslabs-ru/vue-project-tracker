<template>
    <div class="root-page">
        Current mode: {{ mode }}
    </div>
</template>

<script>
export default {
    name: 'Mode',
    props: {
        mode: String
    }
}
</script>
