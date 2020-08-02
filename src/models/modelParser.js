module.exports = function() {
  return {
    clear(entity) {
      const o = Object.assign({}, entity);

      if (o._id) {
        o.id = o._id.toString();
      }
      delete o._id;

      return o;
    },

    prepare(entity, isNew) {
      const o = Object.assign({}, entity);

      if (isNew) {
        if (o._id !== undefined) {
          delete o._id;
        }
        if (o.id !== undefined) {
          delete o.id;
        }
      } else {
        o._id = o.id;
        delete o.id;
      }

      return o;
    },
  };
};
