class global{
	constructor(){
		var editorMap={};
		this.jsPath="";
		this.cssPath="";
		this.cssPath="";
		this.HtmlPath="";
		//editorMap.
	}
}
class ButtonsEventsAndActions{
	revertAction(globalObj){
		//alert(globalObj.jsPath);
	}
	refreshAction(globalObj){
		//alert(globalObj.jsPath);
	}
	saveAction(globalObj){
		//alert(globalObj.jsPath);
	}
	events(){
		var self=this;
		var globalObj=new global();
		$('.revert-button').click(
		function(){
			self.revertAction(globalObj);
		});
		$('.refresh-button').click(
		function(){
				self.refreshAction(globalObj);
		});
		$('.save-button').click(
				function(){
				self.saveAction(globalObj);
		});
	}
}


