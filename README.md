Bouncing Balls
==============

#### A physics simulation of bouncing particles.

This was one of the first things I made in the HTML5 Canvas, but due to how interesting the simulations are, I have been constantly been tweaking and improving it for over 2 years!

It now implements: realistic collisions (velocities broken into tangental and norminal components and momentum equation applied), global gravity and obstacle placement.

It may be concieved that these are easy features to implement and to a rudimentary level, they are. But once, you get into the corner cases and proper analysis, things get quite complicated. See the `calculations` folder for some images of the maths.

### Usage

The file `builder.html` allows you to [create your own simulation](https://joeiddon.github.io/balls/builder) through some basic settings and the ability to place ball spawn areas and obstacles.

That page generates a link, which encodes those settings, to the simulator.

*Note that these options were originally adjusted in a menu that was superimposed above the simulation, but this was messy and only allowed for temporary (non-saveable) simulations. You can see this old code by navigating back through the commit history to around the start of 2019.*

### Examples

As the builder is quite basic and would take a few minutes to process how to use, I've compiled a list below of some interesting setups.

- [basic balls][1]
- [explosion][2]
- [entropy increasing][3]

[1]: https://joeiddon.github.io/balls/?data=%7B%22bollards%22%3A%5B%7B%22type%22%3A%22rect%22%2C%22points%22%3A%5B%7B%22x%22%3A26%2C%22y%22%3A684%7D%2C%7B%22x%22%3A578%2C%22y%22%3A804%7D%2C%7B%22x%22%3A572.1064981949459%2C%22y%22%3A831.1101083032491%7D%2C%7B%22x%22%3A20.106498194945846%2C%22y%22%3A711.1101083032491%7D%5D%7D%5D%2C%22spawn_areas%22%3A%5B%7B%22x%22%3A10%2C%22y%22%3A11%2C%22w%22%3A575%2C%22h%22%3A659%2C%22no_balls%22%3A5%2C%22min_radius%22%3A30%2C%22max_radius%22%3A10%2C%22min_vel%22%3A0%2C%22max_vel%22%3A40%2C%22vel_angle%22%3A-1%7D%5D%2C%22tracing%22%3Afalse%2C%22collisions%22%3Atrue%2C%22gravity%22%3A200%2C%22cor%22%3A1%2C%22size%22%3A856%7D
[2]: https://joeiddon.github.io/balls/?data=%7B%22bollards%22%3A%5B%5D%2C%22spawn_areas%22%3A%5B%7B%22x%22%3A383%2C%22y%22%3A118%2C%22w%22%3A60%2C%22h%22%3A29%2C%22no_balls%22%3A100%2C%22min_radius%22%3A3%2C%22max_radius%22%3A3%2C%22min_vel%22%3A0%2C%22max_vel%22%3A0%2C%22vel_angle%22%3A-1%7D%2C%7B%22x%22%3A395%2C%22y%22%3A107%2C%22w%22%3A37%2C%22h%22%3A51%2C%22no_balls%22%3A100%2C%22min_radius%22%3A3%2C%22max_radius%22%3A3%2C%22min_vel%22%3A0%2C%22max_vel%22%3A0%2C%22vel_angle%22%3A-1%7D%5D%2C%22tracing%22%3Afalse%2C%22collisions%22%3Atrue%2C%22gravity%22%3A400%2C%22cor%22%3A1%2C%22size%22%3A856%7D
[3]: https://joeiddon.github.io/balls/?data=%7B%22bollards%22%3A%5B%5D%2C%22spawn_areas%22%3A%5B%7B%22x%22%3A4%2C%22y%22%3A5%2C%22w%22%3A847%2C%22h%22%3A845%2C%22no_balls%22%3A400%2C%22min_radius%22%3A4%2C%22max_radius%22%3A4%2C%22min_vel%22%3A0%2C%22max_vel%22%3A0%2C%22vel_angle%22%3A-1%7D%2C%7B%22x%22%3A393%2C%22y%22%3A399%2C%22w%22%3A11%2C%22h%22%3A12%2C%22no_balls%22%3A1%2C%22min_radius%22%3A4%2C%22max_radius%22%3A4%2C%22min_vel%22%3A2000%2C%22max_vel%22%3A2000%2C%22vel_angle%22%3A-1%7D%5D%2C%22tracing%22%3Afalse%2C%22collisions%22%3Atrue%2C%22gravity%22%3A0%2C%22cor%22%3A1%2C%22size%22%3A856%7D
