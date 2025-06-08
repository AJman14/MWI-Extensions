// ==UserScript==
// @name         No-Gather Iron Cow
// @description  Disable the gathering navigation menu links
// @match        https://www.milkywayidle.com/*
// @match        https://test.milkywayidle.com/*
// @version      1.3.0
// @author       AJman14
// @icon         https://www.google.com/s2/favicons?sz=64&domain=milkywayidle.com
// @grant        none
// ==/UserScript==

//var selector = "[class*='NavigationBar_minorNavigationLinks']";
var ngicGame = "[class*='GamePage_gamePage__']";// Add classes to this instead of looking at toggled checkboxes
var ngicHeader = "[class*='Header_header__'] [class*='CharacterName_characterName__']";
var existsHeader = document.querySelector(ngicHeader);
var ngicSettings = "[class*='SettingsPanel_gameTab'] [class*='SettingsPanel_infoGrid']";
var existsSettings = document.querySelector(ngicSettings);
var character = '';

let ngicActive = ".ngicToggle[class*=GamePage_gamePage__]";
let link = "[class*=NavigationBar_navigationLink__]";
let ngicItems = '[href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"]';
let coicItems = ngicItems + ', [href*=".svg#cheesesmithing"], [href*=".svg#crafting"], [href*=".svg#tailoring"], [href*=".svg#cooking"], [href*=".svg#brewing"], [href*=".svg#alchemy"]';
let coneItems = coicItems + ', [href*=".svg#enhancing"]';

document.head.insertAdjacentHTML("beforeend", `<style type="text/css">
    .ngicSettings{
        display: flex;
        flex-wrap: wrap;
        gap: 12px 6px;
        flex-direction: column;
        align-items: flex-start !important;
    }
    /* Toggle Items */
    .AJman14-NGIC{
        min-width: 0;
        max-width: 320px;
        overflow-y: auto;
        border-radius: 4px;
        padding: 8px;
        background-color: var(--color-midnight-700);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;
        user-select: none;
        cursor: pointer;
    }
    .AJman14-NGIC input{
        appearance: none;
        border: 1.5px solid #fff;
        width: 1em;
        height: 1em;
        position: relative;
        margin-left: auto;
        cursor: pointer;
    }
    .AJman14-NGIC input:checked:after{
        content:"";
        position: absolute;
        inset: 2px;
        background: #fff;
    }
    #AJman14-NGIC:not(:has(input:checked)) ~ .AJman14-NGIC,
    #AJman14-COIC:not(:has(input:checked)) ~ .AJman14-COIC{
        display: none;
    }

    /* Tutorial glow */
    ` + ngicActive + `.nticToggle ` + link + `.glowing {
        animation: none;
    }
    /* Header task and popup task widget */
    ` + ngicActive + `.nticToggle [class*=Header_questInfo],
    ` + ngicActive + `.nticToggle [class*=QuestModal_questModalContainer]{
        display: none;
    }
    /* Main navigation link */
    ` + ngicActive + ` ` + link + `:has(svg > use:is(` + ngicItems + `)),
    ` + ngicActive + `.nticToggle ` + link + `:has(svg > use:is([href*=".svg#tasks"])),
    ` + ngicActive + `.coicToggle ` + link + `:has(svg > use:is(` + coicItems + `)),
    ` + ngicActive + `.coicToggle.coneToggle ` + link + `:has(svg > use:is(` + coneItems + `)){
        pointer-events: none;
        cursor: not-allowed;
        background: #7772;
        color: #999;
    }
    /* Icons */
    ` + ngicActive + ` ` + link + ` svg:has( > use:is(` + ngicItems + `)),
    ` + ngicActive + `.nticToggle ` + link + ` svg:has( > use:is([href*=".svg#tasks"])),
    ` + ngicActive + `.coicToggle ` + link + ` svg:has( > use:is(` + coicItems + `)),
    ` + ngicActive + `.coicToggle.coneToggle ` + link + ` svg:has( > use:is(` + coneItems + `)){
        filter: brightness(0.7) grayscale(1);
    }
    /* Current level */
    ` + ngicActive + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*="NavigationBar_level"],
    ` + ngicActive + `.coicToggle ` + link + `:has(svg > use:is(` + coicItems + `)) [class*="NavigationBar_level"],
    ` + ngicActive + `.coicToggle.coneToggle ` + link + `:has(svg > use:is(` + coneItems + `)) [class*="NavigationBar_level"]{
        display: none;
    }
    /* After current level text */
    ` + ngicActive + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*=NavigationBar_textContainer]:after,
    ` + ngicActive + `.coicToggle ` + link + `:has(svg > use:is(` + coicItems + `)) [class*=NavigationBar_textContainer]:after,
    ` + ngicActive + `.coicToggle.coneToggle ` + link + `:has(svg > use:is(` + coneItems + `)) [class*=NavigationBar_textContainer]:after{
        content: "N/A";
        color: #999;
    }
    /* Tea level boost */
    ` + ngicActive + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*=NavigationBar_boost],
    ` + ngicActive + `.coicToggle ` + link + `:has(svg > use:is(` + coicItems + `)) [class*=NavigationBar_boost],
    ` + ngicActive + `.coicToggle.coneToggle ` + link + `:has(svg > use:is(` + coneItems + `)) [class*=NavigationBar_boost]{
        display: none;
    }
    /* Level progress bar */
    ` + ngicActive + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*=NavigationBar_experienceBar],
    ` + ngicActive + `.coicToggle ` + link + `:has(svg > use:is(` + coicItems + `)) [class*=NavigationBar_experienceBar],
    ` + ngicActive + `.coicToggle.coneToggle ` + link + `:has(svg > use:is(` + coneItems + `)) [class*=NavigationBar_experienceBar]{
        display: none;
    }
    /* MWI Tools text */
    ` + ngicActive + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) .insertedSpan,
    ` + ngicActive + `.coicToggle ` + link + `:has(svg > use:is(` + coicItems + `)) .insertedSpan,
    ` + ngicActive + `.coicToggle.coneToggle ` + link + `:has(svg > use:is(` + coneItems + `)) .insertedSpan{
        display: none;
    }
</style>`)

function saveSettings(ngicOption, mode = 'toggle'){
    let checkbox = document.getElementById(ngicOption);
    if ((mode == 'toggle' && localStorage.getItem(character+ngicOption) != 'checked') || (mode == 'init' && localStorage.getItem(character+ngicOption) == 'checked') || (mode == 'init' && ngicOption == 'coneToggle' && localStorage.getItem(character+ngicOption) == null)){
        localStorage.setItem(character+ngicOption, 'checked');
        document.querySelector(ngicGame).classList.add(ngicOption);
        if (checkbox != null){
            checkbox.checked = true;
        }
        //console.log('Saving settings for ' + ngicOption + ' (checked)');
    } else {
        localStorage.setItem(character+ngicOption, 'unchecked');
        document.querySelector(ngicGame).classList.remove(ngicOption);
        if (checkbox != null){
            checkbox.checked = false;
        }
        //console.log('Saving settings for ' + ngicOption + ' (unchecked)');
    }
}

document.addEventListener('keydown', function(event) {
    if (event.altKey && event.ctrlKey && event.key === 'i') {
        saveSettings('ngicToggle')
        //console.log('Toggled Iron Cow');
    }
});

const ngicObserver = new MutationObserver(mutations => {
    if (document.querySelector(ngicSettings)) {
        if (!existsSettings) {
            //console.log("Settings page detected. Adding Iron Cow options.");
            ngicPrintContent(ngicSettings);
        }
        existsSettings = true;
    } else if (existsSettings) {
        existsSettings = false;
        //console.log("Settings page has been removed. Watching for it to reappear!");
    }
});
ngicObserver.observe(document.body, {
    childList: true,
    subtree: true
});

const ngicHeaderObserver = new MutationObserver(mutations => {
    if (document.querySelector(ngicHeader)) {
        if (!existsHeader) {
            //console.log("Header detected.");
            character = document.querySelector('[class*=Header_header__] [class*=CharacterName_characterName] [class*=CharacterName_name] > span').textContent + '-';
            saveSettings('ngicToggle', 'init');
            saveSettings('nticToggle', 'init');
            saveSettings('coicToggle', 'init');
            saveSettings('coneToggle', 'init');
        }
        existsHeader = true;
    } else if (existsHeader) {
        existsHeader = false;
        //console.log("Header has been removed. Watching for it to reappear!");
    }
});
ngicHeaderObserver.observe(document.body, {
    childList: true,
    subtree: true
});

function ngicPrintContent(ngicSettings){

    let labelClass = document.querySelector("[class*='SettingsPanel_label']").className;
    let valueClass = document.querySelector("[class*='SettingsPanel_value']").className;

    document.querySelector(ngicSettings).insertAdjacentHTML("afterbegin", `
        <div class="`+labelClass+`">Iron Cow:</div>
            <div class="`+valueClass+` ngicSettings">
                <label class="AJman14-NGIC" id="AJman14-NGIC" for="ngicToggle">
                    <svg role="img" aria-label="No Gathering" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/chat_icons_sprite.da3d6a12.svg#iron_cow"></use></svg>
                    <span>No Gathering</span>
                    <input id="ngicToggle" type="checkbox">
                </label>
                <label class="AJman14-NGIC" id="AJman14-NTIC" for="nticToggle">
                    <svg role="img" aria-label="No Tutorial or Tasks" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/misc_sprite.426c5d78.svg#tasks"></use></svg>
                    <span>No Tutorial or Tasks</span>
                    <input id="nticToggle" type="checkbox">
                </label>
                <label class="AJman14-NGIC AJman14-COIC" id="AJman14-COIC" for="coicToggle">
                    <svg role="img" aria-label="Combat Only" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/misc_sprite.426c5d78.svg#combat"></use></svg>
                    <span>Combat Only</span>
                    <input id="coicToggle" type="checkbox">
                </label>
                <label class="AJman14-NGIC AJman14-COIC" id="AJman14-CONE" for="coneToggle">
                    <svg role="img" aria-label="No Enhancing" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/skills_sprite.57eb3a30.svg#enhancing"></use></svg>
                    <span>No Enhancing</span>
                    <input id="coneToggle" type="checkbox" checked>
                </label>
            </div>
        </div>
    `)

    document.querySelectorAll('.AJman14-NGIC input').forEach(function(input) {
        input.addEventListener('change', function(input) {
            saveSettings(input.target.id);
        });
        //console.log('Bound click to ' + input.id);
    });

    saveSettings('ngicToggle', 'init');
    saveSettings('nticToggle', 'init');
    saveSettings('coicToggle', 'init');
    saveSettings('coneToggle', 'init');

}
