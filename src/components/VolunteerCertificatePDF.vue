<template>
  <!--<el-button icon="el-icon-download" v-on:click="pdfgen">{{ $t('household.buttons.download') }}</el-button>-->
  <div>
    <div class="header"><strong>{{ $t("profile.volunteering-certificate.header") }}</strong></div>

    <div v-if="canDownloadCert">{{ $t("profile.volunteering-certificate.desc.allowed") }}</div>
    <div v-else>{{ $t("profile.volunteering-certificate.desc.denied") }}</div>
    <el-button v-if="canDownloadCert" v-loading="imagesLoaded" icon="el-icon-download" class="vca-full-width cert-button" v-on:click="pdfgen" >{{ $t("profile.actions.volunteering-certificate") }}</el-button>
  </div>
</template>

<script>
    import Vue from 'vue'
    import pdfmake from 'pdfmake'
    import moment from 'moment'
    import Loading from 'element-ui'

    export default {
        name: "VolunteerCertificatePDF",    
        props: {
            "profile": {
                "required": true
            }
        },
        data() {
            return {
                images: {},
                imageCount: 5,
                currentImageCount: 0
            }
        },
        created() {
            this.init()
        },
        computed: {
          imagesLoaded () {
            return this.currentImageCount !== this.imageCount
          },
          canDownloadCert() {
            return this.isActive && this.isLongTimeSupporter
          },
          isActive() {
            if (this.profile !== "undefined" && this.profile.supporter !== "undefined") {
              return this.profile.supporter.active == "active"
            }
            return false
          },
          isLongTimeSupporter() {
            var now = Date.now();
            // 6 months
            const difference = 178 * 24 * 60 * 60 * 1000;
            return (now - this.profile.created) >= difference;
          }
        },
        methods: {
            init: function() {
              var that = this;
              this.toDataURL('http://localhost/assets/vca/file/header.png', (function(data) { that.images.header = data; that.currentImageCount++ }))
              this.toDataURL('http://localhost/assets/vca/file/background.png', (function(data) { that.images.footer = data; that.currentImageCount++ }))
              this.toDataURL('http://localhost/assets/vca/file/logo.png', (function(data) { that.images.logo = data; that.currentImageCount++ }))
              this.toDataURL('http://localhost/assets/vca/file/freak.png', (function(data) { that.images.freak = data; that.currentImageCount++ }))
              this.toDataURL('http://localhost/assets/vca/file/signaturemd.png', (function(data) { that.images.signature = data; that.currentImageCount++ }))
            },
            toDataURL: function(url, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('get', url);
                xhr.responseType = 'blob';
                xhr.onload = function() {
                  var fr = new FileReader();
                  fr.onload = function() {
                    callback(this.result);
                  };
                  fr.readAsDataURL(xhr.response); // async call
                };
                xhr.send();
            },
            pdfgen: function () {
                var pdfMake = require('pdfmake/build/pdfmake.js');
                if (pdfMake.vfs == undefined){
                  var pdfFonts = require('pdfmake/build/vfs_fonts.js');
                  pdfMake.vfs = pdfFonts.pdfMake.vfs;
                }
                var docDefinition = {
                  //userPassword: '123',
                  ownerPassword: '123456',
                  permissions: {
                    printing: 'lowResolution',
                    modifying: false,
                    copying: false,
                    annotating: true,
                    fillingForms: true,
                    contentAccessibility: false,
                    documentAssembly: true
                  },
                  // inhalt des PDFs
                  content: [
                    {
                      // Freak image
                      image: this.images.freak,
                      width: 150,
                      height: 150,
                      absolutePosition: { x: 400, y: 500 }
                    },
                    {
                      // Footer image
                      image: this.images.footer,
                      height: 400,
                      absolutePosition: { x: 0, y: 600 }
                    },
                    {
                      // Logo image
                      image: this.images.logo,
                      width: 200,
                      height: 100,
                      absolutePosition: { x: 200, y: 680 }
                    },
                    {
                      // Header cloud image
                      image: this.images.header,
                      width: 400,
                      height: 100,
                      absolutePosition: { x: 100, y: 50 }
                    },
                    {
                      // Image signature
                      image: this.images.signature,
                      width: 130,
                      height: 65,
                      absolutePosition: { x: 200, y: 475 }
                    },
                    {
                      text: this.profile.supporter.fullName,
                      style: 'supporter',
                      alignment: 'center'
                    },
                    {
                      text: '(*' + this.$d(new Date(this.profile.birthday)) + ')',
                      style: 'birthdate',
                      alignment: 'center'
                    },
                    {
                      text: this.$t("profile.volunteering-certificate.since").replace('%since%', moment(new Date(this.profile.created)).format("MM.YYYY")).replace('%crew%', this.profile.supporter.crew.name),
                      style: 'since',
                      alignment: 'center'
                    },
                    {
                      text: this.$t("profile.volunteering-certificate.description1"),
                      style: 'desc1',
                      alignment: 'center'
                    },
                    {
                      text: this.$t("profile.volunteering-certificate.description2"),
                      style: 'desc2',
                      alignment: 'center'
                    },
                    {
                      text: this.$t("profile.volunteering-certificate.created").replace('%date%', moment(Date.now()).format('DD.MM.YYYY')),
                      style: 'created',
                      alignment: 'left'
                    },
                    {
                      text: this.$t("profile.volunteering-certificate.signature"),
                      style: 'signature',
                      alignment: 'left'
                    },
                    {
                      text: [
                        'Danke\n',
                        this.profile.firstName
                      ],
                      style: 'thanks',
                      alignment: 'center',
                      absolutePosition: { x: 327, y: 525 }
                    }
                  ],
                  footer: {
                    columns: [
                      { 
                        text: this.$t("profile.volunteering-certificate.organisation"),
                        alignment: 'center',
                        margin: [0,10,0,0]
                      }
                    ]
                  },
                  styles: {
                    supporter: {
                      fontSize: 18,
                      bold: true,
                      alignment: 'justify',
                      color: 'white',
                      margin: [0,30,0,0]
                    },
                    birthdate: {
                      fontSize: 16,
                      bold: true,
                      color: 'white',
                      alignment: 'justify',
                    },
                    since: {
                      fontSize: 14,
                      margin: [20,80,20,0]
                    },
                    desc1: {
                      fontSize: 14,
                      margin: [30,10,30,0]
                    },
                    desc2: {
                      fontSize: 14,
                      margin: [30,10,30,0]
                    },
                    created: {
                      fontSize: 12,
                      margin: [30,150,30,0]
                    },
                    signature: {
                      fontSize: 12,
                      margin: [30,20,30,0]
                    },
                    thanks: {
                      bold: true,
                      fontSize: 10
                    },
                    organisation: {
                      bold: false,
                      alignment: 'center',
                      fontSize: 12
                    }
                  }
                }
                pdfMake.createPdf(docDefinition).download('Ehrenamtsbescheinigung_VivaConAgua.pdf')
	      }
    }
}
</script>

<style scoped>
  .el-icon-download {
    width: 100%;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .header {
    margin-top: 10px;
  }
  .cert-button {
    margin: 10px 0;
  }
</style> 
