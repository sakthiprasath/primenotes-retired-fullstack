

class applyDragAndDrop{
	/*Make resizable div by Hung Nguyen*/

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
	makeResizableDiv(div) {
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

    buildDragAndDropEleSet(){
		applyDragAndDrop.Draggable(document.getElementById('component-factory-title'));
	}
	
static searchResults(labelMap){

	var searchResultTop=10;
	var searchContent=$('#search-box').val();
	var  html='';

	let def=$.Deferred();
	loadComponentsContainer.prototype.codesMap=new Object();
	loadComponentsContainer.prototype.currentSubClass="";
	for(let key in  labelMap){
		let len = labelMap[key].length;
		let tempArr= labelMap[key];
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
    _get_file_factory_list(){
        let file_type = 'file_factory';
        let temp_map = {};
         var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url:"http://localhost:5000/api/individual-component-fetch/get-all-files/" + file_type,
                    type : "GET",
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){
                        let files = {};
                        files = response;
                        for(let i in files){
                            let file = files[i];
                            temp_map [file] = [file];
                        }
                        return defObj.resolve(temp_map);
                    }
                });
            return defObj.promise();
    }

    init(){
	this.buildDragAndDropEleSet();
	this.makeResizableDiv('.resizable');

	var screenWidth=parseInt(screen.width);
	var screenHeight=parseInt(screen.height);
	
	/*first time event listener is added so flag is generated*/
	self.eventListenerFlag=0;
	let init_deferred = $.Deferred();
	let  defStart=$.Deferred();
	/*map for storing labels of the corresponding id*/

//	self.labelMap={
//	        /*file_name : ['display_name']*/
//			'drowssap':['drowssap','secrets'],
//			'python':['python'],
//			'ML':['ML','ai','deep learning'],
//			'flask_swagger':['flask','swagger','rest','api'],
//			'notes':['notes'],
//			'git':['git commands','bitbucket commands'],
//			'encryptor_algorithm':['algorithm'],
//			'docker':['docker'],
//			'postgres':['postgres sql'],
//			'WOE_project':['azima integration(woe)'],
//			'personal':['personal','plan'],
//			'partner_in_crime':['partner_in_crime']
//	};
	this._get_file_factory_list().then(function(label_map){
	    self.label_map= label_map;
		loadComponentsContainer.searchResults(label_map).then(function(backHtml){
		$('#file-middle-section').append(backHtml);
		loadComponentsContainer.initialisingEventHandlers();
		defStart.resolve();
		init_deferred.resolve(self.label_map);
		});
		return defStart.promise();
	});


	$('#search-box').on('keyup',function(){
		$('#file-middle-section').empty();
		var defSecond=$.Deferred();
		$.Deferred().resolve().then(function(){
			loadComponentsContainer.searchResults().then(function(backHtml){
			$('#file-middle-section').append(backHtml);
			loadComponentsContainer.initialisingEventHandlers();
			defSecond.resolve();
			});
			return defSecond.promise();
		});
	});
	var initialize_Search_Results_Close_Button_Binder=function(){
		$('#search-results-close-button').on('click',function(){
			$('#middle-section').css('width','0px');
			$('.search-container').css('display','none');
			$('#chat-file-icon-section').css('display','none');


		    $('#right-side-components').attr('class','right-side-modify');

			var tempEle=$(this).clone();

			$(this).remove();
			$('.left-corner-sub-div').append($(tempEle));
			$('#compo-search-navigation').css({
			    'transform':'rotate(180deg)',
			    'width': '55px',
                'margin-left': '30px',
                'height': '15px'
			});

            initialize_Left_Corner_Close_Button_Binder();
		});
	};
	initialize_Search_Results_Close_Button_Binder();



	var initialize_Left_Corner_Close_Button_Binder=function(){
		$('#search-results-close-button').on('click',function(){
			var tempEle=$(this).clone();

			$(this).remove();

			$('#middle-section').append($(tempEle));
            $('#compo-search-navigation').css({
            'transform':'rotate(0deg)',
             'width': '55px',
             'margin-left': '30px',
             'height': '90%'
            });

			$('#middle-section').css('width','210px');
			$('.search-container').css('display','block');
			$('#chat-file-icon-section').css('display','block');
			$('#right-side-components').removeClass('right-side-modify');

			initialize_Search_Results_Close_Button_Binder();
		});
	};

    var initialize_save_action_for_save_button=function(){
            $('#editor1-save-button').on('click',function(){
            var file_name = $('#file-name').text()
            file_name = 'file_factory-'  + file_name ;
            var savable_data = CKEDITOR.instances.editor1.getData();

            var defObj=$.Deferred();
                var promise =
                    $.ajax
                    ({
                        url: 'http://localhost:5000/api/individual-component-fetch/save-file/'+file_name,
                        data: JSON.stringify(savable_data),
                        type : "POST",
                        contentType: 'application/json;charset=UTF-8',
                        success : function(response){``
                            return defObj.resolve(response);
                        }
                    });
                return defObj.promise();
        });
    };
    initialize_save_action_for_save_button();

    return init_deferred.promise();
};

static initialisingEventHandlers(){
	/*after buliding the search results in middle section 
	 * create event listeners for search results*/
	$('.individual-search').on('click',function(){
		$('#right-side-components').css('display','block');
		$('#right-side-components-container').css('display','block');

        $('#file-name').text(this.id)

		/*handle drowssap file with password validation*/
		if(this.id === 'drowssap'){
		     var file_id = this.id;
		     $('#password-validate-dialog').dialog('open');
             $('#password-validate').off('click');
             $('#password-validate').on('click', function(){
                let value = $('#password-content-for-drowssap').val();
                if(value =='mypassword'){
                    loadComponentsContainer.fillRightSideComponents(file_id);
                    $('#password-validate-dialog').dialog('close');
                }
                else{
                    alert('wrong password');
                }
              });
		}
		else{/* other files */
		    loadComponentsContainer.fillRightSideComponents(this.id);
		}
	});

	$('#close-component-results-container').on('click',function(){
		$('#pane').css('display','none');
		$('#close-editor-button').css('display','block');
	});

    /*ckeditor part starts */
CKEDITOR.replace( 'editor1' );
CKEDITOR.config.height = '95%';
CKEDITOR.on( 'instanceReady', function( evt )
  {
    var editor = evt.editor;

   editor.on('change', function (e) {
    var contentSpace = editor.ui.space('contents');
    var ckeditorFrameCollection = contentSpace.$.getElementsByTagName('iframe');
    var ckeditorFrame = ckeditorFrameCollection[0];
    var innerDoc = ckeditorFrame.contentDocument;
    var innerDocTextAreaHeight = $(innerDoc.body).height()*3;
    console.log(innerDocTextAreaHeight);
    });
 });










};

static fillRightSideComponents(mainClass){
	//console.log(currId);
	$('#right-side-components-container-text-area').empty();
	 	var html='';
	 	var componentClassName='';
				$.Deferred().resolve().then(function(){
					$.when(loadComponentsContainer.get_file_from_server(mainClass)).done(function(res){
                        loadComponentsContainer._appendHtmlAndEventListner(mainClass,res);
					});
				});
}

static _appendHtmlAndEventListner(mainClass, general_text_data){

setTimeout(function(){
CKEDITOR.instances.editor1.setData(general_text_data);
},50);


};





static get_file_from_server(componentClassName){
componentClassName = 'file_factory-' + componentClassName;
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


