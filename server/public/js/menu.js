var t;

$(() => {

  $('.admin-actions button').click(e => {

    const target = $(e.target);
    const action = target.attr('name');
    const id = target.closest('tr').attr('id');
    const form = target.closest('form');

    t = target;
    console.log('menu', action, id);

    switch (action) {
      case 'list':
        window.location.href = '/admin/menu';
        break;

      case 'new':
        window.location.href = '/admin/menu/new';
        break;

      case 'view':
        if (id)
          window.location.href = '/admin/menu/' + id;
        break;

      case 'edit':
        if (id)
          window.location.href = '/admin/menu/' + id + '/edit';
        break;

      case 'delete':
        if (id) {
          form.find('input').val(id);
          form.submit();
        }
        break;
    }

  });

});
