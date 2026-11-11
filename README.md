# Our Wedding

A static invitation for 24–26 November 2026 in Kanpur. It uses HTML, CSS, and a small JavaScript file. All imagery and fonts are included.

## Preview

Extract the ZIP and open `index.html` in a browser. You can also serve the repository folder with any static file server. The invitation content and calendar downloads work without a build step. The two venue cards embed Google Maps and require an internet connection.

## Edit

- `index.html` contains the text, events, and venue links. The cover currently reads “Our Wedding.”
- `style.css` contains colors, typography, and responsive layouts.
- `photos` contains the three supplied portraits, optimized for the web. The generated meadow artwork is `landscape.webp`.
- `calendar` contains individual and combined calendar files. Start times are stored in UTC and represent the published India Standard Time. Only start times were supplied. If you change a date, time, or venue, update the corresponding calendar file and the combined file. Update the countdown dates in `invite.js` if the wedding dates move.

## Deploy

Upload the site files to a static host so `index.html` is at the site root. Include all subfolders. No server, build command, or environment variables are needed. Choose the host's access settings before sharing the guest URL.

For Antideploy, upload the repository folder. The share card is configured for the suggested address `https://ritesh-weds-prerna.antideploy.app/`. If Antideploy assigns a different URL, replace `https://ritesh-weds-prerna.antideploy.app` in the three metadata URLs in `index.html` and upload the folder again. Share the public site URL after confirming that `/wedding-card.jpg` loads on it.

## Background music

The supplied MP3 is at `audio/wedding-song.mp3`. Music starts after the guest's first click or tap and loops at 12% volume where the browser supports volume control. The floating button plays, mutes, or unmutes the track. The mute choice is remembered for the browser session.

## Artwork and fonts

The meadow is generated artwork based on the reference video's muted olive wildflower field, hazy low hills, and vintage film palette. The portraits are supplied photographs. Allura and Cormorant Garamond are distributed under the SIL Open Font License included in `fonts`.
