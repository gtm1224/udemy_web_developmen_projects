// get a random image
function getRandomNumberImage(){
	randomNumber=Math.ceil(Math.random()*6);
	return "images/dice"+randomNumber+".png";
}

function setImage(image_src,image_num){
	document.querySelectorAll('img')[image_num].setAttribute("src",image_src);
}

img1=getRandomNumberImage();
img2=getRandomNumberImage();

setImage(img1,0);
setImage(img2,1);

if (img1[11]>img2[11]){
	document.querySelector('h1').innerHTML="🚩 Player1 wins!";
}else if(img1[11]<img2[11]){
	document.querySelector('h1').innerHTML="Player2 wins! 🚩";
}else{
	document.querySelector('h1').innerHTML="Draw!";
}
