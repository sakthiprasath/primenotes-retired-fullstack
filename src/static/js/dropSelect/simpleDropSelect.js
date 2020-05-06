drop_down();
function drop_down()
{
	var classArray=document.getElementsByClassName("drop_down_for_search_box");
	for(var i=0;i<classArray.length;i++){
		builtDropDown(classArray[i]);
		
	}
	function builtDropDown(a){

		var tableName=a.getAttribute("tableName");
		var servletName=a.getAttribute("servletName");
		var functionName=a.getAttribute("functionName");
		var listName=a.getAttribute("list");
		
		var key=a.getAttribute("key");
		
		var s1="<select id='select_id'>"
		var arr=[];
		var res_options="";
		var val="";	
		var json_upload = "json_name=" + JSON.stringify({functionName:functionName, stringParameter:val.toLowerCase(),tableName:tableName,key:key});
	    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	    
	    
	    xmlhttp.open("POST", servletName);
	    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    xmlhttp.send(json_upload);
	    console.log(json_upload);
	    xmlhttp.onreadystatechange = function(){
	          if (xmlhttp.readyState == 4 && xmlhttp.status==200 ) 
	          {
	              //console.log("in if .....");
	              var obj= xmlhttp.responseText;
	                var arr=[];
	                arr=JSON.parse(obj);  
	                for(var i=0;i<arr.length;i++){
	            		res_options+="<option value='" +arr[i]+"'>"+arr[i]+"</option>";
	            	}
	                //console.log(res_options);		
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
	             	console.log(a.innerHtml);
	             	//console.log(res);
	                //console.log(obj);
	           };  
	       }
	}	
}

