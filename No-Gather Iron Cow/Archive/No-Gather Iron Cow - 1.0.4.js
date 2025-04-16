// ==UserScript==
// @name        No-Gather Iron Cow
// @match       https://www.milkywayidle.com/game*
// @grant       none
// @version     1.0.4
// @author      AJman14
// ==/UserScript==

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
waitForElm("[class*='NavigationBar_minorNavigationLinks']").then((elm) => {

    let navLinkClass = document.querySelector("[class*='NavigationBar_minorNavigationLinks'] [class*='NavigationBar_minorNavigationLink']").className;
    let nav = "[class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked)";
    let link = "[class*=NavigationBar_navigationLink__]";
    let ngicItems = '[href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"]';
    let coicItems = ngicItems + ', [href*=".svg#cheesesmithing"], [href*=".svg#crafting"], [href*=".svg#tailoring"], [href*=".svg#cooking"], [href*=".svg#brewing"], [href*=".svg#alchemy"]';
    let coneItems = coicItems + ', [href*=".svg#enhancing"]';

    elm.insertAdjacentHTML("afterbegin", `

    <label class="` + navLinkClass + ` AJman14-NGIC" id="AJman14-NGIC">
        <svg role="img" aria-label="No Gathering" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/chat_icons_sprite.da3d6a12.svg#iron_cow"></use></svg>
        <span>No Gathering</span>
        <input id="ngicToggle" type="checkbox" onchange="saveSettings(this)">
    </label>
    <label class="` + navLinkClass + ` AJman14-NGIC" id="AJman14-NTIC">
        <svg role="img" aria-label="No Tutorial or Tasks" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/misc_sprite.426c5d78.svg#tasks"></use></svg>
        <span>No Tutorial or Tasks</span>
        <input id="nticToggle" type="checkbox" onchange="saveSettings(this)">
    </label>
    <label class="` + navLinkClass + ` AJman14-NGIC AJman14-COIC" id="AJman14-COIC">
        <svg role="img" aria-label="Combat Only" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/misc_sprite.426c5d78.svg#combat"></use></svg>
        <span>Combat Only</span>
        <input id="coicToggle" type="checkbox" onchange="saveSettings(this)">
    </label>
    <label class="` + navLinkClass + ` AJman14-NGIC AJman14-COIC" id="AJman14-CONE">
        <svg role="img" aria-label="No Enhancing" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/skills_sprite.57eb3a30.svg#enhancing"></use></svg>
        <span>No Enhancing</span>
        <input id="coneToggle" type="checkbox" onchange="saveSettings(this)" checked>
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

        /* Navigation Menu Items */
        ` + nav + `:has(.AJman14-NGIC #nticToggle:checked) ` + link + `.glowing {
            animation: none;
        }
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)),
        ` + nav + `:has(.AJman14-NGIC #nticToggle:checked) ` + link + `:has(svg > use:is([href*=".svg#tasks"])),
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)),
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)){
            pointer-events: none;
            cursor: not-allowed;
            background: #7772;
            color: #999;
        }
        ` + nav + ` ` + link + ` svg:has( > use:is(` + ngicItems + `)),
        ` + nav + `:has(.AJman14-NGIC #nticToggle:checked) ` + link + ` svg:has( > use:is([href*=".svg#tasks"])),
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + ` svg:has( > use:is(` + coicItems + `)),
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + ` svg:has( > use:is(` + coneItems + `)){
            filter: brightness(0.7) grayscale(1);
        }
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*="NavigationBar_level"],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)) [class*="NavigationBar_level"],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)) [class*="NavigationBar_level"]{
            color: transparent;
        }
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*=NavigationBar_boost],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)) [class*=NavigationBar_boost],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)) [class*=NavigationBar_boost]{
            display: none;
        }
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*=NavigationBar_level]:after,
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)) [class*=NavigationBar_level]:after,
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)) [class*=NavigationBar_level]:after{
            content: "N/A";
            color: #999;
        }
        ` + nav + ` ` + link + `:has(svg > use:is(` + ngicItems + `)) [class*=NavigationBar_experienceBar],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked) ` + link + `:has(svg > use:is(` + coicItems + `)) [class*=NavigationBar_experienceBar],
        ` + nav + `:has(.AJman14-NGIC #coicToggle:checked):has(.AJman14-NGIC #coneToggle:checked) ` + link + `:has(svg > use:is(` + coneItems + `)) [class*=NavigationBar_experienceBar]{
            display: none;
        }
    </style>

    `)

    if (localStorage.getItem('ngicToggle') == 'checked'){
        document.getElementById('ngicToggle').checked = true;
    }
    if (localStorage.getItem('nticToggle') == 'checked'){
        document.getElementById('nticToggle').checked = true;
    }
    if (localStorage.getItem('coicToggle') == 'checked'){
        document.getElementById('coicToggle').checked = true;
    }
    if (localStorage.getItem('coneToggle') == 'unchecked'){
        document.getElementById('coneToggle').checked = false;
    }

});

function saveSettings(el){
    if (el.checked){
        localStorage.setItem(el.id, 'checked');
    } else {
        localStorage.setItem(el.id, 'unchecked');
    }
}
