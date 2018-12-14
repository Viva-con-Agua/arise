<template>
  <tr v-if="type === 'header'" :class="getClass()" class="rowWrapper">
    <th class="name">{{ $t('crews.crewlist.label.crewname') }}</th>
    <th class="city">{{ $t('crews.crewlist.label.cities') }} ({{ $t('crews.crewlist.label.country') }})</th>
  </tr>
  <tr v-else class="rowWrapper content" :class="getClass()" v-on:click="selectCrew()">
    <td class="name">{{ crew.name }}</td>
    <td class="city"><span v-for="cityGroup in getCities(crew)" style="display:block">{{ cityGroup }}</span></td>
  </tr>
</template>

<script>
    export default {
      name: 'TableRow',
      props: ['className', 'type', 'crew', 'errorState'],
      components: {
      },
      methods: {
        getClass: function () {
          return this.type + ' ' + this.className
        },
        selectCrew: function () {
          this.$emit('select-crew', this.crew)
        },
          getCities(crew) {
            return crew.cities.reduce((acc, city) => {
                var group = acc.find(g => g.country === city.country)
                if(typeof group !== "undefined") {
                    var index = acc.indexOf(group)
                    acc[index].cities.push(city)
                } else {
                    acc.push({ country: city.country, cities: [city] })
                }
                return acc
            }, []).map(group => {
                var res = group.cities.map(city => city.name).join(", ")
                if(group.hasOwnProperty("country") && typeof group.country !== "undefined" && group.country !== null && group.country !== "") {
                    res += " (" + group.country + ")"
                } else {
                    res += " (" + this.$t("crews.countryUndefined") + ")"
                }
                return res
            })
          }
      }
    }
</script>

<style scoped lang="less">
  @import "./assets/general.less";
  @import "./assets/responsive.less";
  @padding: 0.3em;
  .rowWrapper {
    height: 3em;
    padding: 1em 0;
    text-align: center;
    &.content {
      .colorProfileSecundary();
      cursor: pointer;
      &:hover {
        box-shadow: #shadow[secundary];
      }
    }
    &.odd {
      background-color: fadeout(#colors[primary], 80%);
    }
    th {
      .colorProfilePrimary();
      font-weight: bold;
      text-align: center;
    }
  }
  .noTablet {
    @media @tablet-down {
      display: none;
    }
  }
</style>
