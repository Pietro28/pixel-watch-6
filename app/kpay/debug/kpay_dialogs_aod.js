/*
* K·Pay Integration Library - v3.0.1 - Copyright Kiezel 2020
* Last Modified: 2019-12-20
*
* BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO
* WARRANTY FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE
* LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
* HOLDERS AND/OR OTHER PARTIES PROVIDE THE LIBRARY "AS IS"
* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED,
* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE
* RISK AS TO THE QUALITY AND PERFORMANCE OF THE LIBRARY IS WITH YOU.
* SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL
* NECESSARY SERVICING, REPAIR OR CORRECTION.
*
* IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN
* WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY
* MODIFY AND/OR REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE
* LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
* INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR
* INABILITY TO USE THE LIBRARY (INCLUDING BUT NOT LIMITED TO LOSS
* OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY
* YOU OR THIRD PARTIES OR A FAILURE OF THE LIBRARY TO OPERATE WITH
* ANY OTHER SOFTWARE), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN
* ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

/*****************************************************************************************/
/*                 GENERATED CODE BELOW THIS LINE - DO NOT MODIFY!                       */
/*****************************************************************************************/

import document from "document";
import { vibration } from "haptics";
import { display } from "display";
import clock from "clock";
import { me } from "appbit";
import { gettext } from "i18n";
import * as kc from './kpay_core.js';
import * as kcfg from '../kpay_config.js';
import * as kcm from '../../../common/kpay/kpay_common.js';

var E = null, x = null, F = null, R = null, T = null, Z = null, $ = null, O = null, z = null, I = null, L = null, nn = !1, en = !1;

function N() {
    console.log("KPay_dialogs - kpay_dialogs initialize called!"), display.addEventListener("change", ln), 
    me.permissions.granted("access_internet") || (console.log("KPay - ERROR: internet permission not enabled!"), 
    W(gettext("InternetRequired"))), kc.kp8(J, H, B);
}

function J(n) {
    console.log("KPay_dialogs - _mainLibInitialized()"), n && kcfg.KPAY_SHOW_PAID_APP_POPUP && (console.log("KPay_dialogs - Fresh install detected; showing paid app popup..."), 
    U());
}

function q(n) {
    return document.getElementById(n);
}

function G(n, e) {
    n && (n.style.display = e ? "inline" : "none");
}

function U() {
    on(), Z = q("paidAppPopup"), q("btnPaidAppOk").onclick = function(n) {
        G(Z, !1), tn();
    }, q("btnPaidAppAlreadyPaid").onclick = function(n) {
        $ = q("alreadyPaidPopup"), q("btnAlreadyPaidOk").onclick = function(n) {
            G($, !1), tn();
        }, G($, !0), G(Z, !1);
    }, G(Z, !0);
}

function H(n, e) {
    switch (console.log("KPay_dialogs - _handleEvent(e == " + n + ", extraData == " + e + ")"), 
    n) {
      case 5:
        Y(gettext("PurchaseStarted"), e);
        break;

      case 6:
        Y(gettext("CompletePurchase"), e);
        break;

      case 7:
        j();
    }
}

function W(n) {
    on(), console.log("KPay_dialogs - _showError() - message == " + n), E || (E = q("kpay_errorDialog"), 
    x = q("kpay_errorMessage")), x.text = n, Q(), G(E, !0), X();
}

function Y(n, e) {
    G($, !1), G(Z, !1), on(), console.log("KPay_dialogs - _showTrialEnded() - message == " + n + "; code == " + e), 
    F || (F = q("kpay_trialEndedDialog"), R = q("kpay_trialEndedMessage"), T = q("kpay_trialEndedCode"), 
    O = q("kpay_alreadyPaidMessage")), T.text = an(e), R.text = n, O.text = gettext("AlreadyPaidMsg"), 
    Q(), G(F, !0), X();
}

function j() {
    on(), console.log("KPay_dialogs - _showPurchaseSuccess()"), L || (L = q("kpay_purchaseSuccessDialog")), 
    Q(), G(L, !0), F && G(F, !1), X("celebration-long"), setTimeout(B, 5e3);
}

function B() {
    console.log("KPay_dialogs - _hideAlert()"), V(), E && G(E, !1), F && G(F, !1), L && G(L, !1), 
    tn();
}

function Q() {
    z || (z = q("kpay_timeInDialog"), I = function() {
        var n = new Date(), e = ("0" + n.getHours()).slice(-2) + ":" + ("0" + n.getMinutes()).slice(-2);
        z.text = e;
    }, clock.addEventListener("tick", function() {
        z && "inline" == z.style.display && I();
    })), z && (I(), G(z, !0));
}

function V() {
    z && G(z, !1);
}

function X(n) {
    display.poke(), vibration.start(n || "nudge-max");
}

function an(n) {
    for (var e = ""; n > 0; ) e = String.fromCharCode(16 + n % 10) + e, n = n / 10 | 0;
    return e;
}

function on() {
    en || (nn = display.aodAllowed, en = !0, nn && me.permissions.granted("access_aod") && (console.log("KPay_dialogs - Setting display.aodAllowed to false"), 
    display.aodAllowed = !1));
}

function tn() {
    en = !1, nn && me.permissions.granted("access_aod") && (console.log("KPay_dialogs - Setting display.aodAllowed to true"), 
    display.aodAllowed = !0);
}

function ln() {
    en && me.permissions.granted("access_aod") && display.aodAllowed && (console.error("ERROR: you are not allowed to set `display.aodAllowed` to `true` while K-Pay is showing dialogs!"), 
    display.aodAllowed = !1);
}

N();

