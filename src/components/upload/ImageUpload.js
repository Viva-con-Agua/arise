import axios from 'axios'

const STATUS_INIT = 1, STATUS_FAILED = 2;

export default class ImageUpload {

    constructor() {
        this.csrf = ""
        this.currentStatus = STATUS_INIT
        this.getCSRF()
    }


    getCSRF() {
        axios.get('/drops/webapp/avatar/csrf')
            .then(response => {
                if(response.status === 200) {
                    this.csrf = response.data.additional_information.token
                } else {
                    this.currentStatus = STATUS_FAILED
                }
            }).catch(error => this.currentStatus = STATUS_FAILED)
    }

    image(formData, successCallback, errorCallback) {
        this.call('/drops/webapp/avatar/upload', formData, successCallback, errorCallback)
    }

    thumbnail(formData, successCallback, errorCallback, id) {
        this.call('/drops/webapp/avatar/upload/thumbnails/' + id, formData, successCallback, errorCallback)
    }

    call(url, formData, successCallback, errorCallback) {
        axios.post(url +'?csrfToken=' + this.csrf, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if(response.status === 200) {
                    successCallback(response)
                }
            })
            .catch(err => {
                errorCallback(err)
            });
    }
}