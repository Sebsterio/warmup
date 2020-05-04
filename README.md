# Warm Up Family Memory Lane

[warmup.netlify.app](https://warmup.netlify.app/)

## Features

- Animated and interactive 3D model
- Add images, videos, and Youtube embeds
- Database sync

## TODO

#### Current task

#### Next

- change submit text to 'link not valid' when disabled
- automatic localStorage backup of current db (separate key from manual backup)
- restore locaStorage backup in case of firebase download failure (correct db)
- remove-items UI panel

#### Juice

- replace HTML entities with SVG to normalize the look across browsers
- animated transition when images change
- add zoom on mobile
- add animations (with some X axis variation)
- change photo when not in view
- settings panel -> localStorage (don't save url settings)
- pin items on click -> localStorage (don't sync pinned props)
- option to disable interactivity and run CSS animation (better suited for extended use)
- upload audio (local only OR play random one)
- change bg (local only?)

## Known bugs

- database upload replaces entire DB with the uploaded item (fixed?)

## How to use

### ULR params

Add parameters in the url:  
`?` - begin query string  
`&` - separator  
e.g. `warmup.netlify.app?edit&speed=1`

[//]: # "Remember double space at end each of line"

`edit` - show controls  
`speed=_N` - animation speed (default: -0.05)  
`disableYT` - skip Youtube embeds  
`forceYT` - never skip Youtube embeds (priority)  
`disableVid` - skip video files  
`disableImg` - skip images  
`interval=_N` - media cycling interval (default: 1000; 0 = off)  
`ignorePinned` - don't prevent pinned files from cycling  
`ignorePriority` - don't show priority files first
`house=_*` - user profile

### Console methods

Open dev tools (`Ctr + Shif + I` or right-click and 'inspect')  
Select 'Console' tab  
Type a function call and press `Enter`

`houseApp.makeBackup()` - save allMedia in localStorage  
`houseApp.restoreBackup()` - retrieve and update view

### Development

```
$ npm i
$ npm run watch
```
