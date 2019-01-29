const btnLike = $('#btn-like');
const btnDelete = $('#btn-danger');

btnLike.click(function(e){
    e.preventDefault();
    $.post('/images/' + btnLike.data('id') + '/like')
        .done(data => {
            $('.likes-count').text(data.likes);
        });
});
btnDelete.click(function(e){
    e.preventDefault();
    const response = confirm('Seguro que quieres borrar');
    if (response){
        $.ajax({
            url: '/images/' + btnDelete.data('id'),
            type: 'DELETE'
        }).done(data => {
            if(data){
                btnDelete.removeClass('btn-danger').addClass('btn-success');
                btnDelete.find('i').removeClass('fa fa-times').addClass('fa fa-check');
            }
        });
    }
});