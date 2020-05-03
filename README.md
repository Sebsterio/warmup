# CSS 3D model & shared media collection

[warmup.netlify.app](https://warmup.netlify.app/)

Animated and interactive 3D model  
UI to add images, videos, and Youtube embed links to database

## TODO

- TODO: containers.map(c, i => {element: c, index: i})
- use allMedia.media.id insted of allMedia[index]
- vid prominent? (type: special)
- option to not cycle videos
- firebase fail fallback
- Alina mobile bug
- add option to disable interactivity and run CSS animation (for extended use)

#### Juice

- preload media
- animated transition when images change
- settings panel + localStorage (don't save url settings)
- upload audio (local only?) (play random one?)
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
`interval=N` - cycle media interval (default: 1000; off: 0)
