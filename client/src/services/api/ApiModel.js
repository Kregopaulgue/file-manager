/**
 * @class
 */
class ApiModel {
    static host = 'localhost';
    static port = '5000';
    static protocol = `http//`;

    static authToken;
    static permissionGroups;

    modelBaseUrl;
    modelRequest;

    constructor() {
        this._buildUrl = this._buildUrl.bind(this);
        this._buildUrlWithParams = this._buildUrlWithParams.bind(this);

        if (this.getModelRequest === undefined) {
            throw new TypeError('getModelRequest has to be implemented in the derived class');
        } else {
            this.modelRequest = this.getModelRequest();
        }

        this.modelBaseUrl = this._buildUrl();
    }

    _buildUrl() {
        return `${ApiModel.protocol}${ApiModel.host}${ApiModel.port ? ':' + ApiModel.port : ''}${this.modelRequest}`;
    }

    _buildUrlWithParams(params, insertSlash) {
        const url = new URL(this.modelBaseUrl +( insertSlash ? '/' : ''));

        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }

        return url;
    }

    /**
     * Does a request on the server for this resource 
     * @param {string} method HTTP method to use on the server
     * @param {object} body Request body
     * @param {object} params Query parameters
     * @returns {Promise<object>} Response body
     */
    async doRequest(method, body, params) {
        const url = this._buildUrlWithParams(params, method === 'POST');

        const response = await fetch(url, {
            method: method || 'GET',
            body: body ? JSON.stringify(body) : undefined,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': ApiModel.authToken ? `Token ${ApiModel.authToken}` : undefined
            },
            withCredentials: true
        });

        if (response.ok) {
            const json = response.status !== 204 ? 
                await response.json() : 
                { status: "deleted" };
            return json;
        } else {
            throw response;
        }
    }

    /**
     * Does a GET for this resource on the server
     * @param {object} params Query paramaters
     * @returns {Promise<object>} Response body
     */
    async get(params) {
        return this.doRequest('GET', null, params);
    }

    /**
     * Does a POST for this resource on the server
     * @param {object} body Request body
     * @param {object} params Query paramaters
     * @returns {Promise<object>} Response body
     */
    async post(body, params) {
        return this.doRequest('POST', body, params);
    }

    /**
     * Does a PUT for this resource on the server
     * @param {object} body Request body
     * @param {object} params Query paramaters
     * @returns {Promise<object>} Response body
     */
    async put(body, params) {
        return this.doRequest('PUT', body, params);
    }

    /**
     * Does a DELETE for this resource on the server
     * @param {object} body Request body
     * @param {object} params Query paramaters
     * @returns {Promise<object>} Response body
     */
    async delete(body, params) {
        return this.doRequest('DELETE', body, params);
    }

    /**
     * Sets the authentication token to be send on every request
     * @param {{token: string}} response 
     */
    static setAuthToken(response) {
        ApiModel.authToken = response.token;
        ApiModel.permissionGroups = response.permission_groups;

        localStorage.setItem('authToken', ApiModel.authToken);
        localStorage.setItem('permissionGroups', JSON.stringify(ApiModel.permissionGroups));
    }

    /**
     * Clears the auth token (should usually be called on logout)
     */
    static clearAuthToken() {
        delete ApiModel.authToken;
        delete ApiModel.permissionGroups;

        localStorage.removeItem('authToken');
        localStorage.removeItem('permissionGroups');
    }

    /**
     * Loads auth token and permission groups from local storage 
     */
    static loadAuthToken() {
        ApiModel.authToken = localStorage.getItem('authToken');
        ApiModel.permissionGroups = JSON.parse(localStorage.getItem('permissionGroups'));   
    }

    getModelRequest() {
        throw new Error('This method has to be implemented!');
    }
}

ApiModel.loadAuthToken();

export { ApiModel };