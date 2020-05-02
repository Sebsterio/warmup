# CSS 3D model & shared media collection

[warmup.netlify.app](https://warmup.netlify.app/)

Animated and interactive 3D model  
UI to add images, videos, and Youtube embed links to database

## TODO

- vid prominent (type: special)
- option to not change videos
- firebase fail fallback
- Alina mobile bug

#### Juice

- preload media
- animated transition when images change
- settings panel + localStorage (don't save url settings)

## How to use

Add parameters in the url:  
`?` - begin query string  
`&` - separator  
e.g. `warmup.netlify.app?edit&speed=1`

### ULR params

`edit` - show controls  
`speed=N` - animation speed (default: -0.05)  
`disableYT` - skip Youtube embeds  
`disableVid` - skip video files  
`disableImg` - skip images
`interval=N` - image-change interval (default: 1000)
