export default {
    install (Vue) {
        Vue.prototype.$error = function (message) {
            let alertElement = this.$el.querySelector('.alert-danger');
            if(!alertElement) {
                alertElement = document.createElement('div');
                const alertClasses = ['alert', 'alert-danger'];
                alertElement.classList.add(...alertClasses);
                alertElement.textContent = message;
                this.$el.appendChild(alertElement);
            } else {
                alertElement.textContent = message;
            }
        }

        Vue.prototype.$success = function (message) {
            let alertElement = this.$el.querySelector('.alert-success');
            if(!alertElement) {
                alertElement = document.createElement('div');
                const alertClasses = ['alert', 'alert-success'];
                alertElement.classList.add(...alertClasses);
                alertElement.textContent = message;
                this.$el.appendChild(alertElement);
            } else {
                alertElement.textContent = message;
            }
        }
    }
}
