# How To Install Extensions
Go to the extension you want, copy the entire file contents into your Steam Extension Manager, give it a name, and click `Save and Reload`.

To access your extensions: In the top-left of your game, click `Game` > `Manage Extensions`.

## Custom Styles
A customizable theme that makes some nice changes throughout the game. I think you'll find the QoL tweaks to be pretty nice. Try it out!
- Set your own colors in `Settings` > `Game`
  - Save and load your themes!
    - **Load**: `Ctrl`+`#` (0-9)
    - **Save**: `Ctrl`+`Shift`+`#`
    - **Reset**: `Ctrl`+`Shift`+`Alt`+`#`
- Right-click a color picker to copy the current color to your clipboard
- Skilling/combat items are more condensed
- Moderator icons are now golden
  - Both moderator and admin icons have a slight glow
- Added text before the icon in the header explaining what your current action is
- Prepended your HP/MP bars in the header with "Your Stats"
- *Includes the Stylized Extension Manager*

Also check out the Custom Styles > Add-Ons subfolder! (installed as separate extensions)

## Stylized Extension Manager
- *You don't need this if you are using Custom Styles*
- Styles the buttons of the Extension Manager to match the game's theme
- Makes active extensions more visible
- Tweaks the textarea resizing to only allow vertical resizing
- Allows scrolling if your extension list gets too long

## No-Gather Iron Cow
Adds several checkbox toggles directly below the Settings button to disable the clickability of navigation items:
**Toggle with `Ctrl + Alt + I`**
- Disable gathering items (Milking, Foraging, and Woodcutting)
  - Disable Tasks and the Tutorial glow if you're a No-Tutorial Icon Cow
  - Combat-Only mode (Disables Cheesesmithing, Crafting, Tailoring, Cooking, Brewing, and Alchemy)
    - Combat-Only enables an additional toggle for Enhancing
- Settings are saved per-character

---

**These extensions are created for the Steam version of the game**. You could probably also get them to work in your browser with an extension like Tampermonkey, but YMMV, as I have not written my styles with extra browser compatibility.

*I named some of the files with CSS extensions to read the styles more easily, but they are NOT Cascading Style Sheets. These are JavaScript files meant to be copied into your Extension Manager.*
