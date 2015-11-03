window.onload = function () {

    var canvas = document.getElementById("myCanvas");

    var context = canvas.getContext("2d");

    var root = new Doodle(context);

    var rotContainer1 = new Container({ 
        width: 800,
		height: 205,
		left: 50,
		top: 20,
		//fill: "#fecbbd",
		//borderWidth: 3,
	});
    var rotTextContainer = new Container({
        left: 300,
        top: 70,
        width: 500,
        height: 105,
        //fill: "#fecbbd",
    });

	var rotText = new Text({ 
        top: 0,
        height: 40,
        left: 5,
        font: "Chalkduster",
        size: "40",
        fill: "#765950",
        content: "Qianxu's Doodle"
    });
    var oval = new OvalClip({ 
        width: 200,
        height: 180,
        left: 20,
        top: 10,
        
    });
    
    oval.children.push(
        new DoodleImage({src: "qianxun1.jpg"})
        );
        
    rotContainer1.children.push(oval);
    rotContainer1.children.push(rotTextContainer);
    rotTextContainer.children.push(rotText);
    root.children.push(rotContainer1);

    var oval1 = new OvalClip({ 
        width: 150,
        height: 200,
        left: 165,
        top: 420,
        
    });
    
    oval1.children.push(
        new DoodleImage({src: "totoro.png"})
        );

    root.children.push(oval1);
    
    var circle = new Circle({ 
        width: 400,
        height: 400,
        left: 20,
        top: 300,
        borderWidth: 0,
        layoutCenterX: 200,
        layoutCenterY: 200,
        layoutRadius: 120,
        
    });

    var imgframe2 = new Container({ 
        width: 200,
        height: 100,
        left: 600,
        top: 250,
        //fill: "#fecbbd",
        //borderWidth: 3,
    });

    imgframe2.children.push(
        new DoodleImage({src: "totoro2.png"})
        );

    root.children.push(imgframe2);

    var imgframe3 = new Container({ 
        width: 500,
        height: 500,
        left: 620,
        top: 250,
    });

    imgframe3.children.push(
        new DoodleImage({src: "tree.jpg"})
        );

    root.children.push(imgframe3);

    var imgframe4 = new Container({ 
        width: 300,
        height: 300,
        left: 400,
        top: 450,
    });

    imgframe4.children.push(
        new DoodleImage({src: "girl.jpeg"})
        );

    root.children.push(imgframe4);

    var imgframe5 = new Container({ 
        width: 100,
        height: 300,
        left: 300,
        top: 150,
    });

    imgframe5.children.push(
        new DoodleImage({src: "face.jpg"})
        );

    root.children.push(imgframe5);

    function drawrepeat(){
        circle.children = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
        var n;
        imgframe2.left -=50;
        if(imgframe2.left<0) 
            imgframe2.left = 600;
        imgframe5.left +=50;
        if(imgframe5.left>800) 
            imgframe5.left = 300;
        n = Math.floor(Math.random()*10);
        for(var i = 0; i < n; i++) {
            if(i%2){
                var newRot = new Container({ 
                    width: 30,
                    height: 30,
                    fill: "#f27379",
                });
            }
            else{
                var newRot = new Container({ 
                    width: 30,
                    height: 30,
                    fill: "#fbbdbd",
                });
            }
        
            circle.children.push(newRot);
        }
        root.children.push(circle);
        root.draw();
        root.children.pop();


    }
    
    /*for(var i = 0; i < 8; i++) {
        if(i%2){
            var newRot = new Container({ 
                width: 50,
                height: 50,
                fill: "#f27379",
            });
        }
        else{
            var newRot = new Container({ 
                width: 50,
                height: 50,
                fill: "#fbbdbd",
            });
        }
        
        circle.children.push(newRot);
    }*/
    //root.children.push(circle);
    //root.draw();
    drawrepeat();
    setInterval(drawrepeat,500);



};