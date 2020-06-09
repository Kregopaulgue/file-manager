<template>
    <div
        class="mt-5"
    >
        <b-row
            class="my-3 px-5"
        >
            <b-col
                lg="2"
                class="px-0"
            >
                <AddProjectForm/>
            </b-col>

            <b-col
                lg="1"
                class="text-right"
            >
                <font-awesome-icon class="mt-2" :icon="['fas', 'search']" size="lg"/>
            </b-col>

            <b-col
                class="container mr-0"
            >
                <b-form-input
                    placeholder="Enter tags for search here"/>
            </b-col>
        </b-row>

        <b-list-group
            class="px-5"
        >
            <b-list-group-item
                v-for="project in projects"
                :key="project._id"
                @click="goToSingleProject(project)"
            >
                <b-row
                    class="mr-0"
                >
                    <b-col
                        sm="3"
                        class="d-flex align-items-center"
                    >
                        <font-awesome-icon :icon="['fas', 'folder']" size="lg"/> 
                        <h5 class="mb-0 ml-3">{{ project.title }}</h5>
                    </b-col>

                    <b-col
                        sm="3"
                        class="d-flex flex-column justify-content-center text-left"
                    >
                        <span
                            class="font-weight-light light-text-opacity batch-header-sub-font-size"
                        >
                            DESCRIPTION
                        </span>
                        {{ project.description }}
                    </b-col>

                    <b-col
                        sm="3"
                        class="d-flex flex-column justify-content-center text-left"
                    >
                        <span
                            class="font-weight-light light-text-opacity batch-header-sub-font-size"
                        >
                            FOLDER
                        </span>
                        <span>
                            {{ project.folder }}
                        </span>
                    </b-col>

                    <b-form
                        class="d-flex flex-column justify-content-center text-left"
                    >
                        <span
                            class="font-weight-light light-text-opacity batch-header-sub-font-size"
                        >
                            CREATED AT
                        </span>
                        <span>
                            {{ project.createdAt }}
                        </span>
                    </b-form>
            </b-row>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>

import AddProjectForm from './AddProjectForm.vue';

import { ProjectsModel } from '../services/api/models/projects.js';

export default {
    name: "Projects",
    components: {
        AddProjectForm
    },
    data() {
        return {
            projects: []
        }
    },
    async created() {
        await this.loadProjects();
    }, 
    methods: {
        async loadProjects() {
            const projectsModelInstance = new ProjectsModel();
            try {
                const response = await projectsModelInstance.getAllProjects();
                this.projects = response.projects;
            } catch(error) {
                console.log(error);
            }
        },
        goToSingleProject(project) {
            this.$router.push(`/${project._id}`);
        }
    }
}
</script>