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
        <div
  class="funcionario__item w-[250px] h-[300px] shadow-md flex flex-col justify-evenly items-center rounded-sm transition-all duration-500 overflow-hiiden"
  data-categoria="${Categoria}"
  data-id="${IdFuncionario}"
>
  <div class="contenedor__img w-[70%] flex flex-col justify-center items-center relative z-1">
    <img
      src="/DirectorioFuncionarios/${LinkFilename}"
      alt="${NombreFuncionario}"
      class="img__funcionario w-[70%] rounded-full scale-100 transition-all duration-500 z-99"
    />
  </div>

  <div class="contenedor__contenido w-full flex flex-col items-center">
    <p class="nombre__funcionario text-lg text-colorTitulos font-bold">${NombreFuncionario}</p>
    <p class="cargo__funcionario text-sm text-[#727272]">${CargoFuncionario}</p>
  </div>

  <div class="contenedor__btn w-full flex items-center justify-center">
    <a href="#" class="btn__funcionario no-underline p-[8px] rounded-md bg-mainColor hover:bg-mainColorHover text-white transition-all duration-500">Hoja de vida</a>
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


        console.log("Aquiiiii");
        console.log(emailFuncionario);

        // Asignar los valores obtenidos a los elementos del DOM
        nombreFuncionarioElement.innerText = NombreFuncionario;
        informacionBasicaElement.innerText = InformacionBasica;
        experienciaLaboralElement.innerText = ExperienciaLaboral;
        estudiosFuncionarioElement.innerText = EstudiosFuncionario;
        imgFuncionarioModal.src = `/DirectorioFuncionarios/${LinkFilename}`;
        EmailFuncionario.innerHTML = `<i class="fa fa-envelope icono-redes"></i> ${emailFuncionario}`;
        TelefonoFuncionario.innerHTML = `<i class="fa fa-phone icono-redes"></i> ${telefonoFuncionario}`;
    }
};


//Funcion para pintar items slider categoria
export async function pintarItemsCategoria(resp) {

    const categoriasContainer = document.querySelector(".splide__list");
    
    for (const i in resp) {

        let categoriaItem = `
        <a href="#" class="categorias__item splide__slide no-underline  p-[10px] rounded-lg bg-mainColor hover:bg-mainColorHover text-colorTitulos font-medium text-white text-[0.8rem] text-center z-98 transition-all duration-500 !h-full flex items-center justify-center" data-target="${resp[i]}">
          ${resp[i]}
        </a>`;

        

        categoriasContainer.innerHTML += categoriaItem;
    }

}