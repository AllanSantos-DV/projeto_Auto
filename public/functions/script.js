function salvarMudancas(id) {
    if (id === null) return;
    var nome = document.getElementById('nome' + id).value;
    var idade = document.getElementById('idade' + id).value;
    var selectCarros = document.querySelector(`select[name="carros${id}"]`);
    var carrosParaRemover = selectCarros ? Array.from(selectCarros.selectedOptions).map(option => option.value) : [];

    var selectCarrosDisponiveis = document.querySelector(`select[name="carrosDisponiveis${id}"]`);
    var carrosParaAdicionar = selectCarrosDisponiveis ? Array.from(selectCarrosDisponiveis.selectedOptions).map(option => option.value) : [];


    var data = { nome: nome, idade: idade };

    fetch('/pessoas/update/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(() => {
        if (carrosParaRemover.length > 0) {
            dessasociarCarro(id, carrosParaRemover);
        }
        if (carrosParaAdicionar.length > 0) {
            associarCarro(id, carrosParaAdicionar);
        }

        var myModal = new bootstrap.Modal(document.getElementById('editModal' + id));
        myModal.hide();
        location.reload();
    });
}

function dessasociarCarro(id, carros) {
    fetch('/carros/dessasociarCarro/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carros: carros })
    }).then(() => {
        location.reload();
    });
}

function associarCarro(id, carros) {
    fetch('/carros/associarCarro/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carros: carros })
    }).then(() => {
        location.reload();
    });
}

function redirecionar(select) {
    if (select === null) return;
    const url = select.value;
    select.value = "/pessoas";
    window.location.href = url;
}