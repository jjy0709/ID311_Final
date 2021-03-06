# ROOMTRIS - Make your own room!

## 0. About Us
### Team3
- 20160621 MyeongWoon Cho
- 20180614 JiYeong Jeong
- 20190463 SoJeong Lee

Here is our [Git Repo](https://github.com/jjy0709/ID311_Final.git)

Here is our [Website](https://id-311-final-team3.web.app/)

Here is our [Demo Video](https://youtu.be/2r7SpwecCpA)

### What is ROOMTRIS?
---
“**ROOMTRIS**” is an interior design service based on `React` and `Three.js` libraries, and `Firebase`. 
Users can arrange furnitures in cubes and decorate their own rooms by changing the color of furnitures and walls.

![logo](./MD%20Img/logo.png)

![playshot](./MD%20Img/playshot.png)


## 1. The Manual of ROOMTRIS
### 1.1 Home
---

![homescreen](./MD%20Img/Homescreen.png)

When you first access our service, you can see this screen.
Press the `START button` to go to the room decoration page.

### 1.2 The Components of Room Decoration Page
---

![roomcomponent](./MD%20Img/roomcomponent.png)

The components of the interior decoration page are largely divided into three components as follows.
- **Sidebar** in the left side
- **Room Decoration Canvas** in the central part
- **Toolbar** in the right side

#### **1.2.1 Sidebar**

![menu](./MD%20Img/menu.png)

The sidebar has two main functions. Click on each icon to activate the function.

- **Add Furniture** : A list of furnitures that user can add to the room is displayed as a picture. Just click on the furniture you want, then it will be created in the room! 

![menu_furniture](./MD%20Img/menu_furniture.png)

- **Change Color** : User can change the color of walls or furniture in this part. There are a total of three color palettes that can change the color of walls, floor, and furniture from the top to the bottom. If user click the furniture, the title of third colorwheel change to furniture name, and user can change the color of that furniture.

![menu_color](./MD%20Img/menu_color.png)

#### **1.2.2 Room Decoration Canvas**
This canvas will be updated in real time with information about the furniture user added and the colors user changed to make it visible. Clicking on a particular furniture on the canvas displays an outline and shows the user that this furniture has been selected.

![canvas_3](./MD%20Img/canvas_3.png)

#### **1.2.3 Toolbar**

![Toolbar](./MD%20Img/toolbar.png)

There are 3 functions in the toolbar.

- **Screenshot** : Save the current room to user’s local repository as a png file.
- **Delete All** : Delete all furnitures on the canvas.
- **Change Camera Angle** : User can see the canvas from various angles. Click the icon to display four buttons at the bottom, each with a different angle to view of the room.

![toolbar_cameraangle](./MD%20Img/toolbar_cameraangle.png)

![cameraview](./MD%20Img/cameraview.png)

### 1.3 Furniture arrangement 
---

If you want to place the furniture at the desired location and angle, the method is simple. 
You just select furniture, move it through the `arrow keys`, and rotate it through the `space bar`.

| Key         |                   |
|-------------|-------------------|
| Up Arrow    | Move Up           |
| Down Arrow  | Move Down         |
| Right Arrow | Move Right        |
| Left Arrow  | Move Left         |
| Space bar   | Rotate 90 degrees |
| d           | Delete            |

Each piece of furniture is not supposed to go out when it touches the wall. 
Feel free to move your furniture!

## 2. The Development Process of ROOMTRIS

### 2.1 Home
---
![dia-homepage](./MD%20Img/dia_hompage.png)

The home page lets the user redirect to the select page through the `START button`.

### 2.2 Simulation
---
![dia-simulation](./MD%20Img/dia-simulation.png)

The simulation folder consists of like this.

In simulation, functions and files for interior design exist. First, in the Object folder stores the obj files of each furnitures, such as legs and bodies of furnitures.

#### **2.2.1 simulation.js**

![dia-simulationjs](./MD%20Img/dia-simulationjs.png)

There are states and functions for updating the canvas.

It can be largely divided into `canvas`, `sidebar`, and `toolbar` areas, and on canvas you can see a list of elements and furniture array to represent a 3D screen. The sidebar passes the state to sidebar.js depending on which function the user selects, and the toolbar calls the function corresponding to each function as the user selects.

#### **2.2.2 Camera.js**

![dia-camerajs](./MD%20Img/dia-camerajs.png)

In the Camera.js file, there is a function to adjust the position and angle of the camera.

#### **2.2.3 furnitures folder**

![dia-furnitures](./MD%20Img/dia-furnitures.png)

Each furniture file in the Furniture folder reads and combines the obj files to make up the furniture. Values are used to specify the `location`, `rotation value`, `color`, whether the furniture is currently selected, and what is the ID of the furniture is. It also includes functions that change the select state when user clicked on the object, and finally, the events that change position or rotation value of the furniture when pressing the keyboard also be dealt in here.

#### **2.2.4 sidebar folder**

![dia-sidebarfolder](./MD%20Img/dia-sidebar.png)

Depending on the case of each menu, a function that adds furniture to the furniture array in the sidebar.js file, or a function that changes the color of the object, works. A chrome color picker library was used to create a color wheel.

### 2.3 Apps.js
---
Lastly, App.js connects pages that have been created so far with Route so that they can be loaded by address.

```javascript
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Simulation />} />
      </Routes>
    </Router>
  );
}
```

## 3. Issues & Bugs
- Collisions between furnitures cannot be implemented, resulting in **overlapping** phenomenon
- Decorations on furniture like monitor, tissues etc. are modeled but not included due to the above phenomenon

## 4. Library & Tools & Challenges
### 4.1 We used...
---
- React
- Firebase
- THREE.js
- MUI

### 4.2 Challenges & How did we solve problems?
---
- Changing Color
    
    The furniture color informations are stored in each object, but the color value of the color wheel that changes the color is dealt in the sidebar.
    
    > The `state` is declared in `simulation.js`, which is the parent of sidebar.js, a file that stores the sidebar color values, and (furniture).js, a file that applies colors. We used the method of passing this state from sidebar.js to (furniture).js.

    > > When rendering furniture, use `useState`, which stores color values, to create a state that can store color values. ​​And to change this value when furniture is clicked, put the `setColor` function in `Select`, the parent state. You can change the color value by changing the state through `setColor`. Put Select as a property in sidebar.js to change the color of the furniture through the setColor function when changing the color.
    ![dia-colorissue](./MD%20Img/dia-colorissue.png)
    
- Moving Objects
    
    Planned to move furniture through mouse drag, but jittering occurred.
    
    > At this time, like color, create `setPosition` and `setRotation` functions and `State` that store the position and rotation values ​​in the (furniture).js file. When adding furniture to the array in `simulation.js`, the initial position of the furniture is set with the `pos` variable, the input value moved with the keyboard afterwards is resolved by changing it through the setPosition and setRotation functions in (furniture).js and displaying it on the canvas.
    ![dia-moveissue](./MD%20Img/dia-moveissue.png)
    
- Adding collider for each object
    
    In order to control the furniture from breaking through walls or floors, we planed to add colliders at each object so that it would no longer move when hit other object, but collider could not be added as furniture looks
    
    > Limit the position range of each furniture to the inside of the wall to prevent being pierced without collider like this.

    ```javascript
    if(select.key === id) {
        document.onkeydown = function(e) {
            ...
            if (newPosition.x < -19){
                newPosition.x = -19
            }
            if (newPosition.x > 19.5){
                newPosition.x = 19.5
            }
            if (newPosition.z < -19){
                newPosition.z = -19
            }
            if (newPosition.z > 19.5){
                newPosition.z = 19.5
            }
            setPosition(newPosition);
            return false;
        }
    }
    ```


### 4.3 What we learned?
---
- How to create a web application using `React`
  - How to render multiple pages depending on path
  - How to send and receive various data between components

- How to implement a 3d model and move it with `THREE.js` library
  - How to import obj file and combine to make furniture
  - How to change position, rotation, color value of each object
  - How to deal with camera, light, canvas

- How to host on `Firebase` with React

## 5. Help & Resources
- Three.js document (https://threejs.org/docs/)
- React Three fiber document (https://docs.pmnd.rs/react-three-fiber)