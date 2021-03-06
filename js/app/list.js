NV(function () {

  function List(arr) {
    this.list = arr || [];
    this.sortMode = {asc: "asc", desc: "desc"};
    this.currentSortMode = this.sortMode.asc;
    this.currentSortBy = null;
  }

  List.prototype = {
    get: function (index) {
      return index === undefined ? this.list : this.list[index];
    },

    orderBy: function (sort, mode) {
      if (this.list.length === 0)return;
      var self = this;
      mode = mode || this.sortMode.asc;
      if (this.list[0][sort] === undefined)
        throw("Invalid order by parameter, valid parameters include are " + Object.keys(this.list[0]).join(", "));

      if (this.sortMode[mode] === undefined)
        throw("Invalid order mode parameter, valid parameters include are " + Object.keys(this.sortMode).join(", "));

      function compare(a, b) {
        if (a[sort] < b[sort]) return mode === self.sortMode.asc ? -1 : 1;
        if (a[sort] > b[sort]) return mode === self.sortMode.asc ? 1 : -1;
        return 0;
      }

      this.list.sort(compare);
      this.currentSortMode = mode;
      this.currentSortBy = sort;
      return this;
    },

    add: function (node) {
      this.currentSortBy = this.currentSortBy || Object.keys(node)[0];
      this.currentSortMode = this.currentSortMode || this.sortMode.asc;
      this.list.push(node);
      this.orderBy(this.currentSortBy, this.currentSortMode);
      return this;
    },

    delete: function (index) {
      if (index > -1) this.list.splice(index, 1);
      return this;
    },

    filter: function (keyword) {
      if (this.list.length == 0) return;

      return this.list.filter(function (note) {
        return Object.keys(note).some(function (prop) {
          if (note[prop].toLowerCase().indexOf(keyword.toLowerCase()) >= 0)
            return true;
        });
      });
    }
  };

  this.List = List;
});

