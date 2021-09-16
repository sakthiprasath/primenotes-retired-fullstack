import SideComponentsSection from './SideComponentsSection.js';
import HtmlTagBuilder from './HtmlTagBuilder.js';
import Slate from './Components/Slate.js';
import RichTextEditor from './RichTextEditor.js';
import Dialog from './Dialog.js';
import SettingsSideBar from './SettingsSideBar.js';
import Accordion from './Components/Accordion.js';
import ComponentBuilder from './ComponentBuilder.js';
import GlobalConstants from './Constants/GlobalConstants.js';
class Tsp {
    constructor() {}
}


$(document).ready(function() {
    var tsp = new Tsp();
    let class_list = [
        GlobalConstants,
        HtmlTagBuilder,
        RichTextEditor,
        SettingsSideBar,
        SideComponentsSection,
        Dialog,
        ComponentBuilder,

        Slate,
        Accordion,
    ];
    let len = class_list.length;


    function recursive_dom_builder(index, tsp, ret_Values) {
        if (index >= len)
            return null;
        (new class_list[index]()).init(tsp, ret_Values).then(function(tsp, ret_values) {
            return recursive_dom_builder(index + 1, tsp, ret_values);
        });
    }
    recursive_dom_builder(0, tsp, '');

});