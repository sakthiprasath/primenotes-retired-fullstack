
export default class pro1000  {
   constructor(tsp, to_return_values) {
    this.tsp = tsp;
    this.init(this.tsp, to_return_values);
  }
  BeforeOnReady(to_return_values) {
    return $.Deferred().resolve(to_return_values);
  }
  Render(to_return_values) {
    return $.Deferred().resolve(to_return_values);
  }
  AfterOnReady(to_return_values) {
    return $.Deferred().resolve(this.tsp, to_return_values);
  }

  resolve(content) {
    if (content !== undefined) {
      console.log("in contend resolve" + content);
      return $.Deferred().resolve(content);
    } else {
      console.log("in empty resolve1");
      return $.Deferred().resolve();
    }
  }

  init(tsp, to_return_values) {
    let self = this;
    self.BeforeOnReady(to_return_values).then(function(ret) {
      self.Render(ret).then(function(ret) {
        self.AfterOnReady(ret);
      });
    });
  }
}
