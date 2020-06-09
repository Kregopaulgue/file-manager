import Projects from './components/Projects.vue';
import SingleProject from './components/SingleProject.vue';

export default [
    { path: '/', component: Projects, name: 'projects' },
    { path: '/:projectId', component: SingleProject, name: 'singleProject' }
]