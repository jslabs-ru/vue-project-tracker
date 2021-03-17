const BASE_TITLE = 'Project Tracker - ';

export default function beforeEach(to, from, next) {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    if(nearestWithTitle) document.title = BASE_TITLE + nearestWithTitle.meta.title;
    next();
}
