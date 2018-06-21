<template>
  <div id="crewForm">
    <el-form
            :model="crewForm"
            :rules="rules"
            ref="CrewForm">
      <el-form-item
              label="Crewname:"
              prop="crewname">
        <el-input
                v-model="crewForm.CrewName"></el-input>
      </el-form-item>
        <el-form-item
            label="City/Cities:">
            <el-tag
                    :key="city"
                    v-for="city in Cities"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(city)">
                {{city}}
            </el-tag>
            <input
                    class="input-new-city"
                    v-if="inputVisible"
                    v-model="cityValue"
                    onfocus="value = ''"
                    type="text"
                    ref="autocomplete"
                    @keyup.enter.prevent="handleInputConfirm"
                    @blur="handleInputConfirm"
            />

            <el-button v-else class="button-new-tag" size="small">+ New City</el-button>
        </el-form-item>
        <el-form-item
                label="Country:"
                prop="country">
            <div id="CountryContent">
                frequently added:
                <el-radio-group
                    v-model="crewForm.country"
                    size="mini">
                <el-radio-button
                        label="Germany">Deutschland</el-radio-button>
                <el-radio-button
                        label="Austria">Österreich</el-radio-button>
                <el-radio-button
                        label="Switzerland">Schweiz</el-radio-button>
                <el-radio-button
                        label="Netherlands">Niederlande</el-radio-button>
            </el-radio-group></div>
            <el-input
                    v-model="crewForm.country"></el-input>
        </el-form-item>
        <el-button
                type="primary"
                @click.prevent="resetForm"
                icon="el-icon-close">Reset</el-button>
        <el-button
                type="primary"
                @click.prevent="submitForm"
                icon="el-icon-arrow-right">Sign Up</el-button>
    </el-form>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import InputTag from 'vue-input-tag'

    export default {

        name: "CrewForm",
        components: {
            VueGoogleAutocomplete
        },

        data() {
            return {
                address: '',
                crewForm: {
                    CrewName: '',
                    City: '',
                    Country: '',
                },
                Cities: [],
                inputVisible: true,
                cityValue: '',


                rules: {
                    CrewName: [
                        {required: true, message: 'Please input a name', trigger: 'blur'}
                    ],
                    City: [
                        {required: true, message: 'Please input at least 1 city', trigger: 'blur'}
                    ],
                    Country: [
                        {required: true, message: 'Please input a country', trigger: 'change'}
                    ],
                }
            }
        },

        methods: {
/*
            /!**
             * When the location found
             * @param {Object} addressData
             * @param {Object} placeResultData
             * @param {Object} id
             *!/
            getAddressData: function (addressData, placeResultData, id) {
                this.address = addressData;
            },*/

            submitForm(CrewForm) {
                this.$refs[CrewForm].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm(CrewForm) {
                this.$refs[CrewForm].resetFields();
            },

            handleClose(city) {
                this.Cities.splice(this.Cities.indexOf(city), 1);
            },

            handleInputConfirm() {
                let cityValue = this.cityValue;
                if (cityValue) {
                    this.Cities.push(cityValue);
                }
                this.cityValue = '';
            }
        },

        mounted() {
            this.autocomplete = new google.maps.places.Autocomplete(
                (this.$refs.autocomplete),
                {types: ['(cities)']}
            );
            this.autocomplete.addListener('place_changed', () => {
                let place = this.autocomplete.getPlace();
                let ac = place.address_components;
                let city = ac[0]["short_name"];
                this.cityValue = (`${city}`);
                console.log(`The user picked ${city}`);
            });

        }
    }
</script>

<style scoped>

    input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 100%;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }

    #CountryContent {
        float: left;
    }

    el-tag {
        float: left;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
        float: left;
    }

</style>
