/**
 * Created by weibin.zeng on 16/11/7.
 */

function Cobweb(){
    var windowWidth=document.documentElement.clientWidth;
    var windowHeight=document.documentElement.clientHeight;
    var scale=(windowWidth/1200)>1?1:(windowWidth/1200);

    var canvas=document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width=windowWidth;
    canvas.height=windowHeight;
    canvas.id="cobweb";
    canvas.style.position="fixed";
    canvas.style.top="0";
    canvas.style.left="0";
    canvas.style.zIndex=0;

    var ctx=canvas.getContext("2d");

    var pn=50*scale,
        particles=[],
        minDistance=150*scale,
        maxDistance=minDistance*2;

    this.init=function(){

        for(var i=0;i<pn;i++){
            particles.push({
                x:Math.random()*windowWidth,
                y:Math.random()*windowHeight,
                vx:0,
                vy:0,
                r:Math.random()*10+1,
                circleFillStyle:(function(){
                    var R=parseInt(Math.random()*255);
                    var G=parseInt(Math.random()*255);
                    var B=parseInt(Math.random()*255);
                    var A=Math.random();
                    //return "rgba("+R+","+G+","+B+","+A+")";
                    var rgb=200;
                    var a=0.3;
                    return "rgba("+rgb+","+rgb+","+rgb+","+a+")";
                }())
            });
        }

        return this;
    }

    this.update=function(){
        ctx.save();
        ctx.clearRect(0,0,canvas.width,canvas.height);

        var v=0.2;

        for(i=0;i<pn;i++){
            for(var j=i+1;j<pn;j++){
                var p1=particles[i];
                var p2=particles[j];
                var dis=calculateDistance(p1,p2);

                if(dis<maxDistance){
                    //ctx.globalAlpha = dis > minDistance ? (maxDistance - dis) / (maxDistance - minDistance) : 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x,p1.y);
                    ctx.lineTo(p2.x,p2.y);
                    var alpha=dis > minDistance ? (maxDistance - dis) / (maxDistance - minDistance) : 1;
                    var rgb=240;
                    ctx.strokeStyle='rgba('+rgb+','+rgb+','+rgb+','+alpha+')';
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }

        for(var i=0;i<pn;i++){
            var particle=particles[i];
            ctx.beginPath();
            ctx.arc(particle.x,particle.y,particle.r,0,2*Math.PI,true);

            //ctx.strokeStyle=particle.circleFillStyle;
            ctx.fillStyle=particle.circleFillStyle;
            ctx.closePath();
            ctx.fill();
            //ctx.stroke();

            particle.x+=particle.vx;
            if(particle.x<0)
                particle.x=windowWidth;
            else if(particle.x>windowWidth)
                particle.x=0;

            particle.y+=particle.vy;
            if(particle.y<0)
                particle.y=windowHeight;
            else if(particle.y>windowHeight)
                particle.y=0;

            particle.vx+= v * (Math.random() - 0.5) - 0.02* particle.vx;
            particle.vy+= v * (Math.random() - 0.5) - 0.02* particle.vy;
        }

        ctx.restore();
    }


    function calculateDistance(p1,p2){
        var x=Math.abs(p1.x-p2.x);
        var y=Math.abs(p1.y-p2.y);
        return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    }
}