const alertClasses = ['alert', 'alert-danger'];

export default {
    install (Vue) {
        Vue.prototype.$error = function (message) {
            let alertElement = this.$el.querySelector('.alert');
            if(!alertElement) {
                alertElement = document.createElement('div');
                alertElement.classList.add(...alertClasses);
                alertElement.textContent = message;
                this.$el.appendChild(alertElement);
            } else {
                alertElement.textContent = message;
            }
        }
    }
}
