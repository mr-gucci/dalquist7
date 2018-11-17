export default class Timer 
{
    constructor(deltaTime = 1/60) 
	{
        let pastTime = 0;
        let previousTime = 0;

        this.updateProxy = (time) => 
		{
            pastTime += (time - previousTime) / 1000;

            if (pastTime > 1) 
			{
                pastTime = 1;
            }

            while (pastTime > deltaTime) 
			{
                this.update(deltaTime);
                pastTime -= deltaTime;
            }

            previousTime = time;

            this.enqueue();
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}
