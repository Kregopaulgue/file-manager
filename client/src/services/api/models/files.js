import { ApiModel } from '../ApiModel.js';

export class FilesModel extends ApiModel {
    id;
    constructor(id) {
        super();

        this.id = id;

        this.addFile = this.addFile.bind(this);

        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = `/files`; 
        if(this.id) {
            resultUrl = `/files/${this.id}`; 
        }
        return resultUrl;
    }

    async addFile({ project, name, url, filetype }) {
        return await this.post({
            project,
            name,
            url,
            filetype
        });
    }
}