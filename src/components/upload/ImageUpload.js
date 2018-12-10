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
        axios.post('/drops/webapp/avatar/upload?csrfToken=' + this.csrf, formData, {
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

    thumbnail(formData, successCallback, errorCallback, id) {
        axios.post('/drops/webapp/avatar/upload/thumbnails/' + id +'?csrfToken=' + this.csrf, formData, {
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