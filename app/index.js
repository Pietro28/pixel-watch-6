import clock from 'clock';
import { gettext } from "i18n";
import { today, goals } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import { preferences } from 'user-settings'
import { me as appbit } from "appbit";
import { user } from "user-profile";
import { FitFont } from 'fitfont'
import * as document from "document";
import * as messaging from "messaging";
import * as fs from "fs";
import * as util from "../common/utils";

// required imports
import * as kpay from './kpay/release/kpay.js';
import * as kpay_common from '../common/kpay/kpay_common.js';
import './kpay/release/kpay_filetransfer.js';
import './kpay/release/kpay_dialogs.js';
import './kpay/release/kpay_time_trial.js';	

/**** KPAY INIT - REQUIRED ***/
kpay.initialize();

const DayNames = [gettext('day_short_0'), gettext('day_short_1'), gettext('day_short_2'), gettext('day_short_3'), gettext('day_short_4'), gettext('day_short_5'), gettext('day_short_6')]

const clockLabel = new FitFont({ id: 'clockLabel', font: 'Product_Sans_108', halign: 'middle', valign: 'baseline', letterspacing: -1 })
const dateLabelDay = new FitFont({ id: 'dateLabelDay', font: 'Product_Sans_Bold_24', halign: 'end', valign: 'middle' })
const dateLabelNum = new FitFont({ id: 'dateLabelNum', font: 'Product_Sans_Bold_24', halign: 'start', valign: 'middle' })
const hbLabel = new FitFont({ id: 'hbLabel', font: 'Product_Sans_24', halign: 'middle', valign: 'middle' })
const calsLabel = new FitFont({ id: 'calsLabel', font: 'Product_Sans_24', halign: 'middle', valign: 'middle' })
const statLabel = new FitFont({ id: 'statLabel', font: 'Product_Sans_24', halign: 'middle', valign: 'middle' })
const ampmLabel = new FitFont({ id: 'ampmLabel', font: 'Product_Sans_Bold_24', halign: 'middle', valign: 'middle' })

const dateSection = document.getElementById("date")
const calsSection = document.getElementById("calories")
const statSection = document.getElementById("stat")
const hbSection = document.getElementById("hb")
const statIcon = document.getElementById("statIcon")
const screenButton = document.getElementById("screenButton");
const arcHb = document.getElementById("arcHb");
const arcCals = document.getElementById("arcCals");
const arcStat = document.getElementById("arcStat");
const arcCalsAnimation = document.getElementById("arcCalsAnim");
const arcStatAnimation = document.getElementById("arcAnim");

const statisticsIcon = ['stat_steps.png', 'stat_dist.png', 'stat_azm.png']
const statisticsValues = [today.adjusted.steps, today.adjusted.distance, today.adjusted.activeZoneMinutes.total]
const statisticsGoalsBitmap = [1, 1, 1, 0]
const statisticsGoals = [goals.steps, goals.distance, goals.activeZoneMinutes.total]
const DISTANCE_INDEX = 1

// In settings you can force the military format even if your account is configured to show the standard time
const STANDARD_TIME_TOGGLE_KEY = "standard_time";
const COLOR_THEME = "color_theme";
var standardTime = false;

let statIndex = 0;
let lastIndex = 0
let checkHBZones = false
if (appbit.permissions.granted("access_user_profile")) {
    checkHBZones = true
}

if (appbit.permissions.granted("access_activity")) {
    if (today.local.elevationGain !== undefined) {
        statisticsGoalsBitmap[3] = 1
    }
}

let alwaysOnAvailable = false
if (appbit.permissions.granted("access_aod")) {
    if (display.aodAvailable) {
        display.aodAllowed = true;
        alwaysOnAvailable = true
    }
}

function resetStatistic() {
    statIndex = 0;
    lastIndex = 0;
    arcStat.sweepAngle = 0
}

function nextStatistic() {
    lastIndex = statIndex;
    statIndex = (statIndex + 1) % statisticsValues.length;
    updateStats()
}

function updateStatistic() {
    statisticsValues = [today.adjusted.steps, today.adjusted.distance, today.adjusted.activeZoneMinutes.total]
    if (statisticsGoalsBitmap[3] !== 0) {
        statisticsValues.push(today.adjusted.elevationGain)
        statisticsGoals.push(goals.elevationGain)
        statisticsIcon.push('stat_floors.png')
    }
    statIcon.href = statisticsIcon[statIndex];
    if (statisticsValues[statIndex].toString().length >= 5) {
        statLabel = new FitFont({ id: 'statLabel', font: 'Product_Sans_22', halign: 'middle', valign: 'middle' })
    }
    else {
        statLabel = new FitFont({ id: 'statLabel', font: 'Product_Sans_24', halign: 'middle', valign: 'middle' })
    }
    if (statIndex == DISTANCE_INDEX)
    {
        statLabel.text = (Math.round(statisticsValues[statIndex] / 1000 * 100) / 100).toFixed(2);
    }
    else
    {
        statLabel.text = statisticsValues[statIndex];
    }
    if (statisticsGoalsBitmap[statIndex] !== 0) {  
        const newAngle = statisticsValues[statIndex] < statisticsGoals[statIndex] ? (statisticsValues[statIndex] / statisticsGoals[statIndex] * 300) : 300;
        if (Math.round(newAngle) !== arcStat.sweepAngle) {
            if (statIndex !== lastIndex)
            {
                arcStat.sweepAngle = 0
            }
            arcStatAnimation.to = newAngle
            statSection.animate("enable")
            lastIndex = statIndex
        }
    }
    else {
        arcStat.sweepAngle = 0
    }
}

const updateCaloriesStat = () => {
    let value = today.adjusted.calories;
    let goal = goals.calories;

    if (value.toString().length >= 5) {
        calsLabel = new FitFont({ id: 'calsLabel', font: 'Product_Sans_22', halign: 'middle', valign: 'middle' })
    }
    else {
        calsLabel = new FitFont({ id: 'calsLabel', font: 'Product_Sans_24', halign: 'middle', valign: 'middle' })
    }
    calsLabel.text = value;
    const newAngle = value < goal ? (value / goal * 300) : 300;
    if (Math.round(newAngle) !== arcCals.sweepAngle) {
        arcCalsAnimation.to = newAngle
        calsSection.animate("enable")
    }
}

const updateClock = () => {
    const now = new Date()
    let hours = now.getHours()
    showAMPM(hours)
    if (preferences.clockDisplay === '12h' || standardTime) {
        hours = hours % 12 || 12
    }
    const minutes = now.getMinutes()
    let hoursText = hours < 10 ? "0" + hours : hours;
    let minutesText = minutes < 10 ? "0" + minutes : minutes;
    clockLabel.text = hoursText + ":" + minutesText;
    dateLabelDay.text = util.monoDigits(DayNames[now.getDay()].toUpperCase()) + now.getDate()
    dateLabelNum.text = util.zeroPad(now.getDate())
}

function getHBArcAngle(hb) {
    const zone = user.heartRateZone(hb);
    let value;
    switch (zone) {
        case "out-of-range":
            value = 300 / 4;
            break;
        case "fat-burn":
            value = 300 / 4 * 2;
            break;
        case "cardio":
            value = 300 / 4 * 3;
            break;
        case "peak":
            value = 300;
            break;
        case "below-custom":
            value = 300 / 3 * 1;
            break;
        case "custom":
            value = 300 / 3 * 2;
            break;
        case "above-custom":
            value = 300;
            break;
    }
    return value;
}

function updateHb() {
    if (!bodyPresenceSensor.present || hrm.heartRate == null) {
        hbLabel.text = "--";
        arcHb.sweepAngle = 0
    }
    else {
        hbLabel.text = hrm.heartRate;

        if (checkHBZones) {
            arcHb.sweepAngle = getHBArcAngle(hrm.heartRate)
        }
    }
}

const updateStats = () => {
    if (!display.on) {
        return;
    }
    updateHb()
    updateStatistic()
}

const showAMPM = (hours) => {
    if (standardTime) {
        ampmLabel.style.visibility = "visible"
        if (hours > 12) {
            ampmLabel.text = "PM"
        }
        else {
            ampmLabel.text = "AM"
        }
    }
    else {
        ampmLabel.style.visibility = "hidden"
    }
}


function switchAODMode(on) {
    if (on) {
        hrm.stop();
        dateSection.style.display = "none";
        calsSection.style.display = "none";
        statSection.style.display = "none";
        hbSection.style.display = "none";
    }
    else {
        dateSection.style.display = "inline";
        calsSection.style.display = "inline";
        statSection.style.display = "inline";
        hbSection.style.display = "inline";
    }
}

var hrm = new HeartRateSensor({ frequency: 1 });
hrm.addEventListener("reading", () => { // get current heart rate
    // console.log("hrm reading")
    updateHb()
})

display.addEventListener("change", () => {
    if (display.on) {
        // console.log("display on")
        //bodyPresenceSensor.start();
        // if(alwaysOnAvailable) {
        //     display.aodActive ? switchAODMode(true) : switchAODMode(false);
        // }
        hrm.start();
        updateStats();
        updateClock();
    } else {
        // console.log("display off")
        //resetStatistic();
        hrm.stop();
    }
});
hrm.start();

var bodyPresenceSensor = new BodyPresenceSensor();
bodyPresenceSensor.addEventListener("reading", () => {
    if (!bodyPresenceSensor.present) {
        // console.log("away from body")
        hrm.stop();
    }
    else {
        // console.log("on body")
        if (display.on) {
            hrm.start();
        }
    }
    updateHb()
});
bodyPresenceSensor.start();

clock.granularity = 'minutes'
clock.ontick = (evt) => {
    updateClock();
    updateStats();
    updateCaloriesStat();
}

// setInterval(updateStats, POLL_TIME);

// Switch to the next state when the user taps the screen
screenButton.addEventListener("mousedown", (evt) => {
    nextStatistic()
})

updateClock()
updateStats()
updateCaloriesStat()
setInterval(updateStats, 5000)
setInterval(updateCaloriesStat, 5000)

// SETTINGS

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

function loadSettings() {
    try {
        return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    } catch (ex) {
        console.log(ex);
        // Defaults
        var defaults =  {
            standard_time: false,
            color_theme:
            {
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
            }
        }
        // console.log(`defaults has color_theme = ${defaults.hasOwnProperty(color_theme)} and settings.color_theme.values is ${settings.color_theme.values}`)
        return defaults;
    }
}

function setClassElementColor(classname, value) {
    var x = document.getElementsByClassName(classname);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.fill = value;
    }
}

function applyTheme(settings) {
    setClassElementColor("primaryLabel", settings.primaryLabel);
    setClassElementColor("icon", settings.primaryLabel);
    setClassElementColor("secondaryLabel", settings.secondaryLabel);
    setClassElementColor("tertiaryLabel", settings.tertiaryLabel);
    setClassElementColor("backgroundArc", settings.backgroundArc);
}

let applySettings = function () {
    if (!settings) {
        return;
    }
    try {
        // console.log('apply settings')
        if (settings.hasOwnProperty(STANDARD_TIME_TOGGLE_KEY)) {
            standardTime = !!settings.standard_time;
        }
        var vals;
        if (settings.hasOwnProperty(COLOR_THEME) && settings.color_theme.values) {
            // console.log(`settings.color_theme = ${settings.color_theme.values[0].name}`)
            vals = settings.color_theme.values[0].value;
            applyTheme(vals)
        }
        updateClock();
        saveSettings();
    } catch (ex) {
        console.log(ex);
    }
}

function saveSettings() {
    fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

let onsettingschange = function (data) {
    if (!data) {
        return;
    }
    settings = data;
    applySettings();
}


messaging.peerSocket.onmessage = function (evt) {
    if (!settings) {
        settings = {};
    }
    settings[evt.data.key] = evt.data.value;
    onsettingschange(settings);
}


let settings = loadSettings();
applySettings();
// Register for the unload event
appbit.onunload = saveSettings();
