# M1 Q5 - PAGALING

A full-screen Three.js scene for the **Make your First Scene** assignment.

## Run the scene

Open this folder in VS Code and use **Live Server** on `index.html`, or start a local server from this folder:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. On Windows, `py -m http.server 8000` also works when Python is installed. Use a web server rather than double-clicking the HTML file, because the project uses JavaScript modules.

No build step, npm install, or external CDN is required. Three.js is included locally under `vendor/three/` with its MIT license. A browser with WebGL 2 support is required.

## Assignment requirements

| Geometry | Color | Initial position (x, y, z) | Animation |
| --- | --- | --- | --- |
| BoxGeometry | Coral | (-3.2, 1.5, 0) | Rotation and floating |
| ConeGeometry | Gold | (0, 1.5, -0.4) | Rotation and floating |
| CylinderGeometry | Mint | (3.2, 1.5, 0.3) | Rotation and floating |
| SphereGeometry | Blue | (-1.8, -1.5, 0.4) | Rotation and floating |
| TorusGeometry | Violet | (1.8, -1.5, -0.2) | Rotation and floating |

- Browser title: `M1 Q5 - PAGALING`.
- Canvas fills the browser viewport and resizes with the window.
- Scene logic is in the external JavaScript file `js/main.js`.
- CSS is in `css/style.css`.
- All five objects use built-in geometries. No 3D models or textures are imported.
- The Pause/Resume button controls the animation.

## Files

- `index.html`: page structure and title
- `css/style.css`: full-screen canvas and overlay styling
- `js/main.js`: scene, camera, lights, five meshes, resizing, animation
- `vendor/three/three.module.js`: Three.js ES module
- `vendor/three/three.core.js`: Three.js core dependency
- `vendor/three/LICENSE`: upstream Three.js MIT license

Three.js version: **0.186.1**. Documentation: https://threejs.org/docs/
