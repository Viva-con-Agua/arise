<template>
  <tr v-if="type === 'header'" :class="getClass()" class="rowWrapper">
    <th class="name">{{ $t('crewlist.label.crewname') }}</th>
    <th class="city">{{ $t('crewlist.label.cities') }}</th>
    <th class="country">{{ $t('crewlist.label.country') }}</th>
  </tr>
  <tr v-else :class="getClass()" class="rowWrapper content">
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
