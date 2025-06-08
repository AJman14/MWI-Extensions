// ==UserScript==
// @name         No-Gather Iron Cow
// @description  Disable the gathering navigation menu links
// @match        https://www.milkywayidle.com/*
// @match        https://test.milkywayidle.com/*
// @version      1.2.0
// @author       AJman14
// @icon         https://www.google.com/s2/favicons?sz=64&domain=milkywayidle.com
// @grant        none
// ==/UserScript==

var selector = "[class*='NavigationBar_minorNavigationLinks']";
var exists = document.querySelector(selector);
var character = '';

const observer = new MutationObserver(mutations => {
    if (document.querySelector(selector)) {
        if (!exists) {
            //console.log("Navigation detected. Adding Iron Cow options.");
            printContent(selector);
        }
        exists = true;
    } else if (exists) {
        exists = false;
        //console.log("Navigation has been removed. Watching for it to reappear!");
    }
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});

function printContent(selector){
    
    character = document.querySelector('[class*=Header_header__] [class*=CharacterName_characterName] [class*=CharacterName_name] > span').textContent + '-';

    let navLinkClass = document.querySelector("[class*='NavigationBar_minorNavigationLinks'] [class*='NavigationBar_minorNavigationLink']").className;
    let nav = "[class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked)";
    let link = "[class*=NavigationBar_navigationLink__]";
    let ngicItems = '[href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"]';
    let coicItems = ngicItems + ', [href*=".svg#cheesesmithing"], [href*=".svg#crafting"], [href*=".svg#tailoring"], [href*=".svg#cooking"], [href*=".svg#brewing"], [href*=".svg#alchemy"]';
    let coneItems = coicItems + ', [href*=".svg#enhancing"]';

    document.querySelector(selector).insertAdjacentHTML("afterbegin", `

    <label class="` + navLinkClass + ` AJman14-NGIC" id="AJman14-NGIC">
        <svg role="img" aria-label="No Gathering" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/chat_icons_sprite.da3d6a12.svg#iron_cow"></use></svg>
        <span>No Gathering</span>
        <input id="ngicToggle" type="checkbox">
    </label>
    <label class="` + navLinkClass + ` AJman14-NGIC" id="AJman14-NTIC">
        <svg role="img" aria-label="No Tutorial or Tasks" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/misc_sprite.426c5d78.svg#tasks"></use></svg>
        <span>No Tutorial or Tasks</span>
        <input id="nticToggle" type="checkbox">
    </label>
    <label class="` + navLinkClass + ` AJman14-NGIC AJman14-COIC" id="AJman14-COIC">
        <svg role="img" aria-label="Combat Only" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/misc_sprite.426c5d78.svg#combat"></use></svg>
        <span>Combat Only</span>
        <input id="coicToggle" type="checkbox">
    </label>
    <label class="` + navLinkClass + ` AJman14-NGIC AJman14-COIC" id="AJman14-CONE">
        <svg role="img" aria-label="No Enhancing" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/skills_sprite.57eb3a30.svg#enhancing"></use></svg>
        <span>No Enhancing</span>
        <input id="coneToggle" type="checkbox" checked>
    </label>
    <style type="text/css">
        /* Navigation Toggle Items */
        .AJman14-NGIC{
            justify-content: flex-start;
            align-items: center;
            user-select: none;
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
        ` + nav + `:has(.AJman14-NGIC #nticToggle:checked) ` + link + `.glowing {
            animation: none;
        }
        /* Header task and popup task widget */
        body:has(.AJman14-NGIC #ngicToggle:checked):has(.AJman14-NGIC #nticToggle:checked) [class*=Header_questInfo],
        body:has(.AJman14-NGIC #ngicToggle:checked):has(.AJman14-NGIC #nticToggle:checked) [class*=QuestModal_questModalContainer]{
            display: none;
        }
        /* Main navigation link */
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)),
        ` + nav + `:has(.AJman14-NGIC #nticToggle:checked) ` + link + `:has(svg > use:is([href*=".svg#tasks"])),
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)),
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)){
            pointer-events: none;
            cursor: not-allowed;
            background: #7772;
            color: #999;
        }
        /* Icons */
        ` + nav + ` ` + link + ` svg:has( > use:is(` + ngicItems + `)),
        ` + nav + `:has(.AJman14-NGIC #nticToggle:checked) ` + link + ` svg:has( > use:is([href*=".svg#tasks"])),
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + ` svg:has( > use:is(` + coicItems + `)),
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + ` svg:has( > use:is(` + coneItems + `)){
            filter: brightness(0.7) grayscale(1);
        }
        /* Current level */
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*="NavigationBar_level"],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)) [class*="NavigationBar_level"],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)) [class*="NavigationBar_level"]{
            display: none;
        }
        /* After current level text */
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*=NavigationBar_textContainer]:after,
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)) [class*=NavigationBar_textContainer]:after,
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)) [class*=NavigationBar_textContainer]:after{
            content: "N/A";
            color: #999;
        }
        /* Tea level boost */
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*=NavigationBar_boost],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)) [class*=NavigationBar_boost],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)) [class*=NavigationBar_boost]{
            display: none;
        }
        /* Level progress bar */
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*=NavigationBar_experienceBar],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)) [class*=NavigationBar_experienceBar],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)) [class*=NavigationBar_experienceBar]{
            display: none;
        }
        /* MWI Tools text */
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) .insertedSpan,
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)) .insertedSpan,
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)) .insertedSpan{
            display: none;
        }
    </style>

    `)

    document.querySelectorAll('.AJman14-NGIC input').forEach(function(input) {
        input.addEventListener('change', function(input) {
            saveSettings(input.target);
        });
        //console.log('Bound click to ' + input.id);
    });

    if (localStorage.getItem(character+'ngicToggle') == 'checked'){
        document.getElementById('ngicToggle').checked = true;
    }
    if (localStorage.getItem(character+'nticToggle') == 'checked'){
        document.getElementById('nticToggle').checked = true;
    }
    if (localStorage.getItem(character+'coicToggle') == 'checked'){
        document.getElementById('coicToggle').checked = true;
    }
    if (localStorage.getItem(character+'coneToggle') == 'unchecked'){
        document.getElementById('coneToggle').checked = false;
    }
}

function saveSettings(el){
    //console.log(character+el.id);
    if (el.checked){
        localStorage.setItem(character+el.id, 'checked');
        //console.log('Saving settings for ' + el.id + ' (checked)');
    } else {
        localStorage.setItem(character+el.id, 'unchecked');
        //console.log('Saving settings for ' + el.id + ' (unchecked)');
    }
}

document.addEventListener('keydown', function(event) {
    if (event.altKey && event.ctrlKey && event.key === 'i') {
        let checkbox = document.getElementById('ngicToggle');
        //console.log('CTRL + Alt + I was pressed');
        if (checkbox.checked == true){
            checkbox.checked = false;
        } else {
            checkbox.checked = true;
        }
        saveSettings(checkbox);
    }
});
