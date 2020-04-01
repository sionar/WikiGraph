# WikiGraph 
[Live Link](https://sionar.github.io/WikiGraph/)

![Screenshot](https://github.com/sionar/WikiGraph/blob/master/screenshots/1.png)


WikiGraph is an interactive graph generator that generates relationships between different links on Wikipedia. The user starts by entering a wikipedia article name. From there, the user clicks on one of the edges on that node, which generates more nodes and edges. The edges are the first wikipedia links that can be found when the user visits that wikipedia article. The user can change the view of the graph in several ways. By clicking and dragging on empty space, the user can pan and change which portion of the graph they want to look at. Clicking and dragging nodes changes the position of the nodes on the graph. This in turn moves the edges that are connected to that node. The user can also use their scroll wheel to zoom in and zoom out of the graph. Touch support is enabled - the site works for mobile users as well. Clicking on a node sets it as the active node, which highlights the potential edges for that node and displays the info for that wikipedia article on the left side of the screen.

WikiGraph is created purely with Javascript with npm (node package manager) and bundled with webpack. The [wtf_wikipedia library](https://github.com/spencermountain/wtf_wikipedia) is used to parse wikipedia articles and grab their internal links and information. The graph rendering is done with HTML5 canvas. Event listeners are attached to the canvas container that listen to various click and mobile touch events. Graph nodes and edges are stored as Javascript objects. When a node is created, its links, information, position and color are stored as keys in the object, and an edge is created that references the two nodes connecting the edge. The panning effect is done by keeping track of two values: panX and panY, which change when a user drags their mouse or finger across the screen. The nodes and edges are rendered at their positions offset by panX and panY. The zooming feature utilizes canvas context.scale(x,y), which changes the scale for all objects rendered in canvas.


## Technical Challenges

### Drawing nodes and edges and preventing edges from overlapping nodes
One of the challenges of rendering the nodes and edges was making sure that edges that came out of nodes as well as the edges that connected nodes would not be drawn over the nodes. Canvas does not support layers - everything drawn on the screen is done via ```context.fill()``` or ```context.stroke()```. There are multiple ways of solving this issue - the first way is to make sure that the start and end points of edges start past the radius of the node. But this can quickly become complicated since you would have to compare the edges to all of the nodes on the graph, or at least inside it's vicinity to see if an edge overlaps with another node. Another approach would be to draw the edges first, and then draw all of the nodes. Since all of the nodes are drawn later, the nodes would overwrite the drawings for the edges, giving us the effect that we want. The approach that I went with was keeping the nodes and edges in two separate canvases, which were laid onto of each other. 

```html
  <div id="canvas-box">
      <canvas id="canvas1"></canvas>
      <canvas id="canvas2"></canvas>
  </div>
```

```css
  #canvas1 {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: -1;
  }

  #canvas2 {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: -2;
  }
```

In the css, the canvas for nodes had a higher z-index than the canvas for edges, so the nodes will always be laid over the edges. This approach keeps the code modular without having to worry about the rendering order of nodes and edges, and opens the possibility for features in the future that could employ this method and not have the coding complexity scale exponentially.


### User interaction with the graph

Implementing user interaction is tricky in canvas. Since there is no DOM within the canvas, there is no way to "get an element" and then manipulate it like how it would normally be done with html elements. Objects drawn on the canvas are simply outputs - pixels that are drawn on the screen with a specific color. We keep track of the position of nodes by use of a javascript object named ```nodes```, which contains the keys which have the name of the node and the values of the node being it's links, colors and descriptions. To see if a user clicks on a node, we compare where they clicked on the screen with the position of each node inside our ```nodes``` object. If the area they click is within the radius of the node, then we set the value of a variable ```activeNode``` to equal the node that they clicked on. When we render the nodes and edges - we add a conditional to check the value of ```activeNode``` and do some special rendering for that node.

```javascript
//events.js
export const handleClickNode = e => {
  const nodeKeys = Object.keys(nodes);
  const x = (e.offsetX) / scale - xPan;
  const y = (e.offsetY + SCREEN_Y_OFFSET) / scale - yPan;
  let node, distSq;

  activeNodeKey = null;
  nodeKeys.forEach(nodeKey => {
    node = nodes[nodeKey];
    distSq = Math.pow((x - node.position.x),2) + Math.pow((y - node.position.y),2)
    if (distSq < RADIUS*RADIUS) {
      activeNodeKey = nodeKey;
      renderInfo(nodeKey, node.text);
    }
  })
}
```

```javascript
//canvas.js
export const renderEdges = () => {          //draw the edges coming out of the active node
  const canvas = document.getElementById('canvas2');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
  if (activeNodeKey) {
    let node, rotation;
    node = nodes[activeNodeKey];
    if (node) {
      node.links.forEach((link, idx) => {
        ctx.translate(node.position.x + xPan, node.position.y + yPan);
        rotation = idx * 2 * Math.PI / node.links.length;
        ctx.rotate(rotation);
        ctx.beginPath();
  ...
```

Handling panning is pretty similar to handling clicking on a node. If the program sees that the user isn't clicking on any nodes, and a ```mousemove``` event fires, then the program checks the difference between it's previous x and y values and increments ```xPan``` and ```yPan``` by the changes in x and y. ```xPan``` and ```yPan``` are used when we render the nodes and edges, as seen in one of the code snippets above.

```javascript
//events.js
export const handleMouseDrag = e => {
  e.preventDefault();
  const x = (e.offsetX) / scale - xPan;
  const y = (e.offsetY + SCREEN_Y_OFFSET) / scale - yPan;  
  const nodeKeys = Object.keys(nodes);
  let node, distSq, foundNode = false;

  nodeKeys.forEach(nodeKey => {
    node = nodes[nodeKey];
    distSq = Math.pow((x - node.position.x),2) + Math.pow((y - node.position.y),2)
    if (distSq < RADIUS*RADIUS ) {
      foundNode = true;
      node.position.x = node.position.x + e.movementX / scale;
      node.position.y = node.position.y + e.movementY / scale;
    }
  })
  if (!foundNode) {
    xPan += e.movementX;
    yPan += e.movementY;
  }
}
```

### Support for mobile users

A lot of work was done to make the website responsive for mobile and tablet users. There is not enough room to display some items when the device is viewed in portrait mode, so css queries are done to hide those elements based on the screen size.

```css
@media only screen and (max-width: 500px) {
  h2 {
    display: none;
  }

  #start-input {
    width: 150px;
  }

  #info-box {
    display: none;
  }

  #info-button {
    display: none;
  }
}
```

Views on device:

![Horizontal view](https://github.com/sionar/WikiGraph/blob/master/screenshots/2.png)
![Vertical view](https://github.com/sionar/WikiGraph/blob/master/screenshots/3.png)

When a user touches the screen, ```mouseup```, ```mousedown```, and ```mousemove``` events do not fire. To emulate those actions, ```touchstart``` and ```touchmove``` are used. In the ```touchstart``` handler, the ```touchX1```, ```touchY1``` variables are set when the user touches the screen. If a second touch is detected, those get stored in ```touchX2``` and ```touchY2```. These values are acquired from the event's touch array.

```javascript
//mobile.js
const handleTouchStart = e => {
  touchX1 = e.touches[0].clientX;
  touchY1 = e.touches[0].clientY;

  if (e.touches.length >= 2) {
    distance = getDist(e.touches[0].clientX, e.touches[1].clientX, e.touches[0].clientY, e.touches[1].clientY);
  }
}
```

From there, similar logic as we did with the ```mouseMove``` event can be used to determine if the user is panning or zooming. In the ```touchmove``` event handler, we check the change and then update ```touchX1```, ```touchY1```, ```touchX2``` and ```touchY2``` variables. For zooming, we first check to see that the user is touching the screen with 2 fingers. Then, we calculate the difference in distance from the previous event, and zoom out if the distance increases and zoom in if the distance decreases.

```javascript
//mobile.js
const handleTouchMove = e => {  
  e.preventDefault();
  const x = (e.changedTouches[0].clientX) / scale - xPan;
  const y = (e.changedTouches[0].clientY) / scale - yPan;
  const deltaX = e.changedTouches[0].clientX - touchX1;
  const deltaY = e.changedTouches[0].clientY - touchY1;
  const nodeKeys = Object.keys(nodes);
  let node, distSq, foundNode = false;

  nodeKeys.forEach(nodeKey => {
    node = nodes[nodeKey];
    distSq = Math.pow((x - node.position.x),2) + Math.pow((y - node.position.y),2)
    if (distSq < RADIUS*RADIUS ) {
      foundNode = true;
      node.position.x = node.position.x + deltaX / scale;
      node.position.y = node.position.y + deltaY / scale;
    }
  })
  if (!foundNode) {
    modifyPan(deltaX, deltaY);
  }

  touchX1 = e.changedTouches[0].clientX;
  touchY1 = e.changedTouches[0].clientY;

  if (e.touches.length >= 2) {
    const newDist = getDist(e.touches[0].clientX, e.touches[1].clientX, e.touches[0].clientY, e.touches[1].clientY);
    if (distance - newDist < 0)
      modifyScale(1/1.03);
    else
      modifyScale(1.03);
    distance = newDist;
  }
}
```
