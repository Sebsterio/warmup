# CSS 3D model & shared media collection

[warmup.netlify.app](https://warmup.netlify.app/)

Animated and interactive 3D model  
UI to add images, videos, and Youtube embed links to database

## TODO

- upload bug
- flatness bug
- embed proportions ffs
- conditionally enable clicks if forceYT is on

#### Juice

- animated transition when images change

- firebase fail fallback (locaStorage)
- settings panel -> localStorage (don't save url settings)
- pin items -> localStorage

- add option to disable interactivity and run CSS animation (for extended use)
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
