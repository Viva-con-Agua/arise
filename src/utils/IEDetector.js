const defaultVersion = -1

export default class IEDetector {
    constructor() {
        this.version = IEDetector.getInternetExplorerVersion()
    }

    isIE () {
        return this.version !== defaultVersion
    }

    static getInternetExplorerVersion () {
        var rV = defaultVersion; // Return value assumes failure.

        if (navigator.appName == 'Microsoft Internet Explorer' || navigator.appName == 'Netscape') {
            var uA = navigator.userAgent;
            var rE = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

            if (rE.exec(uA) != null) {
                rV = parseFloat(RegExp.$1);
            }
            /*check for IE 11*/
            else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                rV = 11;
            }
        }
        return rV;
    }
}