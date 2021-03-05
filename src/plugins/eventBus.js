export default {
    install (Vue) {
        const eventBus = new Vue();
        Vue.prototype.$eventBus = eventBus;
    }
}
