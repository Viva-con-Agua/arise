import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import ErrorState from '@/components/ErrorState'

Vue.use(Router)

function loadView(view) {
    return () => import(/* webpackChunkName: '[request]' */ `@/views/${view}.vue`)
}

/**
 * You can add roles that a user has to have to get access. Add a `meta` attribute to the route, that contains an array
 * of roles with granted access. Roles can be Strings of more complex objects. Currently, the values
 *
 * `Admin`, `Employee`, `Supporter` and `VolunteerManager`
 *
 * can be used as string values. If you need a more complex description of the
 * volunteer manager (e.g. only finance managers or only managers of a specific crew), you can add an object to the array
 * of roles:
 *
 * { 'name': 'VolunteerManager', 'crew': '<CrewName>', 'pillar': '<Pillar name>' }
 *
 * Note: `crew` and `pillar` are optional elements of the role. While `crew` has to be the name of any existing crew (that
 * means a crew saved in the drops database), `pillar` has to be a value of the following range:
 *
 * ['network', `finance`, `operation`, `education`]
 *
 * (as defined by the Companion object of [models.Pillar](https://github.com/Viva-con-Agua/drops/blob/2b5b3c0d94b849b4966082c11173d276c6574284/app/models/Pillar.scala#L12))
 */
var router = new Router({
  routes: [
    {
        path: '/',
        name: 'Index',
        redirect: 'signin',
    },
    {
        path: '*',
        name: 'NotFound',
        redirect: 'error/404'
    },
    {
        path: '/crews',
        name: 'Crews',
        component: loadView('Crews'),
        meta: {
            'roles': ['Admin', 'Employee']
        }
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: loadView('SignUp')
    },
    {
        path: '/signupCompletion/:token',
        name: 'SignUpToken',
        component: loadView('SignUpToken')
    },
    {
        path: '/finishsignup',
        name: 'finishSignup',
        component: loadView('finishSignup')
    },
    {
        path: '/signin',
        name: 'SignInDefault',
        component: loadView('defaultPage')
    },
    {
        path: "/signin/:redirectUrl",
        name: 'SignIn',
        component: loadView('SignIn')
    },
    {
        path: "/out/",
        name: 'SignOut',
        component: loadView('SignOut'),
        meta: {
            'roles': ['Supporter']
        }
    },
    {
        path: "/tasks",
        name: 'Tasks',
        component: loadView('Tasks'),
        meta: {
            'roles': ['Supporter']
        }
    },
    {
        path: "/oauth",
        name: 'OAuth',
        component: loadView('OAuth'),
        meta: {
            'roles': ['Admin']
        }
    },
    {
        path: "/resetPassword/:token",
        name: 'resetPassword',
        component: loadView('resetPassword')
    },
    {
        path: "/resetPasswordInstructions",
        name: 'resetPasswordInstructions',
        component: loadView('resetPasswordInstructions')
    },
    {
        path: "/resetEmail/:token",
        name: 'resetEmail',
        component: loadView('resetEmail')
    },
    {
        path: "/resetEmailInstructions",
        name: 'resetEmailInstructions',
        component: loadView('resetEmailInstructions')
    },
    {
        path: "/profile",
        name: 'Profile',
        component: loadView('Profile'),
        meta: {
            'roles': ['Supporter']
        }
    },
    {
        path: "/changePassword",
        name: 'changePassword',
        component: loadView('changePassword')
    },
    {
        path: "/changeEMail",
        name: 'changeEMail',
        component: loadView('changeEMail')
    },
    {
        path: "/users",
        name: 'Users',
        component: loadView('users'),
        meta: {
            'roles': ['Admin', 'Employee', { 'name': 'VolunteerManager' }] //'Admin',
        }
    },
      {
          path: '/user/:id',
          name: 'UserProfile',
          component: loadView('UsersProfile'),
          meta: {
              'roles': ['Supporter']
          }
      },
    {
        path: "/error/:code",
        name: "ErrorState",
        component: ErrorState,
        props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.hasOwnProperty("roles"))) {
        axios.get('/drops/webapp/identity')
            .then((response) => {
                if (response.status === 200) {
                    var userRoles = response.data.additional_information.roles.map((role) => role.role)
                    var supporterRoles = response.data.additional_information.profiles[0].supporter.roles
                    var records = to.matched.filter(record => record.meta.hasOwnProperty("roles"))
                    var fulfillsRole = records.reduce((fulfills, record) => {
                        return fulfills || record.meta.roles.reduce((hasItAlready, requiredRole) => {
                            var has = false
                            if((typeof requiredRole === "string") && requiredRole !== "VolunteerManager") {
                                has = userRoles.some((userRole) => userRole === requiredRole.toLowerCase())
                            } else if(requiredRole === "VolunteerManager") {
                                has = supporterRoles.reduce((found, supporterRole) => (found || supporterRole.name === requiredRole), false)
                            } else {
                                has = supporterRoles.reduce((found, supporterRole) =>
                                        (found || (supporterRole.name === requiredRole.name &&
                                            ((requiredRole.hasOwnProperty("crew") && supporterRole.crew.name === requiredRole.crew) || !requiredRole.hasOwnProperty("crew")) &&
                                            ((requiredRole.hasOwnProperty("pillar") && supporterRole.pillar.pillar === requiredRole.pillar) || !requiredRole.hasOwnProperty("pillar"))
                                        )),
                                    false
                                )
                            }
                            return hasItAlready || has
                        }, false)
                    }, records.length === 0)
                    if(fulfillsRole) {
                        next();
                    } else {
                        next({path: '/error/403'})
                    }
                }
            })
            .catch(function (error) {
                switch (error.response.status) {
                    case 401:
                        // Not Authenticated!
                        next({path: '/signin', query: {redirect: to.fullPath}})
                        break;
                    case 403:
                        // Forbidden!
                        next({path: '/error/403'})
                        break;
                    case 404:
                        // redirect 404 error page
                        next({path: '/error/404'})
                        break;
                    case 500:
                        // redirect 500 error page
                        next({path: '/error/500'})
                        break;
                }
            })
    } else {
        next();
    }
});

export default router
