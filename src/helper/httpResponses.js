module.exports = function(req, res) {
  const _status = (status, r) => {
    console.log(status, r);
    res.status(status).json(r || {});
  };

  return {
    error(e) {
      if (e && e.status) {
        if (e.status === 401 && !e.message) {
          e.message = 'You do not have valid authentication credentials for the target resource';
        }
        _status(e.status, e);
      } else {
        _status(500, e);
      }
    },

    created(r) {
      _status(201, r);
    },

    ok(r) {
      if (!r) {
        _status(404, r);
      } else {
        _status(200, r);
      }
    },

    notFound(r) {
      _status(404, r);
    },
  };
};
