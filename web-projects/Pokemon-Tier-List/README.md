# Pokemon-Tier-List

Hello everyone, I'm Dypa, your favourite forming developer :D
This project is a little replica of a tier maker page and I used the pokémon starters as an example.
Of course this page can be used for many other pages and I think it can be kinda useful and is also funny to rank things(but pokemons especially).
And if you someone disagrees with my opinions it's fine, it just means your opinions are wrong!

Now jokes aside, I'm going to explain what the Javascript does(Html and Css are kinda self explanatory).
The Javascript isn't difficult but it can be confusing(actually I think I'm gonna figure some ways to leave my code more readable, but this will happen in the next episode! Stay tuned!). Also before someone says that I could everything with some frameworks I'm already studying some, and I have some huge projects in mind(again, stay tuned!)

Let's get started, won't be long, just a very simple explanation, I grant for sure that the people that are reading already know what they are reading, just gonna explain the logic. 

show and hideOverlay I'm gonna explain them soon but not now

#1 DROP ZONES
- So first ofc we enable the pokemon images to be draggable trhough html and   with give them dragstart as event listener(standard)
- Here I created 2 functions which are setGridHeight and updateDropZoneHeight. The first will be very helpful in many situations and it just says that when we reach the limit of images that can be in a row, we add height to the dropzone so that we have another row.
The second functions choose the limit of images in a row depending on the width of the window
- These 2 functions are so important that we use them almost everywhere, inside the resize event, dragleave and drop events. What do these eventListeners is self explanatory so let's go ahead
- Now we have the settings window which is another html code that we insert trhough the click of .settings icons and when we do it we use the showOverlay() to create a shadow on the page except for the new setting Window we just inserted
- This setting window has 3 main parts:
- the color picker, where we can change the corrisponding .tier background color by clicking on the colors
- the tier-name(refuse to explain it)
- and the modifiers buttons that let us add or remove rows above and/or below.
For adding I had to create a unique id through uniqueIdGenerator() to avoid the new rows to share the same name by creating a random 8 digit code to add to their id. I also had to enable the drag and drop on these new rows, cause it doesn't work automatically(even if the rows already were in a forEach but that's another story xD)

And that's kinda it, like I said didn't want to go too deep cause it would take like hours so hope this is enough for you to better understand the code

See ya,
Dypa the best or the beast(your choice QwQ)

P.S.
There is a final part that I wanted to use to put a min width for the window but it dind't work so RIP :(
