<template>
  <tr v-if="type === 'header'" :class="getClass()" class="rowWrapper">
    <th class="name">{{ $t('crews.crewlist.label.crewname') }}</th>
    <th class="city">{{ $t('crews.crewlist.label.cities') }} ({{ $t('crews.crewlist.label.country') }})</th>
  </tr>
  <tr v-else class="rowWrapper content" :class="getClass()" v-on:click="selectCrew()">
    <td class="name">{{ crew.name }}</td>
    <td class="city">{{ getCities(crew) }}</td>
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
            return crew.cities.map(city => {
                var res = city.name
                if(city.hasOwnProperty("country") && typeof city.country !== "undefined" && city.country !== null && city.country !== "") {
                    res += "(" + city.country + ")"
                } else {
                    res += " (" + this.$t("crews.countryUndefined") + ")"
                }
                return res
            }).join(", ")
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
  .role {
    .colorProfileThirdly();
    padding: @padding;
    font-size: 0.7em;
    border-radius: 0.5em;
    margin: 0.2em;
  }
  .noTablet {
    @media @tablet-down {
      display: none;
    }
  }
</style>
