'use strict';
module.exports = function(app) {
    var formList = require('../controllers/formController');

    // formList Routes
    app.route('/getforms')
        .get(formList.list_all_forms)
        .post(formList.create_form);

    app.route('/form/:formId')
        .get(formList.read_a_form)
        .put(formList.update_a_form)
        .delete(formList.delete_a_form);
}