import {Movement} from '../Entity.js';

export default class Run extends Movement 
{
    constructor() {
        super('run');

        this.direction = 0;
        this.speed = 6000;


        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime) 
	{
        entity.velocity.x = this.speed * this.direction * deltaTime;

        if (this.direction) 
		{
            this.heading = this.direction;
            this.distance += Math.abs(entity.velocity.x) * deltaTime;
        } 
		else {
            this.distance = 0;
        }
    }
}
