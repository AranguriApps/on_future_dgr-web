function setNavClickListener(idBtn) {
    document.getElementById(idBtn).addEventListener('click', () => {
        const myCollapse = document.getElementById('navbarCollapsable')
        const bsCollapse = new bootstrap.Collapse(myCollapse)
        bsCollapse.hide()
    })
}

setNavClickListener('btnHome')
setNavClickListener('btnServices')
setNavClickListener('btnWe')
setNavClickListener('btnClients')
setNavClickListener('btnContact')