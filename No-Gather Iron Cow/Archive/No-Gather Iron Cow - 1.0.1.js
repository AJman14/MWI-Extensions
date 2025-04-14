// ==UserScript==
// @name        No-Gather Iron Cow
// @match       https://www.milkywayidle.com/game*
// @grant       none
// @version     1.0.1
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
    elm.insertAdjacentHTML("afterbegin", `

    <label class="NavigationBar_minorNavigationLink__31K7Y AJman14-NGIC" id="AJman14-NGIC">
        <svg role="img" aria-label="No-Gather Iron Cow" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/chat_icons_sprite.da3d6a12.svg#iron_cow"></use></svg>
        <span>No-Gather Iron Cow</span>
        <input id="ngicToggle" type="checkbox" onchange="saveSettings(this)">
    </label>
    <label class="NavigationBar_minorNavigationLink__31K7Y AJman14-NGIC" id="AJman14-NTIC">
        <svg role="img" aria-label="No-Tutorial Iron Cow" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/chat_icons_sprite.da3d6a12.svg#iron_cow"></use></svg>
        <span>No Tutorial or Tasks</span>
        <input id="nticToggle" type="checkbox" onchange="saveSettings(this)">
    </label>
    <label class="NavigationBar_minorNavigationLink__31K7Y AJman14-NGIC" id="AJman14-COIC">
        <svg role="img" aria-label="Combat-Only Iron Cow" class="Icon_icon__2LtL_ Icon_tiny__nLKFY" width="100%" height="100%"><use href="/static/media/chat_icons_sprite.da3d6a12.svg#iron_cow"></use></svg>
        <span>Combat Only</span>
        <input id="coicToggle" type="checkbox" onchange="saveSettings(this)">
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
        #AJman14-NGIC:not(:has(input:checked)) ~ .AJman14-NGIC{
            display: none;
        }

        /* Navigation Menu Items */
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked):has(.AJman14-NGIC #nticToggle:checked) [class*=NavigationBar_navigationLink__].glowing {
            animation: none;
        }
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"])),
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked):has(.AJman14-NGIC #nticToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#tasks"])),
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #coicToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"], [href*=".svg#cheesesmithing"], [href*=".svg#crafting"], [href*=".svg#tailoring"], [href*=".svg#cooking"], [href*=".svg#brewing"])){
            pointer-events: none;
            cursor: not-allowed;
            background: #7772;
            color: #999;
        }
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked) [class*=NavigationBar_navigationLink__] svg:has( > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"])),
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked):has(.AJman14-NGIC #nticToggle:checked) [class*=NavigationBar_navigationLink__] svg:has( > use:is([href*=".svg#tasks"])),
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #coicToggle:checked) [class*=NavigationBar_navigationLink__] svg:has( > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"], [href*=".svg#cheesesmithing"], [href*=".svg#crafting"], [href*=".svg#tailoring"], [href*=".svg#cooking"], [href*=".svg#brewing"])){
            filter: brightness(0.7) grayscale(1);
        }
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"])) [class*="NavigationBar_level"],
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #coicToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"], [href*=".svg#cheesesmithing"], [href*=".svg#crafting"], [href*=".svg#tailoring"], [href*=".svg#cooking"], [href*=".svg#brewing"])) [class*="NavigationBar_level"]{
            color: transparent;
        }
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"])) [class*=NavigationBar_boost],
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #coicToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"], [href*=".svg#cheesesmithing"], [href*=".svg#crafting"], [href*=".svg#tailoring"], [href*=".svg#cooking"], [href*=".svg#brewing"])) [class*=NavigationBar_boost]{
            display: none;
        }
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"])) [class*=NavigationBar_level]:after,
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #coicToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"], [href*=".svg#cheesesmithing"], [href*=".svg#crafting"], [href*=".svg#tailoring"], [href*=".svg#cooking"], [href*=".svg#brewing"])) [class*=NavigationBar_level]:after{
            content: "N/A";
            color: #999;
        }
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #ngicToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"])) [class*=NavigationBar_experienceBar],
        [class*=NavigationBar_navigationLinks]:has(.AJman14-NGIC #coicToggle:checked) [class*=NavigationBar_navigationLink__]:has(svg > use:is([href*=".svg#milking"], [href*=".svg#foraging"], [href*=".svg#woodcutting"], [href*=".svg#cheesesmithing"], [href*=".svg#crafting"], [href*=".svg#tailoring"], [href*=".svg#cooking"], [href*=".svg#brewing"])) [class*=NavigationBar_experienceBar]{
            opacity: 0;
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

});

function saveSettings(el){
    if (el.checked){
        localStorage.setItem(el.id, 'checked');
    } else {
        localStorage.setItem(el.id, 'unchecked');
    }
}
