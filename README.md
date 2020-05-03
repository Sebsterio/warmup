# Warm Up Family Memory Lane

[warmup.netlify.app](https://warmup.netlify.app/)

## Features

- Animated and interactive 3D model
- Add images, videos, and Youtube embeds
- Database sync

## Known bugs

- no transformations (flat image) on Alina's up-to-date Chrome, Win10
- database upload replaces entire DB with the uploaded item (fixed?)

## TODO

- save and restore DB backup (localStorage)
- embed proportions ffs
- conditionally enable clicks if forceYT is on
- replace HTML entities with SVG to normalize the look across browsers

#### Juice

- animated transition when images change

- firebase download failure fallback (locaStorage)
- settings panel -> localStorage (don't save url settings)
- pin items on click -> localStorage (don't sync pinned props)

- remove-items UI panel
- option to disable interactivity and run CSS animation (better suited for extended use)
- upload audio (local only OR play random one)
- change bg (local only?)

## How to use

Add parameters in the url:  
`?` - begin query string  
`&` - separator  
e.g. `warmup.netlify.app?edit&speed=1`

### ULR params

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
