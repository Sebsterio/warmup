# Warm Up Family Memory Lane

[warmup.netlify.app](https://warmup.netlify.app/) - 3D model only

[warmup.netlify.app?ui](https://warmup.netlify.app/?ui) - 3D model + UI

## Features

- Animated and interactive 3D model and media collection
- Support for images, videos, and Youtube embeds
- Items display randomly (avoiding duplicates) at a set interval, with option to prioritize or pin any item
- UI to edit collection
- Online storage
- User profiles
- Session persistence

## TODO

#### Current task

#### Next

- options panel

#### Juice

- add zoom on mobile
- more animations (with some X axis variation)
- settings panel -> localStorage (don't save url settings)
- pin items on click -> localStorage (don't sync pinned props)
- option to disable interactivity and use CSS animation (better suited for extended use)
- upload audio
- change bg

## Known bugs

- database upload replaces entire DB with the uploaded item (fixed?)

## How to use

### ULR params

Add parameters in the url:  
`?` - begin query string  
`&` - separator  
e.g. `warmup.netlify.app?edit&speed=1`

[//]: # "Remember double space at end each of line"

`ui` - show controls  
`speed=_N` - animation speed (default: -0.05)  
`disableYT` - skip Youtube embeds  
`forceYT` - never skip Youtube embeds (priority)  
`disableVid` - skip video files  
`disableImg` - skip images  
`interval=_N` - media cycling interval (default: 1000; 0 = off)  
`ignorePinned` - don't prevent pinned files from cycling  
`ignorePriority` - don't show priority files first
`house=_*` - user profile

### Console

Open dev tools (`Ctr + Shif + I` or right-click and 'inspect')  
Select 'Console' tab  
Type a function call and press `Enter`

`houseApp.makeBackup()` - save allMedia in localStorage  
`houseApp.restoreBackup()` - retrieve and update view

### Development

```
$ npm i
$ npm run dev
```
