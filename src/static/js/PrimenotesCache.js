

export default class PrimenotesCache {

    cache_data(){
        let self = this;
        self.data ={
            url_prefix : "https://primenotes.azurewebsites.net/"// "http://localhost:5000" //
         }
    }
    init(tsp, to_return_values){
        tsp.PrimenotesCache = this;
        this.tsp = tsp;
        this.cache_data();
        return $.Deferred().resolve(this.tsp, to_return_values);
    }
}