
var player=1;
var score1=0;
var score2=0;    
var turn1=-1;
var turn2=-1;
var turnGuessed;
var field = [ [1,1,2,2,], [3,3,4,4,], [5,5,6,6], [7,7,8,8] ];
shuffle();

function shuffle() {
    
    var i, temp;
    for(i=0;i<30;i++)
        {
            var r1=Math.floor(Math.random()*4);
            var c1=Math.floor(Math.random()*4);
            var r2=Math.floor(Math.random()*4);
            var c2=Math.floor(Math.random()*4);  
            temp = field[r1][c1];
            field[r1][c1] = field[r2][c2];
            field[r2][c2] = temp;
        }
    console.log("shuffle finished! "+field);
       
}

function clickImg(value) {
    if(turn2!=-1)
        return;
    var row=Math.floor(value/10);
    var col=value%10;
    
    if(field[row][col]==0)
        return;
    
    console.log("You clicked: row: "+row+" col: "+col);
    if(turn1==row*10+col)
        return;
    
    if(field[row][col]>0){  
        var source="img/img"+field[row][col]+".jpg";
        var imageId="img"+row+col;
        document.getElementById(imageId).src=source;        
    }
    
    if(turn1==-1)
        turn1=row*10+col;
    else {
        turn2=row*10+col;
        chceckSelectedCards(0);
    }
}

$(document).ready(function(){
    $("#player1").css("color", "green"); 
    $("#player1").css("opacity", "1");
});
    

function chceckSelectedCards() {
    var row1=Math.floor(turn1/10);
    var col1=turn1%10;
    var row2=Math.floor(turn2/10);
    var col2=turn2%10;
    
    if(field[row1][col1]==field[row2][col2]) {
        //uhadli
        if(player==1) {
            score1++;
        }
        else {
            score2++;
        }
        turnGuessed=turn1;
        setTimeout(moveCard,1500);
        updateScore();
    }
    else {
       //neuhadli
        setTimeout(turnBack,2000);
        player=player==1?2:1; //zmena hraca na opacneho
        if(player==1){
            $("#player1").css("color", "green"); 
            $("#player1").css("opacity", "1");
            $("#player2").css("color", "aliceblue");
            $("#player2").css("opacity", "0.3"); 
        }
        else{
            $("#player2").css("color", "green"); 
            $("#player2").css("opacity", "1");
            $("#player1").css("color", "aliceblue");
            $("#player1").css("opacity", "0.3"); 
        }
        
    }
}

function turnBack() {
    var row1=Math.floor(turn1/10);
    var col1=turn1%10;
    var row2=Math.floor(turn2/10);
    var col2=turn2%10;
    var imageId="img"+row1+col1;
    document.getElementById(imageId).src="img/pexeso_logo.png";
    var imageId="img"+row2+col2;
    document.getElementById(imageId).src="img/pexeso_logo.png";
    turn1=-1;
    turn2=-1;
}

function moveCard() {
    var table;
    if(player==1){
        table=document.getElementById('tableP1');
    }
    else {
        table=document.getElementById('tableP2');
    }
    
    var row1=Math.floor(turn1/10);
    var col1=turn1%10;
    var row2=Math.floor(turn2/10);
    var col2=turn2%10;
    var imageSource="img/img"+field[row1][col1]+".jpg";
    
    var imageId="img"+row1+col1;
    document.getElementById(imageId).src="img/blank.jpg";
    $(imageId).css("opacity", "1");
    
    var imageId="img"+row2+col2;
    document.getElementById(imageId).src="img/blank.jpg";
    $(imageId).css("opacity", "1");
    var row = table.insertRow(0);
    
    /*var cel1 = row.insertCel1(0);
    cel1.innerHTML="<img src=\""+imageSource+"\"width=\"75\">";*/
    
    field[row1][col1]=0;
    field[row2][col2]=0;
    
    turn1=-1;
    turn2=-1;
}

function updateScore() {
    if(player==1) {
        document.getElementById('score1').innerHTML="Score : "+score1;
    }
    else{
        document.getElementById('score2').innerHTML="Score : "+score2;
    }
}

$( "document" ).ready(function() {
	if (typeof(Storage) !== "undefined") 
	{
        var value;
    	if(localStorage.visited)
            {
                value=localStorage.getItem("visited");
                value++;
                localStorage.visited=value;
            }
        else 
            {
                localStorage.setItem("visited", "1");
                value=1;
            }
        document.getElementById('visited').innerHTML="Number of visitors: "+value;
		// Code for localStorage/sessionStorage.
	} 
	else 
	{
    	// Sorry! No Web Storage support..
	}
    
    $("#btn_menu").hide();
    
    $("#btn").click(function(){
        $("#btn_menu").slideToggle(800); 
    });
    
    $("#btnCancel").click(function(){
        $("#btn_menu").slideToggle(800);
    });
    
    $("#btnRestart").click(function(){
        location.reload();
    });
});


























