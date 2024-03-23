function redirecionar(select) {
    if (select === null) return;
    const url = select.value;
    select.selectedIndex = 0;
    window.location.href = url;
};