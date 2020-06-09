<template>
    <div>
        <b-button
            v-b-modal.add-project-form-modal
            variant="primary"
            class="shadow-md w-75 ml-5"
        >
            + ADD PROJECT   
        </b-button>

        <b-modal
            id="add-project-form-modal"
            title="Add Export Entry"
            hide-footer
            class="container-fluid"
        >
            <h5
                class="mb-0"
            >
                Title:
            </h5>
            <b-form-input
                class="mb-4 mt-2"
                v-model="title"
                placeholder="Enter title for the new project"/>

            <h5
                class="mb-0"
            >
                Description:
            </h5>
            <b-form-input
                class="mb-4 mt-2"
                v-model="description"
                placeholder="Enter description for the new project"/>

            <h5
                class="mb-0"
            >
                Folder name:
            </h5>
            <b-form-input
                class="mb-4 mt-2"
                v-model="folder"
                placeholder="Enter /folder"/>

            <b-row
                class="mt-4"
            >
                <b-col>
                    <!--
                        Cancels export and closes modal window with export form
                        @event click
                    -->
                    <b-button
                        class="w-100"
                        @click="hideModal"
                    >
                        Cancel
                    </b-button>
                </b-col>

                <b-col>
                    <!--
                        Dispatches exporting file with selected parameters
                        @event click
                    -->
                    <b-button
                        class="w-100"
                        variant="primary"
                        @click="addProject"
                    >
                        <span>
                            Ok
                        </span>
                    </b-button>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>

import { ProjectsModel } from '../services/api/models/projects.js';

export default {
    name: 'AddProjectForm',
    data() {
        return {
            title: '',
            description: '',
            folder: ''
        };
    },
    methods: {
        async addProject() {
            const projectsModelInstance = new ProjectsModel();
            try {
                const { title, description, folder } = this;
                const response = await projectsModelInstance.createProject({
                    title, description, folder,
                    userId: '5eb414d0bb04b233bcb8e099'
                });
                console.log(response);
                this.hideModal();
            } catch(error) {
                console.log(error);
            }
        },

        hideModal() {
            this.$bvModal.hide("add-project-form-modal");
        }
    }
}
</script>