import { ApiModel } from '../ApiModel.js';

export class TagsModel extends ApiModel {
    constructor(id) {
        super();

        this.id = id;

        this.addFile = this.addFile.bind(this);

        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = `/tags`; 
        if(this.id) {
            resultUrl = `/tags/${this.id}`; 
        }
        return resultUrl;
    }

    async addTag({ tag, project, file }) {
        return await this.post({
            tag, 
            project,
            file
        });
    }
    async bindTag({ tag, project, file }) {
        const oldUrl = this.modelBaseUrl;
        this.modelBaseUrl += '/bind';
        const response = await this.post({
            tag, 
            project,
            file
        });
        this.modelBaseUrl = oldUrl;
        return response;
    }
}