# [overcl0ck]('https://overcl0ck.netlify.app')
A digital clock made of 360 analogue clocks.  
Made using the p5.js library.

## Interaction
* Click anywhere in the first quarter of the canvas to cycle through the modes.  
    currently available:
    * Dark Mode
    * Light Mode

* Click anywhere in the second quarter of the canvas to cycle through the colour skins for the hands of the clocks.
    currently available:
    * Red
    * Turquoise
    * Lavender
    * Orange

* Click anywhere in the left half of the canvas to toggle the visibility of the clocks.  

You can add more themes and modes by adding new objects in the corresponding space in `config.json`.


## Details on how the configurations work
Having the individual clock objects have their states denoted by hours and minutes seemed redundant, for the simple reason that the hour and minute hands are drawn to the same length, so they are indistinguishable, and since only multiples of 45 from 0 till 7 were needed for each state, all the individual angular states of a real clock in between these multiples wouldn't get utilized.  

So instead of using individual 'time' to calculate the angular state of every clock, the configurations for each state would be denoted by a two digit octal number, with each digit representing the angular state of the corresponding line in multiples of 45deg. Inside the digit-font-style data in `config.json`, for every font there is an individual string of configuration for every clock with 20 octal digits, denoting the ten individual states for the collective representation of digital numbers.
For example, if the configuration of the first clock in the array was:  
`00414140404100141414`  
then this configuration would get read by the code in chunks of two digits, which would mean that its state for drawing -  
a digital `1` would be `00`,  
a digital `2` would be `41`,  
a digital `3` would be `41`, and so on.  
And these individual states would be read as:
For a digital `2`, a `41` implies the first hand of the clock would be at a clockwise angle of `4*45deg = 180deg` from the vertical, and the second hand would be at a `1*45deg = 45deg` from the vertical, and so on.

## To-do
* For the current "font-style" of the digits on the clock, I generated the config file by making use of some bodged together functions. A to-do for this code would be to create a Configuration-Generator mode which would let a user create configuration files for their own designs using the 6*10 clocks in one chunk, and animating it themselves.
* Improve the interaction to cycle through themes and modes.
* Add another font resembling the seven segment digit display.  


Check out the latest release [here]('https://overcl0ck.netlify.app').