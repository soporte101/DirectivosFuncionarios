import { consumirDatosFuncionarios, 
        funcionarioFiltradoCategoria, 
        consultaInfoModal, 
        consultaCategoriasSlider, 
        consultaBusquedaInput } from './consultaFuncionarios.js';

import { pintarCardsFuncionarios, 
          pintarInfoModal, 
          pintarItemsCategoria } from './pintarFuncionarios.js';

import { showCurrentPage } from './paginador.js';

//Llamando funcion al cargar la pagina
const datosFuncionarios = await consumirDatosFuncionarios();
await showCurrentPage(datosFuncionarios);

//Pintar items de categoria
const datosCategorias = await consultaCategoriasSlider();
await pintarItemsCategoria(datosCategorias);
abrirModal();

//Configuración de colores generales
tailwind.config = {
  theme: {
    extend: {
      colors: {
        mainColor: "#36c",
        mainColorHover: "rgb(13, 51, 126)",
        colorTitulos: "#000",
        colorFondo: "#fff",
      },
    },
  },
};

var splide = new Splide( '.splide',{
  breakpoints: {
    1920: {
      perPage: 6,
      gap    : '.5rem',
    },
    1440: {
      perPage: 5,
      gap    : '.5rem',
    },
    1280: {
      perPage: 4,
    },
    1024: {
      perPage: 4,
      gap    : '.5rem',
    },
    960: {
      perPage: 3,
      gap    : '.5rem',
    },
    720: {
      perPage: 3,
      gap    : '.5rem',
    },
    640: {
      perPage: 2,
      gap    : '.5rem',
    },
    480: {
      perPage: 1,
      gap    : '.5rem',
    },
  },
  perPage: 4,
  gap: ".5rem",
  perMove: 1,
  rewind : true,
  pagination: false,
  classes: {
      arrows: 'splide__arrows',
      arrow : 'rounded-full',
      prev  : 'splide__arrow--prev absolute !left-[-2.5rem] scale-x-[1] top-0 min-w-[2.2rem] h-[2.2rem] border-0 flex items-center justify-center bg-gray-300 shadow-sm focus:!outline-none [&>svg]:w-[1rem]',
      next  : 'splide__arrow--next absolute !right-[-2.5rem] top-0 min-w-[2.2rem] h-[2.2rem] border-0 flex items-center justify-center bg-gray-300 shadow-sm focus:!outline-none [&>svg]:w-[1rem]',
  },
});

splide.mount();

//Cargar informacion en el modal
//Funcion modal
// Obtenemos el botón para abrir la ventana modal y la ventana modal misma
export function abrirModal() {

  const openBtnModal = document.querySelectorAll('.btn__funcionario');

  const modal = document.getElementById("myModal");

  // Obtenemos el elemento <span> que cierra la ventana modal
  const closeSpan = document.querySelector(".close");


  // Evento al hacer clic en el botón para abrir la ventana modal
  openBtnModal.forEach(btn =>{
      btn.addEventListener('click', async (e)=>{

          e.preventDefault();
          let idFuncionario = e.target.closest('.funcionario__item').dataset.id;
          const datosModal = await consultaInfoModal(idFuncionario);
          pintarInfoModal(datosModal);

          modal.style.display = "block";
      });
      
  });

  // Evento al hacer clic en el botón para cerrar la ventana modal
  closeSpan.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Evento para cerrar la ventana modal si se hace clic fuera de ella
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Funcion filtro por categorias
const categorias = document.querySelector('.categorias');

categorias.addEventListener('click', async (e)=>{

  if(e.target.closest('.categorias__item')){

    const categoriaActiva = document.querySelector('.categorias__item--active');

    categoriaActiva.classList.remove('categorias__item--active');

    e.target.classList.toggle('categorias__item--active');

    const categoriaSeleccionada = e.target.closest('.categorias__item--active').dataset.target;

    let datos = await funcionarioFiltradoCategoria(categoriaSeleccionada);

    showCurrentPage(datos);

    abrirModal();
    
  };
  
});

//Funcion de busqueda
const input = document.querySelector('.buscador__funcionarios');
const btn_buscar = document.querySelector('#btn__buscar');
let valueInput;

const funcionBusqueda = async () => {
  valueInput = document.querySelector('.buscador__funcionarios').value;
      
      if(valueInput){
        const datosBuscados = await consultaBusquedaInput(valueInput);

        //pintarCardsFuncionarios(datosBuscados);
        showCurrentPage(datosBuscados);
        abrirModal();
      }else {
        //await pintarCardsFuncionarios(datosFuncionarios);
        showCurrentPage(datosFuncionarios);
        abrirModal();
      };
};

input.addEventListener('focus', async function(event) {

  input.addEventListener('keypress', async function(event) {
    // Verificar si la tecla presionada es "Enter"
    if (event.keyCode === 13) {
      event.preventDefault();
      funcionBusqueda();
    }
  });

  btn_buscar.addEventListener('click', async (e) => {
    e.preventDefault();
    funcionBusqueda();
  });
  
});

//Evento eliminar texto de input
const btn__borrar = document.getElementById('btn__borrar');

input.addEventListener('keyup', (e) => {

  if(input.value.length > 0){
    btn__borrar.style.display = 'block';
    btn__borrar.addEventListener('click', async (e) =>{
      e.preventDefault();

      input.value = '';
      btn__borrar.style.display = 'none';

      let datosBuscados = await consumirDatosFuncionarios();

      //pintarCardsFuncionarios(datosBuscados);
      showCurrentPage(datosBuscados);
    });
  }
  else{
    btn__borrar.style.display = 'none';
  }
});