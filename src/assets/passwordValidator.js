import Validator from 'vee-validate';
Vue.use.(VeeValidate);


Validator.extend('verify_password', {
  getMessage: field => `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(value);
  }
});

const instance = new Validator({ verify_password: 'verify_password' })

const dictionary = {
  en: {
    attributes: {
      verify_password: `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`

}
  }
}

