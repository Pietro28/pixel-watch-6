/*
* K·Pay Integration Library - v3.0.1 - Copyright Kiezel 2020
* Last Modified: 2019-11-04
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

var S=null,O=null,C=null,K=null,R=null,T=null,q=null,F=null,N=null;function J(){me.permissions.granted("access_internet")||G(gettext("InternetRequired")),kc.kp8(U,B,Q)}function U(n){n&&kcfg.KPAY_SHOW_PAID_APP_POPUP&&z()}function Y(n){return document.getElementById(n)}function j(n,t){n&&(n.style.display=t?"inline":"none")}function z(){var n=Y("paidAppPopup");Y("btnPaidAppOk").onclick=function(t){j(n,!1)},Y("btnPaidAppAlreadyPaid").onclick=function(t){var e=Y("alreadyPaidPopup");Y("btnAlreadyPaidOk").onclick=function(n){j(e,!1)},j(e,!0),j(n,!1)},j(n,!0)}function B(n,t){switch(n){case 5:H(gettext("PurchaseStarted"),t);break;case 6:H(gettext("CompletePurchase"),t);break;case 7:L()}}function G(n){S||(S=Y("kpay_errorDialog"),O=Y("kpay_errorMessage")),O.text=n,V(),j(S,!0),X()}function H(n,t){C||(C=Y("kpay_trialEndedDialog"),K=Y("kpay_trialEndedMessage"),R=Y("kpay_trialEndedCode"),T=Y("kpay_alreadyPaidMessage")),R.text=t,K.text=n,T.text=gettext("AlreadyPaidMsg"),V(),j(C,!0),X()}function L(){N||(N=Y("kpay_purchaseSuccessDialog")),V(),j(N,!0),C&&j(C,!1),X("celebration-long"),setTimeout(Q,5e3)}function Q(){W(),S&&j(S,!1),C&&j(C,!1),N&&j(N,!1)}function V(){q||(q=Y("kpay_timeInDialog"),F=function(){var n=new Date,t=("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2);q.text=t},clock.addEventListener("tick",function(){q&&"inline"==q.style.display&&F()})),q&&(F(),j(q,!0))}function W(){q&&j(q,!1)}function X(n){display.poke(),vibration.start(n||"nudge-max")}J();