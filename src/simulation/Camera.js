 import { useThree } from "@react-three/fiber";

 function Camera({pos}) {
    const { camera } = useThree();

    function changePosition(e) {
        if(e.key === 'ArrowUp') {
            camera.position.x = 100;
            camera.position.y = 0;
            camera.position.z = 0;
            camera.lookAt(0,0,0);
        } else if (e.key === 'ArrowDown') {
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 100;
            camera.lookAt(0,0,0);
        } else if (e.key === 'ArrowLeft') {
            camera.position.x = 100;
            camera.position.y = 0;
            camera.position.z = 100;
            camera.lookAt(0,0,0);
        }
    }

    // document.addEventListener('keydown', changePosition);

    // function changePosition(e) {
        if(pos === 1) {
            camera.position.x = 100;
            camera.position.y = 0;
            camera.position.z = 0;
            camera.lookAt(0,0,0);
        } else if (pos === 0) {
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 100;
            camera.lookAt(0,0,0);
        } else if (pos === 2) {
            camera.position.x = 0;
            camera.position.y = 100;
            camera.position.z = 0;
            camera.lookAt(0,0,0);
        } else if (pos === 3) {
            camera.position.x = 100;
            camera.position.y = 60;
            camera.position.z = 100;
            camera.lookAt(0,0,0);
        }
    // }
    
     return (
         <>
         </>
     )
 }

 export default Camera;