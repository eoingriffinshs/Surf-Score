function loadPage(component) {
    return () => import(/* webpackChunkName: "[request]" */ `@/pages/${component}.vue`);
}


//PATHS THAT WILL SHOW UP IN THE SEARCH BAR FOR EACH OF THE APP FILEPATHS.
export default [
    { path: '/', component: loadPage('Home') },
    { path: '/scoring/', component: loadPage('Scoring'), props: true },
    { path: '/participant-details/:id', component: loadPage('ParticipantDetails'), props: true },
    { path: '/scoring/:id', component: loadPage('ScoringModule'), props: true },
    { path: '/results/:id', component: loadPage('ResultsModule'), props: true },
    { path: '/results', component: loadPage('Results') },
    { path: '/New-Comp', component: loadPage('New-Comp') },
    { path: '/edit-competitions', component: loadPage('EditCompetitions'), props: true },
];
