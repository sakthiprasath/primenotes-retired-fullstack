function removeCurrentTab(ele) {
  $(ele).parent().remove();
};

function buildTab(){
     var resultHtml="<div class='tab'>";
          resultHtml+="javascript";//$(this).text();
         resultHtml+="<div class='close-tab' onclick='removeCurrentTab(this)'> <img  class='close-tab-img' src='https://img.icons8.com/color/48/000000/close-window.png'></img></div></div>";
             $('.tab-container').append($(resultHtml));
}


$(document).ready(function(){

	for(let i=0;i<10;i++){
	   buildTab();   
	}
	

	$('.file-click').on('click',function(){
	buildTab(); 
	});
	
});
