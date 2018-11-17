import {Vector} from './math.js';

export class Movement 
{
    constructor(name) 
	{
        this.NAME = name;
    }

    update() 
	{
        console.warn('Unhandled update call in Movement');
    }
}

export default class Entity 
{
    constructor() 
	{
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.size = new Vector(0, 0);

        this.movements = [];
    }

    addMovement(movement) 
	{
        this.movements.push(movement);
        this[movement.NAME] = movement;
    }

    update(deltaTime) {
        this.movements.forEach(movement => {
            movement.update(this, deltaTime);
        });
    }
}
