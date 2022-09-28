import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";

import * as kpay from './kpay/release/kpay_companion.js';
import * as kpay_common from '../common/kpay/kpay_common.js';

kpay.initialize();

const STANDARD_TIME_TOGGLE_KEY = "standard_time";
const COLOR_THEME = "color_theme";

setDefaultSetting(STANDARD_TIME_TOGGLE_KEY, false)
setDefaultSetting(COLOR_THEME, {
    name: "Just White",
    value: {
      primaryLabel: "white", 
      primaryContainer: "#394d00", 
      secondaryLabel: "#fafdfd", 
      secondaryContainer: "#434931", 
      tertiaryLabel: "#4fd8eb", 
      backgroundArc: "#2e3132",
      surfaceVariant: "#46483c"
    }
  })

function setDefaultSetting(key, value) {
    let extantValue = settingsStorage.getItem(key);
    if (extantValue === null) settingsStorage.setItem(key, JSON.stringify(value));
    sendValue(key, settingsStorage.getItem(key));
}
  
// Settings have been changed
settingsStorage.onchange = function(evt) {
    if (evt.oldValue !== evt.newValue) {
        sendValue(evt.key, evt.newValue);
    }
}

// Settings were changed while the companion was not running
if (me.launchReasons.settingsChanged) {
  // Send the value of the setting
  sendValue(STANDARD_TIME_TOGGLE_KEY, settingsStorage.getItem(STANDARD_TIME_TOGGLE_KEY));
  sendValue(COLOR_THEME, settingsStorage.getItem(COLOR_THEME));
}

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}

function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

