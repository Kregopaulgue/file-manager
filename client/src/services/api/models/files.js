import { ApiModel } from '../ApiModel.js';

export class FilesModel extends ApiModel {
    constructor(id) {
        super();

        this.id = id;

        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }
}