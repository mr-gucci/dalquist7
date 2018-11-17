import Entity from './Entity.js';
import Run from './movements/Run.js';
import Jump from './movements/Jump.js';
import {loadSpriteSheet} from './loaders.js';
import {createAnim} from './animation.js';

export function createMario() 
{
    return loadSpriteSheet('mario')
    .then(sprite => 
	{
        const mario = new Entity();
        mario.size.set(14, 16);

        mario.addMovement(new Run());
        mario.addMovement(new Jump());

        const runAnimation = createAnim(['run-1', 'run-2', 'run-3'], 10);
        function routeFrame(mario) 
		{
            if (mario.run.direction !== 0) 
			{
                return runAnimation(mario.run.distance);
            }

            return 'idle';
        }

        mario.draw = function drawMario(context) 
		{
            sprite.draw(routeFrame(this), context, 0, 0, this.run.heading < 0);
        }

        return mario;
    });
}