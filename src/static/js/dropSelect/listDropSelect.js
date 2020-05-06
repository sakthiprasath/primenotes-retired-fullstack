class MyListDropdown extends HTMLElement{
constructor(){
	super();
		var a=this;
		var tableName=this.getAttribute("tableName");
		var servletName=a.getAttribute("servletName");
		var functionName=a.getAttribute("functionName");
		var listName=a.getAttribute("list");

		var key=a.getAttribute("key");
		
		var s1="<select id='select_id'>"
		var arr=[];
		var res_options="";
		var val="";	

		if (true){
	                var arr=['sakthi','prasath','akilan','thiru','subash'];
	                for(var i=0;i<arr.length;i++){
	            		res_options+="<option value='" +arr[i]+"'>"+arr[i]+"</option>";
	            	}
	             	if(listName !==null){
	             		var dataListBeginTag="<input id='select_id' list='"+listName+"'/>"+"<datalist id='"+listName+"' >";
	             		var dataListEndTag="</datalist>";
	                	var innerHtmlContent=(dataListBeginTag+ res_options +dataListEndTag);	
	                	console.log(a.innerHtml);
	                	$(a).append($(innerHtmlContent));
	             	}
	             	else{
	             		var res="<select  id='select_id'>"+res_options+"</select>";
	             		a.innerHTML =res;
	             	}
	           };     
       }
    }	
$(document).ready(function(){
	customElements.define('my-list-drpdown',MyListDropdown);
});
