/* Doodle Drawing Library
 *
 * Drawable and Primitive are base classes and have been implemented for you.
 * Do not modify them! 
 *
 * Stubs have been added to indicate where you need to complete the
 * implementation.
 * Please email me if you find any errors!
 */

/*
 * Root container for all drawable elements.
 */
function Doodle (context) {
    this.context = context;
    this.children = [];
}

var num_of_image = 0;
var num_of_onload = 0;


Doodle.prototype.draw = function() {
    var current = this;
    var ctx = this.context;
    // onload images
    if (num_of_onload != num_of_image){
            setTimeout(function(){ 
                current.draw(ctx);
            }, 100);
        }
    else{
        for(var i = 0;i < this.children.length;i++)
            this.children[i].draw(this.context);
    }
    // Your draw code here
    

};


/* Base class for all drawable objects.
 * Do not modify this class!
 */
function Drawable (attrs) {
    var dflt = { 
        left: 0,
        top: 0,
        visible: true,
        theta: 0,
        scale: 1
    };
    attrs = mergeWithDefault(attrs, dflt);
    this.left = attrs.left;
    this.top = attrs.top;
    this.visible = attrs.visible;
    this.theta = attrs.theta*Math.PI/180;
    this.scale = attrs.scale;
}

/*
 * Summary: Uses the passed in context object (passed in by a doodle object)
 * to draw itself.
 */

 Drawable.prototype.getWidth = function(context) {
  console.log("ERROR: Calling unimplemented draw method on drawable object.");
  return 0;
}

/*
 * Summary: returns the calculated height of this object
 */
Drawable.prototype.getHeight = function(context) {
  console.log("ERROR: Calling unimplemented draw method on drawable object.");
  return 0;
}


Drawable.prototype.draw = function(context) {
    //for(var i = 0;i < this.children.length;i++)
      //  this.children[i].draw(this.context);
    console.log("ERROR: Calling unimplemented draw method on drawable object.");
};


/* Base class for objects that cannot contain child objects.
 * Do not modify this class!
 */
function Primitive(attrs) {
    var dflt = {
        lineWidth: 1,
        color: "black"
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.lineWidth = attrs.lineWidth;
    this.color = attrs.color;
}
Primitive.inheritsFrom(Drawable);


function Text(attrs) {
    var dflt = {
        content: "",
        fill: "black",
        font: "Helvetica",
        size: 12,
        bold: false
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.content = attrs.content;
    this.fill = attrs.fill;
    this.font = attrs.font;
    this.size = attrs.size;
    this.bold = attrs.bold;


    
    // add constructor code here
}
Text.inheritsFrom(Drawable);


Text.prototype.getWidth = function() {
    var size = MeasureText(this.text, this.bold, this.font, this.size);
    return size[0];
}

Text.prototype.getHeight = function() {
    var size = MeasureText(this.text, this.bold, this.font, this.size);
    return size[1];
}

Text.prototype.draw = function (context) {
 
    context.font = this.size+'pt'+' '+this.font;
    context.fillStyle = this.fill;
    context.fillText(this.content, this.left, this.top+this.getHeight());   
    // your draw code here
};

function DoodleImage(attrs) {
    var dflt = {
        width: -1,
        height: -1,
        src: ""
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.src = attrs.src;
    this.width = attrs.width;
    this.height = attrs.height; 
    this.img = new Image();
    this.img.src = this.src;
    num_of_image++;

    this.img.onload = function(){
        num_of_onload++;
    }

    
    // rest of constructor code here
}
DoodleImage.inheritsFrom(Drawable);

DoodleImage.prototype.getWidth = function() {
    return this.width;
}


DoodleImage.prototype.getHeight = function(context) {
    return this.height;
}

DoodleImage.prototype.draw = function (context) {
    var width;
    var height;
    if(this.width>-1)
        width = this.width;
    else
        width = this.img.width;
    if(this.height>-1)
        height = this.height;
    else
        height = this.img.height;

    context.drawImage(this.img, this.left, this.top, width, height);
    
    // draw code here
};


function Line(attrs) {
    var dflt = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
    this.startX = attrs.startX;
    this.startY = attrs.startY;
    this.endX = attrs.endX;
    this.endY = attrs.endY;

    
    // your draw code here
}
Line.inheritsFrom(Primitive);

Line.prototype.getWidth = function() {
  return this.endX-this.startX;
}

Line.prototype.getHeight = function() {
  return this.endY-this.startY;
}

Line.prototype.draw = function (context) {
    context.beginPath();
    context.moveTo(this.startX,this.startY);
    context.lineTo(this.endX,this.endY);
    context.strokeStyle = this.color;
    context.lineWidth = this.lineWidth;
    context.stroke();
    

    // your draw code here
};


function Rectangle(attrs) {
    var dflt = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
    this.x = attrs.x;
    this.y = attrs.y;
    this.width = attrs.width;
    this.height = attrs.height;

    // rest of constructor code here
}
Rectangle.inheritsFrom(Primitive);

Rectangle.prototype.getWidth = function() {
    return this.width;
}

Rectangle.prototype.getHeight = function() {
    return this.height;
}

Rectangle.prototype.draw = function (context) {
    context.beginPath();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
    context.rect(this.left, this.top, this.width, this.height);
    context.stroke();

    // draw code here
};

function Container(attrs) {
    var dflt = {
        width: 100,
        height: 100,
        fill: false,
        borderColor: "black",
        borderWidth: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);    
    this.children = [];
    this.width = attrs.width;
    this.height = attrs.height;
    this.fill = attrs.fill;
    this.borderColor = attrs.borderColor;
    this.borderWidth = attrs.borderWidth;
    
    // rest of constructor code here.
}
Container.inheritsFrom(Drawable);

Container.prototype.getWidth = function() {
    var w = this.width
    return w;
}

Container.prototype.getHeight = function() {
    var h = this.height;
    return h;
}

Container.prototype.draw = function (context) {
    context.save();
    context.translate(this.left,this.top);
    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    if(this.borderWidth!=0){
        context.strokeStyle = this.borderColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }
    if(this.fill!=false){
        context.fillStyle = this.fill;
        context.fill();
    }
    
    context.clip();


    // Draw children
    for(var i = 0;i < this.children.length;i++)
    {
        context.save();
        this.children[i].draw(context);
        context.restore();
    }
    context.restore();


    // draw code here
};

//Rest of container methods here

function Pile(attrs) {

  Container.call(this, attrs);   
  //Rest of constructor code here
}
Pile.inheritsFrom(Container);

Pile.prototype.draw = function(context){
    context.save();
    context.translate(this.left,this.top);
    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    if(this.fill!=false){
        context.fillStyle = this.fill;
        context.fill();
    }
    if(this.borderWidth!=0){
        context.strokeStyle = this.borderColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }
    context.clip();
    for(var i = 0;i < this.children.length;i++)
    {
        context.save();
        this.children[i].left = 0;
        this.children[i].top = 0;
        this.children[i].draw(context);
        context.restore();
    }
    context.restore();

//Rest of pile methods here
}

function Row(attrs) {
    Container.call(this, attrs);     
  //Rest of constructor code here
}
Row.inheritsFrom(Container);

Row.prototype.draw = function(context){
    context.save();
    context.translate(this.left,this.top);
    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    if(this.fill!=false){
        context.fillStyle = this.fill;
        context.fill();
    }
    if(this.borderWidth!=0){
        context.strokeStyle = this.borderColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }
    context.clip();
    var n = this.children[0].borderWidth;
    for(var i = 0;i < this.children.length;i++)
    {
        context.save();
        this.children[i].left = n;
        this.children[i].top = (this.getHeight()-this.children[i].getHeight())/2;
        this.children[i].draw(context);
        n +=this.children[i].getWidth();
        n +=this.children[i].borderWidth;
        context.restore();
    }
    context.restore();

}

//Rest of row methods here

function Column(attrs) {
  Container.call(this, attrs);  
  //Rest of constructor code here
}
Column.inheritsFrom(Container);

 Column.prototype.draw = function(context){
    context.save();
    context.translate(this.left,this.top);
    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    if(this.fill!=false){
        context.fillStyle = this.fill;
        context.fill();
    }
    if(this.borderWidth!=0){
        context.strokeStyle = this.borderColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }
    context.clip();
    var n = this.children[0].borderWidth;
    for(var i = 0;i < this.children.length;i++)
    {
        context.save();
        this.children[i].top = n;
        this.children[i].left = (this.getWidth()-this.children[i].getWidth())/2;
        this.children[i].draw(context);
        n+=this.children[i].getHeight();
        n+=this.children[i].borderWidth;
        context.restore();
    }
    context.restore();
}


//Rest of column methods here

function Circle(attrs) {
  Container.call(this, attrs);      
  var dflt = {
    layoutCenterX: this.width / 2,
    layoutCenterY: this.height / 2,
    layoutRadius: Math.min(this.width, this.height) / 2 - 30
  };
  attrs = mergeWithDefault(attrs, dflt);
  this.layoutCenterX = attrs.layoutCenterX;
  this.layoutCenterY = attrs.layoutCenterY;
  this.layoutRadius = attrs.layoutRadius;
  //Rest of constructor code here
}
Circle.inheritsFrom(Container);

Circle.prototype.draw = function (context) {
    context.save();
    var numchildren = this.children.length;
    var angle = 360/numchildren;
    var radian = ((Math.PI)*angle)/180;
    var x;
    var y;
    for(var i = 0;i<numchildren;i++){
        context.save();
        this.children[i].left = this.layoutCenterX+this.left-Math.cos(radian*i)*this.layoutRadius;
        this.children[i].top = this.layoutCenterY+this.top-Math.sin(radian*i)*this.layoutRadius;
        this.children[i].draw(context);
        context.restore();
    }

    context.restore();
}


//Rest of circle methods here

function OvalClip(attrs) {
  Container.call(this, attrs);

  //Rest of constructor code here
}
OvalClip.inheritsFrom(Container);

OvalClip.prototype.draw = function(context){
    context.save();
    context.beginPath();
    var x = this.left+this.width/2;
    var y = this.top+this.height/2;
    var hw = this.width/2;
    var hh = (this.height/2)*1.3;
    context.moveTo(x-hw,y);
    context.bezierCurveTo(x-hw,y-hh,x+hw,y-hh,x+hw,y);
    context.moveTo(x-hw,y);
    context.bezierCurveTo(x-hw,y+hh,x+hw,y+hh,x+hw,y);

    if(this.borderWidth!=0){
        context.strokeStyle = this.borderColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }
    if(this.fill!=false){
        context.fillStyle = this.fill;
        context.fill();
    }
    
    context.clip();

    for(var i = 0;i < this.children.length;i++)
    {
        context.save();
        context.translate(this.left,this.top);
        this.children[i].draw(context);
        context.restore();
    }
    context.restore();
    context.restore();
}
/**
 * Measurement function to measure canvas fonts
 *
 * @return: Array with two values: the first [0] is the width and the seconds [1] is the height 
 *          of the font to be measured. 
 **/
function MeasureText(text, bold, font, size)
{
    // This global variable is used to cache repeated calls with the same arguments
    var str = text + ':' + bold + ':' + font + ':' + size;
    if (typeof(__measuretext_cache__) == 'object' && __measuretext_cache__[str]) {
        return __measuretext_cache__[str];
    }

    var div = document.createElement('DIV');
        div.innerHTML = text;
        div.style.position = 'absolute';
        div.style.top = '-100px';
        div.style.left = '-100px';
        div.style.fontFamily = font;
        div.style.fontWeight = bold ? 'bold' : 'normal';
        div.style.fontSize = size + 'pt';
    document.body.appendChild(div);
    
    var size = [div.offsetWidth, div.offsetHeight];

    document.body.removeChild(div);
    
    // Add the sizes to the cache as adding DOM elements is costly and can cause slow downs
    if (typeof(__measuretext_cache__) != 'object') {
        __measuretext_cache__ = [];
    }
    __measuretext_cache__[str] = size;
    
    return size;
}