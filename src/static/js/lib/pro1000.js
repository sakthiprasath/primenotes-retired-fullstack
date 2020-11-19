
export default class pro1000  {
  constructor(tsp, to_return_values) {
    this.init(tsp, to_return_values);
  }
  BeforeOnReady() {
    return $.Deferred().resolve();
  }
  Render() {
    return $.Deferred().resolve();
  }
  AfterOnReady() {
    return $.Deferred().resolve();
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
    self.BeforeOnReady(tsp, to_return_values).then(function(ret) {
      self.Render(ret).then(function(ret) {
        self.AfterOnReady(tsp, ret);
      });
    });
  }
}
