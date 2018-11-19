<template>
  <tr v-if="type === 'header'" :class="getClass()" class="rowWrapper">
    <th class="name">{{ $vcaI18n.t('label.table.name') }}</th>
    <th class="city">{{ $t('label.table.city') }}</th>
    <th class="country">{{ $t('label.table.country') }}</th>
  </tr>
  <tr v-else :class="getClass()" class="rowWrapper content" v-on:click="callLink()">
    <td class="name">{{ crew.name }}</td>
    <td class="city">{{ crew.cities[0].name}}</td>
    <td class="country">{{ crew.cities[0].country }}</td>
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
        getCity: function () {

        },
        callLink: function () {
          this.$refs.profileLink.click()
        }
      }
    }
</script>

<style scoped lang="less">
  @import "./assets/general.less";
  @import "./assets/responsive.less";
  @padding: 0.3em;
  .rowWrapper {
    height: 2em;
    padding: 1em 0;
    &.content {
      .colorProfileSecundary();
      cursor: pointer;
      text-align: center;
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
    }
  }
  .role {
    .colorProfileThirdly();
    padding: @padding;
    font-size: 0.7em;
    border-radius: 0.5em;
    margin: 0.2em;
  }
  .image {
    width: 4em;
  }
  .noPhone {
    @media @small-tablet-down {
      display: none;
    }
  }
  .noTablet {
    @media @tablet-down {
      display: none;
    }
  }
</style>
