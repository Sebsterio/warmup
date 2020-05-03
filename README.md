# Warm Up Family Memory Lane

[warmup.netlify.app](https://warmup.netlify.app/)

## Features

- Animated and interactive 3D model
- Add images, videos, and Youtube embeds
- Database sync

## Known bugs

- database upload replaces entire DB with the uploaded item (fixed?)

## TODO

- user profiles (firebase auth)
- switch between public and private database
- share private DB along with preferences (forceYT, speed, etc.)
- automatic localStorage backup (separate key from manual backup)
- restore locaStorage backup in case of firebase download failure
- replace HTML entities with SVG to normalize the look across browsers
- bundle JS ?

#### Juice

- animated transition when images change
- change photo when not in view
- settings panel -> localStorage (don't save url settings)
- pin items on click -> localStorage (don't sync pinned props)
- remove-items UI panel
- option to disable interactivity and run CSS animation (better suited for extended use)
- upload audio (local only OR play random one)
- change bg (local only?)

## How to use

### ULR params

Add parameters in the url:  
`?` - begin query string  
`&` - separator  
e.g. `warmup.netlify.app?edit&speed=1`

[//]: # "Remember double space at end each of line"

`edit` - show controls  
`speed=N` - animation speed (default: -0.05)  
`disableYT` - skip Youtube embeds  
`forceYT` - never skip Youtube embeds (priority)  
`disableVid` - skip video files  
`disableImg` - skip images  
`interval=N` - media cycling interval (default: 1000; 0 = off)  
`ignorePinned` - don't prevent pinned files from cycling  
`ignorePriority` - don't show priority files first

### Console methods

Open dev tools (`Ctr + Shif + I` or right-click and 'inspect')  
Select 'Console' tab  
Type a function call and press `Enter`

`houseApp.makeBackup()` - save allMedia in localStorage  
`houseApp.restoreBackup()` - retrieve and update view
