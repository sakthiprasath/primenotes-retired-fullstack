

export default class HtmlTagBuilder{
    build_tags(url_list){
        let html = "";
        url_list.map((x)=>{
            html += `<link href='${x}' rel="stylesheet"></link>`;
        });
        $("head").append($(html));
    }
    build_js_script_tags(url_list){
      let html = "";
        url_list.map((x)=>{
            html += `<script src='${x}' type="text/javascript"></script>`;
        });
        $("head").append($(html));
    }
    init(tsp, to_return_Values){
        tsp.HtmlTagBuilder = this;
        this.tsp = tsp;
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}
