Invert chord for output
TYPE(CONTROLCHANGE) CHANNEL(1) DATA1(74) DATA2(1)
TYPE(CONTROLCHANGE) CHANNEL(1) DATA1(74) DATA2(127)

Tilt chord
TYPE(CONTROLCHANGE) CHANNEL(1) DATA1(75) DATA2(1)
TYPE(CONTROLCHANGE) CHANNEL(1) DATA1(75) DATA2(127)

1. Invert chord for output
when th user turns these knobs the chord output should be altered by 
TYPE(CONTROLCHANGE) CHANNEL(1) DATA1(74) DATA2(1) should arange the notes into the next inversion of the courent chord
and should cycle around 
the oppisit should happen with this cc message
TYPE(CONTROLCHANGE) CHANNEL(1) DATA1(74) DATA2(127)

the chord output piano should have "+" and "-" symbiols and a number to show the courent inversion

more cc knobs to come there will be a total of 4 knobs in system if that helps you plan