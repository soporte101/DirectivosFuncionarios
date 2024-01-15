//Funcion para pintar los funcionarios en la ventana principal
export async function pintarCardsFuncionarios(resp) {

    const funcionariosContainer = document.querySelector(".contenedor__funcionarios");

    funcionariosContainer.innerHTML = '';
    
    let data = resp?.d?.results || resp;

    for (const i in data) {
        const {
            IdFuncionario,
            LinkFilename,
            NombreFuncionario,
            CargoFuncionario,
            Categoria
        } = data[i];

        let funcionarioItem = `
        <div class="funcionario__item" data-categoria="${Categoria}" data-id="${IdFuncionario}">
            <div class="contenedor__img">
                <img src="/NuestraAlcaldia/DirectorioFuncionarios/${LinkFilename}" alt="${NombreFuncionario}" class="img__funcionario">
            </div>
        
            <div class="contenedor__contenido">
            <p class="nombre__funcionario">${NombreFuncionario}</p>
            <p class="cargo__funcionario">${CargoFuncionario}</p>
            </div>
        
            <div class="contenedor__btn">
                <a href="#" class="btn__funcionario">Hoja de vida</a>
            </div>
        </div>`;

        funcionariosContainer.innerHTML += funcionarioItem;
    }

}

//Funcion para pintar la informacion en el modal
export async function pintarInfoModal(resp) {
    const data = resp.d.results;

    // Obtener referencias a los elementos del DOM una sola vez fuera del bucle
    const nombreFuncionarioElement = document.querySelector('.nombre__funcionario-modal');
    const informacionBasicaElement = document.querySelector('.contenedor__informacion-basica .informacion__parrafo');
    const experienciaLaboralElement = document.querySelector('.informacion__laboral .informacion__parrafo');
    const estudiosFuncionarioElement = document.querySelector('.contenedor__informacion-estudios .informacion__parrafo');
    const imgFuncionarioModal = document.querySelector('.img__funcionario-modal');
    const EmailFuncionario = document.querySelector('.enlace__redes[title="Correo electrónico"]')
    const TelefonoFuncionario = document.querySelector('.enlace__redes[title="Teléfono"]')

    for (const i in data) {
        const {
            LinkFilename,
            NombreFuncionario,
            InformacionBasica,
            ExperienciaLaboral,
            EstudiosFuncionario,
            emailFuncionario,
            telefonoFuncionario
        } = data[i];

        // Asignar los valores obtenidos a los elementos del DOM
        nombreFuncionarioElement.innerText = NombreFuncionario;
        informacionBasicaElement.innerText = InformacionBasica;
        experienciaLaboralElement.innerText = ExperienciaLaboral;
        estudiosFuncionarioElement.innerText = EstudiosFuncionario;
        imgFuncionarioModal.src = `/NuestraAlcaldia/DirectorioFuncionarios/${LinkFilename}`;
        emailFuncionario.href = `mailto:${EmailFuncionario}`;
        telefonoFuncionario.href = `https://api.whatsapp.com/send/?phone=${TelefonoFuncionario}`;
    }
};


//Funcion para pintar items slider categoria
export async function pintarItemsCategoria(resp) {

    const categoriasContainer = document.querySelector(".categorias .swiper-wrapper");
    
    for (const i in resp) {

        let categoriaItem = `
        <a href="#" class="categorias__item swiper-slide" data-target="${resp[i]}">
            ${resp[i]}
        </a>`;

        categoriasContainer.innerHTML += categoriaItem;
    }

}