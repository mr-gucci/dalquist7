export function createBackgroundLayer(level, sprites) 
{
    const tiles = level.tiles;
    const resolver = level.tileCollider.tiles;

    const buffer = document.createElement('canvas');
    buffer.width = 1920 + 16;
    buffer.height = 1080;

    const context = buffer.getContext('2d');

    let startOfIndex, endOfIndex;
    function redraw(drawStart, drawDest)  
	{
        startOfIndex = drawStart;
        endOfIndex = drawDest;

        for (let x = startOfIndex; x <= endOfIndex; ++x) 
		{
            const col = tiles.grid[x];
            if (col) 
			{
                col.forEach((tile, y) => 
				{
                    if (sprites.animations.has(tile.name)) 
					{
                        sprites.drawAnim(tile.name, context, x - startOfIndex, y, level.totalTime);
                    } 
					else 
					{
                        sprites.drawTile(tile.name, context, x - startOfIndex, y);
                    }
                });
            }
        }
    }

    return function drawBackgroundLayer(context, camera) 
	{
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawStart = resolver.toIndex(camera.position.x);
        const drawDest = drawStart + drawWidth;
        redraw(drawStart, drawDest);

        context.drawImage(buffer, -camera.position.x % 16, -camera.position.y);
    };
}

export function createSpriteLayer(entities, width = 64, height = 64) 
{
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawSpriteLayer(context, camera) 
	{
        entities.forEach(entity => 
		{
            spriteBufferContext.clearRect(0, 0, width, height);

            entity.draw(spriteBufferContext);

            context.drawImage(spriteBuffer, entity.position.x - camera.position.x, entity.position.y - camera.position.y);
        });
    };
}

export function createCollisionLayer(level) 
{
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getFromIndex;
    tileResolver.getFromIndex = function getByIndexCopy(x, y) 
	{
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    /*return function drawCollision(context, camera) 
	{
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x, y}) => 
		{
            context.beginPath();
            context.rect(
                x * tileSize - camera.position.x,
                y * tileSize - camera.position.y,
                tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';
        level.entities.forEach(entity => 
		{
            context.beginPath();
            context.rect(
                entity.position.x - camera.position.x,
                entity.position.y - camera.position.y,
                entity.size.x,
                entity.size.y);
            context.stroke();
        });

        resolvedTiles.length = 0;
    };*/
}

export function createCameraLayer(cameraToDraw) 
{
    return function drawCameraRect(context, fromCamera) 
	{
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(cameraToDraw.position.x - fromCamera.position.x, cameraToDraw.position.y - fromCamera.position.y, cameraToDraw.size.x, cameraToDraw.size.y);
        context.stroke();
    };
}