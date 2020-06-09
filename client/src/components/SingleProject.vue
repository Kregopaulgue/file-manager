<template>
    <div>
        <div
            v-if="project"
            class="container border px-4 py-4 mt-4"
        >
            <b-row
                class="mr-0 shadow-md"
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

            <div
                class="d-flex align-items-center mt-3 text-size w-100 mt-5"
            >
                <h5 class="mb-0">Project Tags: </h5>

                <b-badge
                    v-for="tag in project.tags"
                    :key="tag._id"
                    variant="info"
                    class="text-size mx-2"
                >
                    {{ tag.tag }}
                </b-badge>
            </div>
            <div
                class="d-flex align-items-center mt-4 text-size w-100"
            >
                <b-form-input
                    v-model="newTag"
                    placeholder='Enter new tag'/>
                <b-button
                    @click="createNewTag"
                    class="ml-2 w-50"
                >
                    + CREATE TAG
                </b-button>

                <b-form-select
                    class="ml-5"
                    :options='tags'
                    v-model="selectedTag"/>
                <b-button
                    @click="bindTag"
                    class="ml-2 w-75"
                >
                    ADD SELECTED TAG
                </b-button>
            </div>

            <div
                class="d-flex mt-3"
            >
                <b-form-file
                    v-model="newFiles"
                    multiple
                    :state="Boolean(newFiles)"
                    class="file-input"
                ></b-form-file>

                <b-button
                    class="w-25 ml-4 "
                    variant="primary"
                >
                    + ADD FILES
                </b-button>
            </div>

            <h5 class="mt-5 ">Selected File: </h5>
            <b-alert
                v-if="!selectedFile"
                show
            >
                None
            </b-alert>
            <div
                v-if="selectedFile"
            >
                <div
                    class="d-flex"
                >
                    <span><b>Filename:</b> {{selectedFile.name}}.{{selectedFile.filetype}}</span>

                    <span class="mb-0 ml-3"><b>File Tags:</b> </span>

                    <b-badge
                        v-for="tag in selectedFile.tags"
                        :key="tag._id"
                        variant="info"
                        class="text-size mx-2"
                    >
                        {{ tag.tag }}
                    </b-badge>
                </div>
                <div class="d-flex mt-2">
                    <b-form-input
                        v-model="newFileTag"
                        placeholder='Enter new tag'/>
                    <b-button
                        @click="createNewTag(true)"
                        class="ml-2 w-50"
                    >
                        + CREATE TAG
                    </b-button>

                    <b-form-select
                        class="ml-5"
                        :options='tags'
                        v-model="selectedFileTag"/>
                    <b-button
                        @click="bindTag(true)"
                        class="ml-2 w-75"
                    >
                        ADD SELECTED TAG
                    </b-button>
                </div>
            </div>


            <h5 class="mt-5 ">Files: </h5>
                <!--v-for files from props-->
            <ul
                class="list-unstyled px-3 overflow-auto row mt-3"
            >
                <li
                    v-for="file in project.files"
                    :key="file._id"
                    class="col-sm-6 col-md-4 col-lg-1 files-explorer-element p-1 mb-1
                        selectable-element regular-text text-center"
                    @click="selectedFile = file"
                >
                    <div class="mx-auto">
                        <font-awesome-icon :icon="['far', 'file-code']" class="text-success" size="2x"/>
                    </div>

                    <div 
                        class="w-100"
                    >
                        {{ file.name }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import { ProjectsModel } from '../services/api/models/projects.js';

export default {
    name: "SingleProject",
    data() {
        return {
            project: null,

            newFiles: [],

            newTag: '',
            selectedTag: null,
            newFileTag: '',
            selectedFileTag: null,
            tags: [],

            selectedFile: null
        }
    },
    async created() {
        await this.loadProject();
    },
    methods: {
        async loadProject() {
            const projectsModelInstance = new ProjectsModel(this.$route.params.projectId);

            try {
                const response = await projectsModelInstance.getProjectById();
                this.project = response.project;
            } catch(error) {
                console.log(error);
            }
        },
        createNewTag() {

        },
        bindTag() {

        }
    }
}
</script>

<style scoped>
    .text-size {
        font-size: 1rem;
    }
</style>