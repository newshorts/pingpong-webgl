var Ball = function(bnds) {
                
    var bounds = {
        x: bnds.x,
        y: bnds.y,
        z: bnds.z
    };

    var velocity = {
        x: 1,
        y: 1,
        z: -20
    };

    var x = 20,
        y = 20,
        z = 20,
        r = 100;

    var color = '0xFFFFFF';

    var theta = 0.0, gravity = 0.9, damping = 1;

    var gravityOn = true;

    this.update = function() {
        wallCollision();

        x += velocity.x;
        y += velocity.y;
        z += velocity.z;

        var pos = {
            x: x,
            y: y,
            z: z
        }

        return pos;

    }

    var wallCollision = function() {
        if(x > bounds.x/2 || x < -(bounds.x/2)) {
            velocity.x *= -1;
        }

        if(gravityOn) {
            velocity.y += gravity;
            if(y > bounds.y/2) {
                velocity.y *= -0.95;
                y = bounds.y/2;
            }
        } else {
            if(y > (bounds.y/2) || y < -(bounds.y/2)) {
                velocity.y *= -1;
                velocity.y *= damping;
            }
        }

        if(z > bounds.z/2) {
            
            var paddleX = (-(mouseX - Math.abs(bounds.x)))*0.36,
                paddleY = (mouseY - bounds.y);
                
            var upperX = paddleX + (paddleBounds/2),
                lowerX = paddleX - (paddleBounds/2),
                upperY = paddleY + (paddleBounds/2),
                lowerY = paddleY - (paddleBounds/2);
                
            if((x < upperX && x > lowerX) && (y < upperY && y > lowerY)) {
                window.dispatchEvent(winner);
                velocity.z *= -1;
            }
            
            
        }
        
        if(z < -(bounds.z/2)) {
            velocity.z *= -1;
        }

    }

}