Images = new FS.Collection('images', {
    stores: [
        new FS.Store.GridFS("original")
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});


Images.allow({
  insert: function (userId) {
    return true;
  },
  remove: function (userId) {
    return true;
  },
  download: function () {
    return true;
  },
  update: function (userId) {
    return true;
  }
});
