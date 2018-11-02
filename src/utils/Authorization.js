import axios from 'axios'

export default AuthSecured = {
    beforeCreate: function() {
        axios.get('/drops/webapp/identity')
        .then((response) => {
            if (response.status == 200) {
                return;
            }
        })
        .catch(function (error) {
            switch (error.response.status) {
                case 401:
                    // Not Authenticated!
                case 403:
                    // Forbidden!
                case 404:
                    // redirect 404 error page
                case 500:
                    // redirect 500 error page
                    break;
            }
        })
        .finally(() => this.loading = false)
    }
}