import Camera from './Camera.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {createCollisionLayer, createCameraLayer} from './layers.js';
import {setupKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => 
{
    const camera = new Camera();
    window.camera = camera;

    mario.position.set(64, 64);

    level.entities.add(mario); //add mario to entities

    const input = setupKeyboard(mario);
    input.listenTo(window);


    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) 
	{
        level.update(deltaTime);

        level.comp.draw(context, camera);
    }

    timer.start();
});