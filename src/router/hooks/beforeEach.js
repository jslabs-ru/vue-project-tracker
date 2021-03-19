export default function beforeEach(to, from, next) {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    if(nearestWithTitle) document.title =
        /* defined in vue.config.js, injected with DefinePlugin */ BASE_PAGE_TITLE + ' - ' + nearestWithTitle.meta.title;
    next();
}
