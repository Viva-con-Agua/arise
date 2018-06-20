<template>
  <div id="crews">
  <div>
  <div>

<!--    <div class="ui input">
    <vuetify-google-autocomplete
      ref="address"
      id="map"
      class="input"
      :types="['(cities)']"
      :country="['de','nl','au','ch']"
      placeholder="type here"
      v-on:placechanged='getAddressData'>
    </vuetify-google-autocomplete>
    </div>-->
    <div id="addcrew">

        <sui-button @click="show = !show" floated="left">
          ADD CREW
        </sui-button>
      <div class="ui icon input" id="search">
        <sui-input
                 v-model="search"
                 icon="search"
                 placeholder="Search... " />
      </div>
      <sui-divider hidden/>


        <transition name="fade">
          <div v-if="show">

            <sui-divider horizontal>
            ADD CREW</sui-divider>
            <sui-form @submit.prevent="validateBeforeSubmit">
            <sui-form-field>
            <label>Crew Name:</label>
              <input
                v-validate="'required|alpha'"
                v-model.lazy="editedItem.name"
                :class="{'input': true, 'is-danger': errors.has('crew') }"
                name="crew"
                type="text"
                placeholder="Crewname">
              <i
                v-show="errors.has('crew')"
                class="fa fa-warning"></i>
              <span
                v-show="fields.crew && fields.crew.dirty && fields.crew.touched && errors.has('crew')"
                class="help_is-danger"> {{ errors.first('crew') }}</span></sui-form-field>

              <sui-form-field>
                <label>Stadt:</label>
                  <sui-segment>
                    <ul> <li v-for="city in newCities">{{ city }}</li></ul>
                    <div class="input">
                      <!--<h3> {{ newCities }} </h3>-->
                      <vuetify-google-autocomplete
                        :types="(cities)"
                        :country="['de','nl','at','ch']"
                        ref="address"
                        v-model="newCity.value"
                        id="map"
                        v-on:placechanged='getAddressData'>
                      </vuetify-google-autocomplete>
                      <sui-button @click="addCity" icon="add" floated="left">Add City</sui-button>
                        <!--ref="address"-->
                        <!--v-model="city.value"-->
                        <!--id="map"-->
                        <!--classname="form-control"-->
                        <!--:types="['(cities)']"-->
                        <!--:country="['de','nl','au','ch']"-->
                        <!--v-on:placechanged='getAddressData'-->

                      <!--</vuetify-google-autocomplete>-->
                    </div>
    <!--              <sui-button @click="addCity" icon="add" floated="left" >Add City</sui-button>

                      <span v-for="(city, index) in newCities">
                      <sui-button basic icon="times" @click="deleteCity(index)"/>
                  </span>-->
                </sui-segment>
              </sui-form-field>
              <sui-form-field>
              <label>Land*:</label>
              <input
                v-validate="'required|alpha_dash'"
                v-model="editedItem.country"
                :class="{'input': true, 'is-danger': errors.has('country') }"
                name="country"
                type="text"
                placeholder="Deutschland">
              <i
                v-show="errors.has('country')"
                class="fa fa-warning"></i>
              <span
                v-show="fields.country && fields.country.dirty && errors.has('country')"
                class="help_is-danger"> {{ errors.first('country') }}</span></sui-form-field></sui-form>
            <sui-button animated floated="left" @click="show = !show">
              <sui-button-content visible>Close</sui-button-content>
              <sui-button-content hidden name="close"><sui-icon name="close"/></sui-button-content>
            </sui-button>
            <sui-button animated floated="left" @click="save">
              <sui-button-content visible>Save</sui-button-content>
              <sui-button-content hidden name="save"><sui-icon name="save"/></sui-button-content>
            </sui-button>
          </div>
        </transition>
    </div>
  </div>
</div>
<sui-divider hidden/>
    <sui-divider hidden/>
  <sui-divider horizontal>
    CREW LIST</sui-divider>
    <!--<v-card>-->
      <!--&lt;!&ndash;<v-card-title>&ndash;&gt;-->
      <!--&lt;!&ndash;<span class="headline">{{ Crews }}</span>&ndash;&gt;-->
      <!--&lt;!&ndash;</v-card-title>&ndash;&gt;-->
      <!--<v-card-text>-->
        <!--<v-container grid-list-md>-->
          <!--<v-layout wrap>-->
            <!--<v-flex xs12 sm6 md4>-->
              <!--<v-text-field v-model="editedItem.name" label="Crew Name"></v-text-field>-->
            <!--</v-flex>-->
            <!--<v-flex xs12 sm6 md4>-->
              <!--<v-text-field v-model="editedItem.cities" label="Stadt / Region"></v-text-field>-->
            <!--</v-flex>-->
            <!--<v-flex xs12 sm6 md4>-->
              <!--<v-text-field v-model="editedItem.country" label="Land"></v-text-field>-->
            <!--</v-flex>-->
          <!--</v-layout>-->
        <!--</v-container>-->
      <!--</v-card-text>-->
      <!--<v-card-actions>-->
        <!--<sui-button color="blue" @click.native="close">Cancel</sui-button>-->
        <!--<sui-button color="blue" @click.native="save">Save</sui-button>-->
      <!--</v-card-actions>-->
    <!--</v-card>-->
    <el-table
      size=size
      :search-def="searchDef"
      :data="crewdata"
      style="width: 100%"
      @selection-change="handleSelection">
      <el-table-column
        type="selection"
        witdh="55">
      </el-table-column>
      <el-table-column
        sortable
        label="Name"
        prop="crewname">
      </el-table-column>
      <el-table-column
        sortable
        label="City/Cities"
        prop="cities">
      </el-table-column>
      <el-table-column
        sortable
        label="Country"
        prop="country">
      </el-table-column>
      <el-table-column type="expand"
        label="Operations">
        <template slot-scope="props">
            <p>Name: {{ props.row.crewname }}</p>
          <sui-button
            size="mini"
            type="danger"
            @click="deleteItem(props.row)">Delete</sui-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import Vue from 'vue'

  new Vue({
    el:'crew',
    data:

      Vue.component('AddCrewForm', {

      })

  });



  var crewdata, titles

  export default {
    data: () => ({
      name: 'crews',
      dialog: false,
      show: false,
      expanded: {},
      search: '',

      crewdata: [{
        crewname: 'Berlin',
        cities: 'Berlin',
        country: 'Deutschland'
      }, {
        crewname: 'Airfurt',
        cities: 'Erfurt, Weimar',
        country: 'Deutschland'
      },{
        crewname: 'Amsterdamm',
        cities: 'Amsterdamm',
        country: 'Niederlande'
      }],

      multipleSelection: [],

      crews: [],
      newCities: [],
      newCity: "",
      cities: ["Berlin","Erfurt","Münster","Buxtehude"],
      address: '',

      editedIndex: -1,
      editedItem: {
       name: '',
       cities: '',
       country: ''
      },
      defaultItem: {
       name: '',
       cities: '',
       country: ''
      }
    }),

    computed: {
       Crews(){
         return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog(val)
      {
        val || this.close
      }
    },

    created() {
      this.initialize();

      this.items.forEach(i => {
        this.$set(this.expanded, i.name, false)
      });
      console.log(this.expanded)
    },

    methods: {


      editItem(item) {
        this.editedIndex = this.crews.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.crews.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.crews.splice(index, 1)
      },


      // toggleSelection(rows) {
      //   if (rows) {
      //     rows.forEach(row => {
      //       this.$refs.multipleTable.toggleRowSelection(row);
      //     });
      //   } else {
      //     this.$refs.multipleTable.clearSelection();
      //   }
      // },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      // validateBeforSubmit() {
      //   this.$validator.localize('de');
      //   this.$validator.validateAll().then((result) => {
      //     if (result) {
      //       alert('Du hast dich erfolgreich registriert!');
      //
      //       const uri = 'http://localhost/drops/auth/signup';
      //
      //       axios.default.withCredentials= true;
      //       .then((response
      //         console.log(response);
      //       }).catch((error) => {
      //         console.error(error);
      //       });
      // }

      addCity: function () {
        console.log(this.newCity);
        console.log(this.newCity.value);
        this.newCities.push(this.newCity.value);
      },

      deleteCity: function (index) {
        console.log(index);
        console.log(this.newCities);
        this.newCities.splice(index, 1);
      },

      mounted() {
        this.$refs.address.focus();
      },


      /**
       *
       * @param {Object} addressData
       * @param {Object} placeResultData
       * @param {String} id
       */
      getAddressData: function(addressData, placeResultData, id){
        this.address = addressData;
      },


/*      checkEnter (object) {
        console.log('CHECKING ENTER');
        console.log(object);
      },*/



      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.crews[this.editedIndex], this.editedItem)
        } else {
          this.crews.push(this.editedItem)
        }
        this.close()
      }
    }
  }
  // crewdata = [{
  //   "crewname" : "Berlin",
  //   "cities" : "Berlin, Potsdamm",
  //   "country" : "Deutschland",
  // }, {
  //   "crewname" : 'Airfurt',
  //   "cities" : 'Erfurt, Weimar',
  //   "country" : 'Deutschland',
  // },{
  //   "crewname" : 'Amsterdamm',
  //   "cities" : 'Amsterdamm',
  //   "country" : 'Niederlande'
  // }];
  //
  // titles = [{
  //   prop: "crewname",
  //   label: "Crew"
  // }, {
  //   prop: "cities",
  //   label: "City / Cities"
  // }, {
  //   prop: "country",
  //   label: "Country"
  // }]
</script>

<style scoped>

  @import "https://unpkg.com/vue-good-table@2.5.3/dist/vue-good-table.css";
  @import "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css;";
  @import "https://cdnjs.cloudflare.com/ajax/libs/vuetify/1.0.18/vuetify.min.css";
  @import "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons";

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  #crews {
    padding-left: 25%;
    padding-right: 25%;
  }


  .del {
    margin-left: -18%;
  }

  #search {
    float: right;
  }

  label {
    text-align: left;
  }

  .help_is-danger {
    font-size: small;
    color: red;
  }

</style>
