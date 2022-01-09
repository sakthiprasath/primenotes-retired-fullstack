class CodeEditor {
    constructor() {
        $('.sakthi').css('visibility', 'hidden');
        $('.ui-layout-resizer').css('display', 'none');
    }
    createEventListeners() {
        $('.sakthi').css('visibility', 'visible');
        $('.ui-layout-resizer').css('display', 'block');
        $('#main').css('display', 'none');
        var ColorCodingObj = new ColorCoding();
        ColorCodingObj.colorcoding("html-file", "html");
        ColorCodingObj.colorcoding("js-file", "javascript");
        ColorCodingObj.colorcoding("css-file", "css");
        ColorCodingObj.colorcoding("header-scripts", "html");

        var buttonObj = new ButtonsEventsAndActions();
        buttonObj.events();
        $('.ui-layout-pane').css('background-color', 'white');
        $('.CodeMirror ').css('background-color', 'white');
    }
}



class ColorCoding {
    colorcoding(container, mode) {
        var ua = navigator.userAgent;
        //Opera Mini refreshes the page when trying to edit the textarea.
        if (ua && ua.toUpperCase().indexOf("OPERA MINI") > -1) { return false; }
        var codeEditorObj = CodeMirror.fromTextArea(document.getElementById(container), {
            mode: "text/" + mode,
            htmlMode: true,
            lineWrapping: true,
            smartIndent: false,
            addModeClass: true,
            lineNumbers: true,
        });
        switch (mode) {
            case 'html':
                {
                    if (container === 'header-scripts') {
                        ColorCoding.prototype.htmlHeaderScriptsObj = codeEditorObj;
                    } else {
                        ColorCoding.prototype.htmlEditorObj = codeEditorObj;
                    }
                    break;
                }
            case 'css':
                {
                    ColorCoding.prototype.cssEditorObj = codeEditorObj;
                    break;
                }
            case 'javascript':
                {
                    ColorCoding.prototype.jsEditorObj = codeEditorObj;
                    break;
                }
        }
    }
}

class applyDragAndDrop {
    /*Make resizable div by Hung Nguyen*/

    static Draggable(srcElement, dragStart, dragDrop) {
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
                $('#pane').css('left', originalX + event.clientX - mouseDownX);
                $('#pane').css('top', originalY + event.clientY - mouseDownY)
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



class dummy {
    file_factory_path = "";
    makeResizableDiv(div) {
        const element = document.querySelector(div);
        const resizers = document.querySelectorAll(div + ' .resizer')
        const minimum_width = 570;
        const minimum_height = 275;

        let original_width = 0;
        let original_height = 0;
        let original_x = 0;
        let original_y = 0;
        let original_mouse_x = 0;
        let original_mouse_y = 0;
        for (let i = 0; i < resizers.length; i++) {
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
                $('#right-side-components').attr('class', '');
                $('#right-side-components').addClass('right-side-components-full-screen');
                element.classList = '';
                element.classList = 'pane-reduce-transition';
                if (currentResizer.classList.contains('bottom-right')) {
                    const width = original_width + (e.pageX - original_mouse_x);
                    const height = original_height + (e.pageY - original_mouse_y)
                    if (width > minimum_width) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_height) {
                        element.style.height = height + 'px'
                    }
                } else if (currentResizer.classList.contains('bottom-left')) {
                    const height = original_height + (e.pageY - original_mouse_y)
                    const width = original_width - (e.pageX - original_mouse_x)
                    if (height > minimum_height) {
                        element.style.height = height + 'px'
                    }
                    if (width > minimum_width) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                } else if (currentResizer.classList.contains('top-right')) {
                    const width = original_width + (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_width) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_height) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                } else {
                    const width = original_width - (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_width) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                    if (height > minimum_height) {
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

    buildDragAndDropEleSet() {
        applyDragAndDrop.Draggable(document.getElementById('component-factory-title'));
    }
    _maximize_icon_click_event() {
        let self = this;
        self.prev_width = 0;
        self.prev_height = 0;
        $('.maximize-icon').on('click', function() {
            $('#make-resize').show();
            $('.resize-icon').hide();
            self.tsp.DomActions.maximize_icon_click_action();
            $('#pane').removeClass('pane-orientation-left-class');
            $('#pane').removeClass('pane-orientation-right-class');
        });
    }


    _component_container_open_close() {
        /*component container open-close */

        //         $('#change-pane-orientation-left').on('click',function(){
        //            $('#pane').removeAttr('class');
        //            $('#pane').addClass('pane-orientation-left-class');
        //            $('#right-side-components').addClass('right-side-components-full-screen');
        //            $('.file-factory-split-bar').css('left','0px');
        //            $('#left-and-middle-section').css('width','0px');

        //         });

        //        $('#change-pane-orientation-right').on('click',function(){
        //            $('#pane').removeAttr('class');
        //            $('#pane').addClass('pane-orientation-right-class');
        //            $('#right-side-components').addClass('right-side-components-full-screen');
        //            $('.file-factory-split-bar').css('left','0px');
        //            $('#left-and-middle-section').css('width','0px');
        //         });
        //         $('#component-factory-title').on('dblclick', function(){
        //            $('#pane').removeAttr('class');
        //            self.tsp.DomActions.maximize_icon_click_action();
        //            $('#right-side-components').addClass('right-side-components--screen');
        //            $('.file-factory-split-bar').css('left','250px');
        //            $('#left-and-middle-section').css('width','255px');
        //         });

    }
}