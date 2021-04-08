# cl0ck
A digital clock with each segment being drawn by a smaller analogue clock. Made using p5.js framework.

## Details on how the configurations work
Having the individual clock objects have their states denoted by hours and minutes seemed redundant, for the simple reason that the hour and minute hands were of the same length so they would be indistinguishable, and since only multiples of 45 from 0 till 7 were needed for each state, all the individual states of a real clock in between these multiples wouldn't get utilized.  

So instead of using individual 'time' to calculate the angular state of every clock, the configurations for each state would be denoted by a two digit octal number, with each digit representing the angular state of the corresponding line in multiples of 45deg.For every clock, there is an individual line of configuration in the `config.json` file with 20 octal digits, denoting ten individual states for the collective representation of digital numbers.
For example, if the configuration of the first clock in the array was:  
`02533614103417264725`  
then this configuration would get read by the code in chunks of two digits, which would mean the its state for drawing -  
a digital `0` would be `02`,  
a digital `1` would be `53`,  
a digital `2` would be `36`, and so on.  
And these individual states would be read as:
For a digital `0`, a `02` implies the first hand of the clock would be at an angle of `0*45deg = 0deg` from the vertical, and the second hand would be at a `2*45deg = 90deg` from the vertical, and so on.

## Making other animations
In the current case, the corresponding index of the state data in the configuration string is itself the actual label of the digit being drawn, hence the `labels` array is left empty on purpose. In the template `custom.json` I have attached, you can add custom labels in the `labels` array, corresponding to the index number.  

### Example
For instance, if your configuration for the first clock is: 
`126352775315142627253361`  
Then, since the length of this configuration string is 24, there are 12 possible states which the clock can animate to. Hence, you should have twelve elements in the array.  
Now, if the first state of your configuration corresponds to drawing, say, the letter `A`, then the value of the first element of that `label` array would be `'A'`, and so on. 

A potential addition for this project can be a configuration-generator.html webpage wherein you can use a GUI to create the configuration.json for you.
For now, however, 