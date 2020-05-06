import IndividualComponentEditor from './IndividualComponentEditor.js';

class applyDragAndDrop{
	/*Make resizable div by Hung Nguyen*/
	
//	static buildElement(ele,html){
//		var thisId = ele.id;
//		var tempElement = "";
//		switch (thisId) {
//		default : {
//			var dropSelectCount=applyDragAndDrop.prototype.dropSelectCount;
//			var htmlElement=$(html);
//			console.log(htmlElement.attr('id'));
//			var id=htmlElement.attr('id');
//			htmlElement.attr('id',id+"-cloned");//hard coded
//			$('#destination-container').append(htmlElement);
//			tempElement=document.getElementById(id+"-cloned");
//			var componentMap=applyDragAndDrop.prototype.componentMap;
//			if(componentMap['select-field']==undefined){
//				componentMap['select-field']=[];
//				componentMap['select-field'].push(1);
//			}
//			else{
//				componentMap['select-field'].push(dropSelectCount);
//			}
//			applyDragAndDrop.prototype.componentMap=componentMap;
//			applyDragAndDrop.prototype.dropSelectCount++;
//			break;
//		}
//	}
//	applyDragAndDrop.Draggable(tempElement);
//  }
	static Draggable(srcElement,dragStart, dragDrop) {
		srcElement.classList.add('draggable');
		var self = this;
		var move = function(event) {
			
			event.stopPropagation();
			event.preventDefault();
			var originalX = parseInt($('#pane').css('left'));
			var originalY = parseInt($('#pane').css('top'));
			var mouseDownX = event.clientX;
			var mouseDownY = event.clientY;
			function dragEgg(event) {
				$('#pane').css('left',originalX + event.clientX- mouseDownX);
				$('#pane').css('top',originalY + event.clientY- mouseDownY )
			}
			function dropEgg(event) {
				document.removeEventListener('mousemove', dragEgg, true);
				document.removeEventListener('mouseup', dropEgg, true);
				event.stopPropagation();
			}
			document.addEventListener('mouseup', dropEgg, true);
			document.addEventListener('mousemove', dragEgg, true);
		};
		srcElement.addEventListener('mousedown', move, false);
	};
};




class ColorCoding{
		colorcoding(container,mode) {
			  var ua = navigator.userAgent;
			  //Opera Mini refreshes the page when trying to edit the textarea.
			  if (ua && ua.toUpperCase().indexOf("OPERA MINI") > -1) { return false; }
			  var codeEditorObj= CodeMirror.fromTextArea(document.getElementById(container), {
			    mode: "text/"+mode,
			    htmlMode: true,
			    lineWrapping: true,
			    smartIndent: false,
			    addModeClass: true,
			    lineNumbers: true,
			  });
			  switch(mode){
			  	case 'html':{
			  		if(container ==='header-scripts'){
			  			ColorCoding.prototype.htmlHeaderScriptsObj=codeEditorObj;
			  		}else{
			  			ColorCoding.prototype.htmlEditorObj=codeEditorObj;
			  		}
			  		break;
			  	}
			  	case 'css':{
			  		ColorCoding.prototype.cssEditorObj=codeEditorObj;
			  		break;
			  	}
			  	case 'javascript':{
			  		ColorCoding.prototype.jsEditorObj=codeEditorObj;
			  		break;
			  	}
			  }
			}
	}
class CodeEditor{
		constructor(){
			$('.sakthi').css('visibility','hidden');
			$('.ui-layout-resizer').css('display','none');
			}
		createEventListeners(){
					$('.sakthi').css('visibility','visible');
					$('.ui-layout-resizer').css('display','block');
					$('#main').css('display','none');
						var ColorCodingObj=new ColorCoding();
						ColorCodingObj.colorcoding("html-file","html");
						ColorCodingObj.colorcoding("js-file","javascript");
						ColorCodingObj.colorcoding("css-file","css");
						ColorCodingObj.colorcoding("header-scripts","html");
						
						var buttonObj=new ButtonsEventsAndActions();
						buttonObj.events();
					$('.ui-layout-pane').css('background-color','white');
					$('.CodeMirror ').css('background-color','white');
			}	
	} 
	
export default class loadComponentsContainer {
	static makeResizableDiv(div) {
		  const element = document.querySelector(div);
		  const resizers = document.querySelectorAll(div + ' .resizer')
		  const minimum_size = 20;
		  let original_width = 0;
		  let original_height = 0;
		  let original_x = 0;
		  let original_y = 0;
		  let original_mouse_x = 0;
		  let original_mouse_y = 0;
		  for (let i = 0;i < resizers.length; i++) {
		    const currentResizer = resizers[i];
		    currentResizer.addEventListener('mousedown', function(e) {
		      e.preventDefault()
		      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
		      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
		      original_x = element.getBoundingClientRect().left;
		      original_y = element.getBoundingClientRect().top;
		      original_mouse_x = e.pageX;
		      original_mouse_y = e.pageY;
		      window.addEventListener('mousemove', resize)
		      window.addEventListener('mouseup', stopResize)
		    })
		    
		    function resize(e) {
		      if (currentResizer.classList.contains('bottom-right')) {
		        const width = original_width + (e.pageX - original_mouse_x);
		        const height = original_height + (e.pageY - original_mouse_y)
		        if (width > minimum_size) {
		          element.style.width = width + 'px'
		        }
		        if (height > minimum_size) {
		          element.style.height = height + 'px'
		        }
		      }
		      else if (currentResizer.classList.contains('bottom-left')) {
		        const height = original_height + (e.pageY - original_mouse_y)
		        const width = original_width - (e.pageX - original_mouse_x)
		        if (height > minimum_size) {
		          element.style.height = height + 'px'
		        }
		        if (width > minimum_size) {
		          element.style.width = width + 'px'
		          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
		        }
		      }
		      else if (currentResizer.classList.contains('top-right')) {
		        const width = original_width + (e.pageX - original_mouse_x)
		        const height = original_height - (e.pageY - original_mouse_y)
		        if (width > minimum_size) {
		          element.style.width = width + 'px'
		        }
		        if (height > minimum_size) {
		          element.style.height = height + 'px'
		          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
		        }
		      }
		      else {
		        const width = original_width - (e.pageX - original_mouse_x)
		        const height = original_height - (e.pageY - original_mouse_y)
		        if (width > minimum_size) {
		          element.style.width = width + 'px'
		          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
		        }
		        if (height > minimum_size) {
		          element.style.height = height + 'px'
		          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
		        }
		      }
		    }
		    
		    function stopResize() {
		      window.removeEventListener('mousemove', resize)
		    }
		  }
		}

static buildDragAndDropEleSet(){
		//let templateEle=$('#component-factory');
		//var divEle=$('div');
		//divEle.attr('id','pane');
		//divEle.html(templateEle.html());
		//$('#destination-container').append(divEle);
		applyDragAndDrop.Draggable(document.getElementById('component-factory-title'));
	}
	
static searchResults(){ 
	var searchResultTop=10;
	var testArr=self.testArr;
	var len=testArr.length;
	var searchContent=$('#search-box').val();
	var  html='';
	let def=$.Deferred();
	loadComponentsContainer.prototype.codesMap=new Object();
	loadComponentsContainer.prototype.currentSubClass="";
	for(let key in  self.labelMap){
		let len=self.labelMap[key].length;
		let tempArr=self.labelMap[key];
		for(var i=0;i<len;i++){
			let arrValue=tempArr[i].toLowerCase().trim();
			if(searchContent===''  || arrValue.includes(searchContent.toLowerCase().trim())) {
				if(arrValue != undefined){
					//style='top:"+searchResultTop+"px;' 
				    html+="<div class='individual-search' id='"+key+"'> <span class='search-result-item' >"+tempArr[i]+"</span></div>";
				    searchResultTop+=35;
					if(self.eventListenerFlag===0){
						//console.log('event listners created for.........'+key);
					}
				    break;
				}
			}
		}
	}
	eventListenerFlag=1;
	def.resolve(html);
	return def.promise();
};
static init(){
	loadComponentsContainer.buildDragAndDropEleSet();
	loadComponentsContainer.makeResizableDiv('.resizable');

	var screenWidth=parseInt(screen.width);
	var screenHeight=parseInt(screen.height);

	$('.maximize-icon').on('click',function(){
		var width=parseInt($('.resizable').css('width'));
		//alert('screen.width : '+screenWidth);
		//alert('width : '+width);
		if(width === screenWidth-20 ){
			$('#pane').css({'width':'50%','height':'50%','top':'10px','left':'0px'});
			$('.resizable').css({'width':'100%','height':'100%','top':'0px','left':'0px'});
		}
		else{
			$('#pane').css({'width':screenWidth,'height':"100%",'top':'0px','left':'0px'});
			$('.resizable').css({'width':'100%','height':'100%','top':'0px','left':'0px'});
			}
	});
	
	/*first time event listener is added so flag is generated*/
	self.eventListenerFlag=0;
	self.testArr=['drop_down','input','components-table','split-bar','filter'];
	var defStart=$.Deferred();
	/*map for storing labels of the corresponding id*/
	self.labelMap={
			'passwords':['passwords'],
			'python':['python'],
			'may_5_2020':['may_5_2020'],
			'components-table':['Grid','table'],
			'drop_down':['Dropdown','select'],
			'filter':['Check Box','filter']
	};
	
	$.Deferred().resolve().then(function(){
		loadComponentsContainer.searchResults().then(function(backHtml){
		$('.search-results').append(backHtml);
		loadComponentsContainer.initialisingEventHandlers();
		defStart.resolve();
		});
		return defStart.promise();
	});


	$('#search-box').on('keyup',function(){
		$('.search-results').empty();
		var defSecond=$.Deferred();
		$.Deferred().resolve().then(function(){
			loadComponentsContainer.searchResults().then(function(backHtml){
			$('.search-results').append(backHtml);
			loadComponentsContainer.initialisingEventHandlers();
			defSecond.resolve();
			});
			return defSecond.promise();
		});
	});
	var initialize_Search_Results_Close_Button_Binder=function(){
		$('#search-results-close-button').on('click',function(){
			$('.middle-section').css('width','0px');
			$('.search-container').css('display','none');
		    $('#right-side-components').attr('class','right-side-modify');

			var tempEle=$(this).clone();

			$(this).remove();
			$('.left-corner-sub-div').append($(tempEle));
			$('#compo-search-navigation').css({
			    'transform':'rotate(180deg)',
			    'width': '25px',
                'margin-left': '4px',
                'height': '90%'
			});

            initialize_Left_Corner_Close_Button_Binder();
		});
	};
	initialize_Search_Results_Close_Button_Binder();



	var initialize_Left_Corner_Close_Button_Binder=function(){
		$('#search-results-close-button').on('click',function(){
			var tempEle=$(this).clone();

			$(this).remove();

			$('.middle-section').append($(tempEle));
            $('#compo-search-navigation').css({
            'transform':'rotate(0deg)',
             'width': '55px',
             'margin-left': '30px',
             'height': '90%'
            });

			$('.middle-section').css('width','160px');
			$('.search-container').css('display','block');
			$('#right-side-components').removeClass('right-side-modify');

			initialize_Search_Results_Close_Button_Binder();
		});
	};

    var initialize_save_action_for_save_button=function(){
            $('#editor1-save-button').on('click',function(){
            var mainClassName = $(this).attr('main-class')
            var savable_data = CKEDITOR.instances.editor1.getData();

            var defObj=$.Deferred();
                var promise =
                    $.ajax
                    ({
                        url: 'http://localhost:5000/api/individual-component-fetch/save-file/'+mainClassName,
                        data: JSON.stringify(savable_data),
                        type : "POST",
                        contentType: 'application/json;charset=UTF-8',
                        success : function(response){
                            return defObj.resolve(response);
                        }
                    });
                return defObj.promise();
        });
    };
    initialize_save_action_for_save_button();




	
};

static initialisingEventHandlers(){
	/*after buliding the search results in middle section 
	 * create event listeners for search results*/
	$('.individual-search').on('click',function(){
		$('#right-side-components').css('display','block');
		$('#right-side-components-container').css('display','block');
		loadComponentsContainer.fillRightSideComponents(this.id);
	});

	$('#close-component-results-container').on('click',function(){
		$('#pane').css('display','none');
		$('#close-editor-button').css('display','block');
	});

    /*ckeditor part starts */
CKEDITOR.replace( 'editor1' );
CKEDITOR.on( 'instanceReady', function( evt )
  {
    var editor = evt.editor;

   editor.on('change', function (e) {
    var contentSpace = editor.ui.space('contents');
    var ckeditorFrameCollection = contentSpace.$.getElementsByTagName('iframe');
    var ckeditorFrame = ckeditorFrameCollection[0];
    var innerDoc = ckeditorFrame.contentDocument;
    var innerDocTextAreaHeight = $(innerDoc.body).height();
    console.log(innerDocTextAreaHeight);
    });
 });










};

static submitTryit(n) {
  var currSubClass=loadComponentsContainer.prototype.currentSubClass;
//  let scriptTagsContent=`<link type="text/css" rel="stylesheet"
	//		href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css" /><link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.css" /><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>`;
  let tempMap={};
  tempMap['htmlCode']=ColorCoding.prototype.htmlEditorObj.getValue();
  tempMap['cssCode']=ColorCoding.prototype.cssEditorObj.getValue();
  tempMap['jsCode']=ColorCoding.prototype.jsEditorObj.getValue();
  tempMap['headerScriptsCode']=ColorCoding.prototype.htmlHeaderScriptsObj.getValue();
  var text = loadComponentsContainer.buildClonableComponent(tempMap['htmlCode'],tempMap['cssCode'],tempMap['jsCode'],tempMap['headerScriptsCode']);
  var ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("id", "iframeResult");
  ifr.setAttribute("name", "iframeResult");  
  document.getElementById("iframewrapper").innerHTML = "";
  document.getElementById("iframewrapper").appendChild(ifr);
    var t=text;
    t=t.replace(/=/gi,"w3equalsign");
    t=t.replace(/\+/gi,"w3plussign");    
    var pos=t.search(/script/i)
    while (pos>0) {
      t=t.substring(0,pos) + "w3" + t.substr(pos,3) + "w3" + t.substr(pos+3,3) + "tag" + t.substr(pos+6);
	    pos=t.search(/script/i);
    }
    console.log(t);
    document.getElementById("code").value=t;
    document.getElementById("codeForm").action = "https://tryit.w3schools.com/tryit_.php?x=" + Math.random();
    document.getElementById('codeForm').method = "post";
    document.getElementById('codeForm').acceptCharset = "utf-8";
    document.getElementById('codeForm').target = "iframeResult";
    document.getElementById("codeForm").submit();
    var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
    ifrw.document.open();
    ifrw.document.write(text);  
    ifrw.document.close();
   
}

static fillRightSideComponents(mainClass){
	//console.log(currId);
	$('#right-side-components-container-text-area').empty();
	 	var html='';
	 	var componentClassName='';
				$.Deferred().resolve().then(function(){
					$.when(loadComponentsContainer.getComponentHtmlFromServer(mainClass)).done(function(res){
//						var htmlCode="";
//							var cssCode="";
//							var jsCode="";
//							var headerScriptsCode="";
//							for(let key in res){
//
//							componentClassName=key;
////							for(let k1 in res[key]){
//								if(key=="htmlCode")
//									htmlCode=res[key];
//								else if(key=="cssCode")
//									cssCode=res[key];
//								else if(key=="jsCode")
//									jsCode=res[key];
//								else if(key=="headerscriptsCode")
//									headerScriptsCode=res[key];
////							}
//
//						}
//#the above comments is for html components (html, css ,js)

                        loadComponentsContainer._appendHtmlAndEventListner(mainClass,res);
//                    	loadComponentsContainer._appendHtmlAndEventListner(htmlCode,cssCode,jsCode,headerScriptsCode,mainClass,componentClassName);
					});
				});


}

static _appendHtmlAndEventListner(mainClass, general_text_data){
//    $('#right-side-components-container-text-area').attr('texteditable','true');
//    $('#right-side-components-container-text-area').text(general_text_data);
setTimeout(function(){
CKEDITOR.instances.editor1.setData(general_text_data);
},500);

$('#editor1-save-button').attr('main-class',mainClass);

/*setting eventlistner for save button*/
//var mainClassName = mainClass;


};
//static _appendHtmlAndEventListner(htmlCode,cssCode,jsCode,headerScriptsCode,mainClass,subClass){
//	let tempMap={};
//	tempMap['htmlCode']=htmlCode;
//	tempMap['cssCode']=cssCode;
//	tempMap['jsCode']=jsCode;
//	tempMap['headerScriptsCode']=headerScriptsCode;
//
//	loadComponentsContainer.prototype.codesMap[subClass]=tempMap;
//	loadComponentsContainer.prototype.currentSubClass=subClass;
//	loadComponentsContainer.prototype.currentMainClass=mainClass;
//	//var htmlObj=$(htmlCode);
// 	var editCodeButton="<button class='edit-code-button blue ui button'  onclick='loadComponentsContainer.openNewWindow(this)' options='mainClass:"+mainClass+",subClass:"+subClass+"'>Edit Code</button>";
//
//
// 	let builtComponentCode=loadComponentsContainer.buildClonableComponent(htmlCode,cssCode,jsCode,headerScriptsCode);
// 	let individualContainer=$("<div class='indvidual-components'></div>")
// 	//individualContainer.append($(builtComponentCode));
// 	individualContainer.append($(editCodeButton));
// 	var iframe="<iframe  class='individual-component-iframe' src='http://127.0.0.1:5000/static/IframeIndividualComponents/result.html'></iframe>"
// 	individualContainer.append($(builtComponentCode));
// 	$('#right-side-components-container').append(individualContainer);
//};
static buildClonableComponent(htmlCode,cssCode,jsCode,links){
	if(links===undefined)
		links='';
	return "<html><head><style>"+cssCode+"</style>"+(links)+"</head><body>"+htmlCode+"<script type='module' >"+jsCode+"</script></body></html>";
}
static openNewWindow(curr){
	var list=curr.getAttribute('options').split(',');
	let len = list.length;
		let mainClass=list[0];//not needed
		let subClass=list[1];
		mainClass=(mainClass.split(':')[1]);//not needed
		subClass=(subClass.split(':')[1]);
	window.open('./IndividualComponentLayout.html?className='+mainClass);
	loadComponentsContainer.individualComponentEditor(mainClass,subClass);
}

static individualComponentEditor(mainClass,subClass){
	$('.ui-layout-north').attr('contenteditable','true');

		var codesMap=loadComponentsContainer.prototype.codesMap[subClass];
		loadComponentsContainer.prototype.currentSubClass=subClass;
		loadComponentsContainer.prototype.currentMainClass=mainClass;

		//IndividualComponentEditor.buildIndividualEditor();


		let tags=$("<div class='container'><h3>HTML mode</h3><div class='code-container'><textarea id='html-file' class='textarea-class'>"+codesMap['htmlCode']+"</textarea></div></div>");
		$('.ui-layout-west').empty();
		$('.ui-layout-west').append(tags);

		tags=$("<div class='container'><h3>Css mode</h3><div class='code-container'><textarea id='css-file' class='textarea-class'>"+codesMap['cssCode']+"</textarea/></div></div>");
		//$('.ui-layout-center').empty();
		$('.ui-layout-center').append(tags);


		tags=$("<div class='container'><h3>JS mode</h3><div class='code-container'><textarea id='js-file' class='textarea-class'>"+codesMap['jsCode']+"</textarea/></div></div>");
		$('.ui-layout-east').empty();
		$('.ui-layout-east').append(tags);

		tags=$("<div class='container'><h3>HTML mode</h3><div class='code-container'><textarea id='header-scripts' class='textarea-class'>"+codesMap['headerScriptsCode']+"</textarea></div></div>");
		$('.ui-layout-north').empty();
		$('.ui-layout-north').append(tags);

		$('#iframewrapper').empty();
		var temp=$('#iframewrapper');
		if($('.ui-layout-south').children().length===0){
			$('.ui-layout-south').append(document.getElementById('iframecontainer'));
		}



		var button1="<button class='revert-button blue ui button'  action='revert' onclick='loadComponentsContainer.backendActions(this)'>Revert</button>";
		var button2="<button class='refresh-button blue ui button' action='refresh'  onclick='loadComponentsContainer.submitTryit(this)' >Refresh</button>";
		var button3="<button class='save-button  blue ui button' action='save'  onclick='loadComponentsContainer.backendActions(this)' >Save</button>";
		var buttonDiv="<div class='button-code-div'>"+button1+button2+button3+"</div>";
		tsp.codeeditor.createEventListeners();


		$('.ui-layout-south').append($(buttonDiv));

		loadComponentsContainer.submitTryit();
}

static backendActions(curr){
	let backendAction=curr.getAttribute('action');
	var json_name={};
	json_name.javaClassName='HtmlComponentFactory';
	json_name.htmlSubClassName=loadComponentsContainer.prototype.currentSubClass;
	json_name.htmlMainClassName=loadComponentsContainer.prototype.currentMainClass;
	//for save operation

	let tempMap={};
	tempMap['htmlCode']=ColorCoding.prototype.htmlEditorObj.getValue();
	tempMap['cssCode']=ColorCoding.prototype.cssEditorObj.getValue();
	tempMap['jsCode']=ColorCoding.prototype.jsEditorObj.getValue();
	loadComponentsContainer.prototype.codesMap[json_name.htmlSubClassName]=tempMap;
	json_name.htmlCode=""+tempMap['htmlCode'];
	json_name.cssCode=""+tempMap['cssCode'];
	json_name.jsCode=""+tempMap['jsCode'];


	json_name.functionName='saveAction';
	var json_upload="json_name="+JSON.stringify(json_name);
	var defObj=$.Deferred();
	var promise =
		$.ajax
		({
			url:'ServiceSearchBox',
			type : "POST",
			data:json_upload,
			contentType:'application/x-www-form-urlencoded',
			success : function(response){
				return defObj.resolve(response);
			}
		});
	return defObj.promise();
};



static getComponentHtmlFromServer(componentClassName){

var defObj=$.Deferred();
	var promise =
		$.ajax
		({
			url:'http://localhost:5000/api/individual-component-fetch/general_files/'+componentClassName,
			type : "GET",
			contentType:'application/x-www-form-urlencoded',
			success : function(response){
				return defObj.resolve(response);
			}
		});
	return defObj.promise();
};

}
class Tsp{
	constructor(){
		Tsp.prototype.codeeditor =new CodeEditor();
		Tsp.prototype.loadComponentsContainer =loadComponentsContainer;
	}
}
var tsp=new Tsp();
$(document).ready(function(){
	$('#close-editor-button').css('display','none');
	$('#close-editor-button').click(function(){
		$('.sakthi').css('visibility','hidden');
		$(this).css('display','none');
		$('#pane').css('display','block');
		$('#main').show();
	});
	tsp.loadComponentsContainer.init();

});

$(document).ready(function () {
	$('#container').layout();
	$('#paddingWrapper').layout();
});

