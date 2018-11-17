import TileResolver from './TileResolver.js';

export default class TileCollider 
{
    constructor(tileMatrix) 
	{
        this.tiles = new TileResolver(tileMatrix);
    }

    checkXdir(entity) 
	{
        let x;
        if (entity.velocity.x > 0) 
		{
            x = entity.position.x + entity.size.x;
        } else if (entity.velocity.x < 0) 
		{
            x = entity.position.x;
        } else 
		{
            return;
        }

        const equalto = this.tiles.searchByRange(x, x, entity.position.y, entity.position.y + entity.size.y);

        equalto.forEach(match => 
		{
            if (match.tile.type !== 'ground') //exit if equalto ground
			{
                return;
            }

            if (entity.velocity.x > 0) //if to right
			{
                if (entity.position.x + entity.size.x > match.x1) 
				{
                    entity.position.x = match.x1 - entity.size.x;
                    entity.velocity.x = 0;
                }
            } else if (entity.velocity.x < 0) //if to left
			{
                if (entity.position.x < match.x2) 
				{
                    entity.position.x = match.x2;
                    entity.velocity.x = 0;
                }
            }
        });
    }

    checkYdir(entity) 
	{
        let y;
        if (entity.velocity.y > 0) 
		{
            y = entity.position.y + entity.size.y;
        } else if (entity.velocity.y < 0) 
		{
            y = entity.position.y;
        } else 
		{
            return;
        }
		
        const equalto = this.tiles.searchByRange(entity.position.x, entity.position.x + entity.size.x, y, y);
        equalto.forEach(match => 
		{
            if (match.tile.type !== 'ground') //if equals to ground exit
			{
                return;
            }

            if (entity.velocity.y > 0) //if above
				{
                if (entity.position.y + entity.size.y > match.y1) 
				{
                    entity.position.y = match.y1 - entity.size.y;
                    entity.velocity.y = 0;
                }
            } 
			else if (entity.velocity.y < 0) //if below
			{
                if (entity.position.y < match.y2) 
				{
                    entity.position.y = match.y2;
                    entity.velocity.y = 0;
                }
            }
        });
    }
}
