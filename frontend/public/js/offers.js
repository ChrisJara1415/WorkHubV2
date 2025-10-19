document.addEventListener('DOMContentLoaded', function () {
    const modal = new bootstrap.Modal(document.getElementById('jobDetailsModal'))
    const modalBody = document.getElementById('jobDetailsBody')
    const modalTitle = document.getElementById('jobDetailsModalLabel')
    let currentOffer = null

    function showMessage(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer')
        const toast = document.createElement('div')
        toast.className = `toast align-items-center text-bg-${type} border-0`
        toast.setAttribute('role', 'alert')
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `
        toastContainer.appendChild(toast)
        const bsToast = new bootstrap.Toast(toast)
        bsToast.show()
        toast.addEventListener('hidden.bs.toast', () => toast.remove())
    }

    document.querySelectorAll('[data-offer-id]').forEach(btn => {
        btn.addEventListener('click', async function () {
            const offerId = this.getAttribute('data-offer-id')
            try {
                const response = await fetch(`/ofertas/${offerId}`)
                const offer = await response.json()
                currentOffer = offer.data
                if (currentOffer) {
                    modalTitle.textContent = currentOffer.nombreServicio
                    modalBody.innerHTML = `
                        <p><strong>Descripción:</strong> ${currentOffer.descripcion || '-'}</p>
                        <p><strong>Categoría:</strong> ${currentOffer.categoria || '-'}</p>
                        <p><strong>Municipio:</strong> ${currentOffer.municipio?.nombre || '-'}</p>
                        <p><strong>Precio:</strong> ${currentOffer.precioReferencia || '-'}</p>
                        <p><strong>Fecha límite:</strong> ${currentOffer.fechaLimite ? new Date(currentOffer.fechaLimite).toLocaleDateString('es-CO') : '-'}</p>
                    `
                    modal.show()

                    // Botón para enviar postulación
                    const applyBtn = document.getElementById('applyBtn')
                    applyBtn.onclick = async () => {
                        if (!currentOffer) return
                        try {
                            const payload = {
                                servicio: {
                                    idServicio: currentOffer._id,
                                    nombreServicio: currentOffer.nombreServicio || ''
                                },
                                empleado: {
                                    idUsuario: '68ce25f7f26846d03fdad74d',
                                    nombre: 'Christian'
                                },
                                estado: 'Pendiente'
                            }
                            const postResponse = await fetch('/postulaciones', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload)
                            })
                            if (postResponse.ok) {
                                showMessage('Postulación enviada')
                                applyBtn.disabled = true
                                applyBtn.classList.remove('btn-warning')
                                applyBtn.classList.add('btn-secondary')
                                applyBtn.textContent = 'Postulado'
                            } else {
                                const errorData = await postResponse.json()
                                showMessage(errorData.message || 'No se pudo postular', 'danger')
                            }
                        } catch (err) {
                            showMessage('Error al enviar postulación', 'danger')
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching offer details:', error)
                modalBody.innerHTML = '<p>Error al cargar los detalles.</p>'
                modal.show()
            }
        })
    })
})