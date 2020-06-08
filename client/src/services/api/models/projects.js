import { ApiModel } from '../ApiModel';

export class ProjectsModel extends ApiModel {
    id;

    constructor(id) {
        super();

        this.id = id;

        this.getModelRequest = this.getModelRequest.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.getProjectById = this.getProjectById.bind(this);
        this.createProject = this.createProject.bind(this); 

        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = `/projects`; 
        if(this.id) {
            resultUrl = `/projects/${this.id}`; 
        }
        return resultUrl;
    }

    async getAllProjects() {
        return await this.get();
    }

    async getProjectById() {
        return await this.get();
    }

    async createProject({ userId, title, description, folder }) {
        return await this.post({
            userId, title, description, folder
        });
    }
}