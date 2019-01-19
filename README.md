Bouncing Balls
==============

#### A physics simulation of bouncing particles.

This was one of the first things I made in the HTML5 Canvas, but due to how interesting the simulations are, I have been constantly been tweaking and improving it for over 2 years!

It now implements: realistic collisions (velocities broken into tangental and norminal components and momentum equation applied), global gravity and obstacle placement.

It may be concieved that these are easy features to implement and to a rudimentary level, they are. But once, you get into the corner cases and proper analysis, things get quite complicated. See the `calculations` folder for some images of the maths.

### Usage

The file `builder.html` allows you to [create your own simulation](https://joeiddon.github.io/builder) through some basic settings and the ability to place ball spawn areas and obstacles.

That page generates a link, which encodes those settings, to the simulator.

*Note that these options were originally adjusted in a menu that was superimposed above the simulation, but this was messy and only allowed for temporary (non-saveable) simulations. You can see this old code by navigating back through the commit history to around the start of 2019.*

### Examples

As the builder is quite basic and would take a few minutes to process how to use, I've compiled a list below of some interesting setups.

GOING TO DO THESE IN A SEC...

- [basic balls][1]
- [explosion][2]
- [entropy increasing][3]
- [black body radiation][4]

[1]: 
