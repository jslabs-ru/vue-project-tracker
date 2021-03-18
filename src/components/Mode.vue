<template>
    <div class="root-page">
        Current mode: <span class="mode">{{ mode }}</span>
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
