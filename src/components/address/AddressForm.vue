<template>
  <div class="AddressSelect">
    <el-form
      ref="address"
      :model="address"
      @keyup.enter.native="submitForm(profileForm)">
      <el-form-item
        :label="$t('supporterForm.label.searchAddress')"
        prop="searchAddress">
        <div class="el-input"><input class="el-input__inner" ref="autocompleteAddress"/></div>
      </el-form-item>
      <el-form-item
        :label="$t('supporterForm.label.additional')"
        prop="additional">
        <el-input
          v-model="address.additional"/>
      </el-form-item>
      <el-form-item
        :label="$t('supporterForm.label.street')"
        prop="street">
        <el-input
          v-model="address.street"/>
      </el-form-item>
      <el-form-item
        :label="$t('supporterForm.label.zip')"
        prop="zip">
        <el-input
          v-model="address.zip"/>
      </el-form-item>
      <el-form-item
        :label="$t('supporterForm.label.placeofresidence')"
        prop="city">
        <el-input
          v-model="address.city"/>
      </el-form-item>
      <el-form-item
        :label="$t('supporterForm.label.country')"
        prop="country">
        <el-input
          v-model="address.country"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  const google=window.google
  export default {
    name: "AddressSelect",
    props: {
      address: {
        type: Object,
        default: function () {
          return {
          street: '',
          additional: '',
          zip: '',
          city: '',
          country: ''
          }}
      }
    },
    data() { 
      return {
        currentAddress: this.address
      }
    },
    mounted() {
      this.autocomplete = new google.maps.places.Autocomplete(
          (this.$refs.autocompleteAddress),
          {types: ['address']}
      );
      this.autocomplete.addListener('place_changed', () => {
        let place = this.autocomplete.getPlace();
        let ac = place.address_components;
        let city = ac.find(field => field.types.some(t => t === "locality")) //ac[0]["long_name"];
        let country = ac.find(field => field.types.some(t => t === "country")) //ac[ac.length-1]["long_name"];
        let street = ac.find(field => field.types.some(t => t === "route")) //ac[ac.length-1]["long_name"];
        let street_number = ac.find(field => field.types.some(t => t === "street_number")) //ac[ac.length-1]["short_name"];
        let zip = ac.find(field => field.types.some(t => t === "postal_code")) //ac[ac.length-1]["short_name"];

        if(typeof city !== "undefined") {
          this.address.city = city.long_name;
        }

        if(typeof zip !== "undefined") {
          this.address.zip = zip.short_name;
        }

        if(typeof country !== "undefined") {
          this.address.country = country.long_name;
        }

        if(typeof street !== "undefined") {
          var streetName = street.long_name;
          if (typeof street_number !== "undefined") {
            streetName = streetName + " " + street_number.long_name;
          }
          this.address.street = streetName;
        }
        this.$emit('currentAddress', this.address)
      });
    },
  }
</script>






