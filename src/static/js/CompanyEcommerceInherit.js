$(function(){

	var bigBang;
	function dropDown(){

		//alert('in drop');
	}
	dropDown.prototype.addItem=function(){	
		//alert();
	}
	function bigBangWhole(){
		 bigBangWhole.prototype.dropDownProto=new dropDown();
		 
	}
	function bigBangInit(){

		bigBang=new bigBangWhole();

	}

	$.widget( "custom.bigBang", {
	    options: {
	    	optionValueMap:{'sakthi':'prasath'},
	    	valueArr:[]
	    },
	    _create: function() {
	        var progress = this.options.value + "%";
	    },
	    addItem  : function(map){
	    	   var map=JSON.stringify(map);
	    	   this.
	    	   console.log("in addItem"+map);
	     },
	    addItems  : function(arrOfMap){
	    	   console.log("in addItem"+JSON.stringify(arrOfMap));
	    	   for(index in arrOfMap){
	    		   var tempMap=arrOfMap[index];
	    		   this.addItem(tempMap);
	    	   }
	     },
	    value: function( funcName ,args) {
	    	var _self=this.options;    	
	        // No value passed, act as a getter.
	        if ( args === undefined ) {
	        //	alert('in no value');
	        }
	        else{
	        	switch(funcName){
	        		case 'addItem':{
	        			addItem(args);
	        			break;
	        		}
	        		case 'addItems':{
	        			//alert('addItems');
	        			addItem('in add items',args);
	        			break;
	        		}
	        	}
	        }
	       }	       
	});

});