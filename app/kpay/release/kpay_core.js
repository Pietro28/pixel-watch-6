/*
* K·Pay Integration Library - v3.0.1 - Copyright Kiezel 2020
* Last Modified: 2020-08-07
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

import * as fs from "fs";
import * as messaging from 'messaging';
import * as kcm from '../../../common/kpay/kpay_common.js';
import * as kcfg from '../kpay_config.js';
import * as kp from './kpay.js';
export var kp0=null,n=!1,t={t:!1,i:!1,u:!1},e=null,u=null,a=null,o=null,f=!1,s=function(){return!1},p=function(){},g=function(){},y=function(){},k=function(){},m=function(){},P=function(){return!1};var KPAY_APP_ID = 52802895;
export function init(){E()?(kp0={sl:!1,it:(new Date).getTime()},k(!0),p(!0),kp11()):(I(),k(!1),p(!1)),messaging.peerSocket.addEventListener("open",m),0===messaging.peerSocket.readyState&&m()}export function useFileTransfer(){n=!0}export function processMessageFromCompanion(n){M(n)?x(n):n&&"start"===n.purchase?startPurchase():n&&"cancel"===n.purchase&&cancelPurchase()}function v(){null!==u&&(clearTimeout(u),u=null)}export function kp1(n){t.u=!1,kp2(n)}export function kp2(n){v(),t.u||(n&&_(),null===u&&(u=setTimeout(function(){kp2(!0)},15e3)))}export function kp3(){v(),t.u=!0}function _(){t.u=!1,a||(a=Math.round(4294967295*Math.random())),h(D(KPAY_APP_ID,a,b(kcfg.KPAY_TEST_MODE,!f)))}function b(e,u){var a=1;return e&&(a|=2),(u||t.i)&&(a|=4),a|=32,n&&(a|=64),a}function h(n){try{if(0===messaging.peerSocket.readyState)return void messaging.peerSocket.send(n)}catch(n){console.error(JSON.stringify(n))}A(n)}function A(n){kp1(!1)}export function startPurchase(){kp0.sl||(kp0.te=!0,t.i=!0,t.u=!1,kp11(),kp1(!0))}export function cancelPurchase(){h(w()),kp0.sl||(kp0.te=!1,t.i=!1,kp11(),kp3(),y(),e=null)}function D(n,t,e){return{isKpayMsg:!0,type:0,appId:n,random:t,flags:e}}function w(){return{isKpayMsg:!0,type:3}}function M(n){return kcm.isKPayMessage(n)&&1===n.type}export function getStatus(){return kp0.sl?"licensed":kp0.ts&&!kp0.te?"trial":"unlicensed"}function x(n){var u=n.serverResponse;if("licensed"==u.status)kp0.sl=!0,kp11(),kp5(7,null,!1),t.t=!1,kp3();else if("unlicensed"==u.status){kp0.sl=!1,kp11(),7===e&&(e=null),t.t=!0;var a=u.paymentCode,f=a!=o;o=a,"waitForUser"==u.purchaseStatus?kp5(5,a,f):"inProgress"==u.purchaseStatus&&kp5(6,a,f),kp1(!0)}else P(u)||kp1(!0)}export function kp5(n,u,a){if(e!==n||a){e=n;try{s(n,u)||7===n&&!t.t||g(n,u)}catch(n){console.error("KPay - Error in event callback:"+n)}}}export function kp6(){return e}export function kp7(){e=null}export function setEventHandler(n){s=n}export function kp8(n,t,e){p=n,g=t,y=e}export function kp9(n,t,e){f=!0,k=n,m=t,P=e}function E(){try{var n=fs.statSync("kps");return!(n&&n.size)}catch(n){return!0}}function I(){E()||(kp0=fs.readFileSync("kps","cbor"))}export function kp11(){fs.writeFileSync("kps",kp0,"cbor")}