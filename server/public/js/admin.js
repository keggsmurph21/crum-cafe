var t;

$(() => {

  $('.admin-actions button').click(e => {

    const target = $(e.target);
    const model = target.closest('.admin-actions').attr('name');
    const action = target.attr('name');
    const id = target.siblings('input[name="search"]').val();
    const form = target.closest('form');

    t = target;
    console.log(model, action, id);

    switch (action) {
      case 'list':
        window.location.href = '/admin/' + model;
        break;

      case 'new':
        window.location.href = '/admin/' + model + '/new';
        break;

      case 'view':
        if (id)
          window.location.href = '/admin/' + model + '/' + id;
        break;

      case 'edit':
        if (id)
          window.location.href = '/admin/' + model + '/' + id + '/edit';
        break;

      case 'delete':
        if (id) {
          form.attr('action', '/admin/' + model + '/' + id + '/delete');
          form.submit();
        }
        break;
    }

  });

});
