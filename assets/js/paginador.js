import { pintarCardsFuncionarios } from './pintarFuncionarios.js';
import { consumirDatosFuncionarios } from './consultaFuncionarios.js';
import { abrirModal } from './funcionesUI.js';

let currentPage = 1;
let itemsPerPage = 6;
const numPagina = document.querySelector('.contenedor__numPagina');
export const prevButton = document.getElementById("atras");
export const nextButton = document.getElementById("siguiente");

export async function showCurrentPage(resp) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const data = resp.d.results;
    const dataToRender = data.slice(startIndex, endIndex);
    const cantidadPaginas = Math.ceil(data.length / itemsPerPage);
    const paginaActual = parseInt(document.querySelector('.contenedor__numPagina').innerText);

    const cardContainer = document.querySelector(".contenedor__funcionarios");
    cardContainer.innerHTML = ''; // Limpiar el contenido actual

    pintarCardsFuncionarios(dataToRender);
    abrirModal();


    //optimizar
    if(paginaActual === cantidadPaginas){
        nextButton.classList.add('paginador__item--inactive');
        prevButton.classList.remove('paginador__item--inactive');
    }
    else if(cantidadPaginas == 0){

        nextButton.classList.add('paginador__item--inactive');
        prevButton.classList.add('paginador__item--inactive');
    }
    else if(paginaActual === 1){
        prevButton.classList.add('paginador__item--inactive');
        nextButton.classList.remove('paginador__item--inactive');
    }
    else{
        nextButton.classList.remove('paginador__item--inactive');
        prevButton.classList.remove('paginador__item--inactive');
    }

}

prevButton.addEventListener("click", async (e) => {
    e.preventDefault();
    let categoriaActual = document.querySelector('.categorias__item--active').dataset.target;

    let datosConsulta = await consumirDatosFuncionarios(categoriaActual);

    if (currentPage > 1) {
        currentPage--;
        
        numPagina.innerText = currentPage;

        showCurrentPage(datosConsulta);
    }
});

nextButton.addEventListener("click", async (e) => {
    e.preventDefault();
    let categoriaActual = document.querySelector('.categorias__item--active').dataset.target;

    let datosConsulta = await consumirDatosFuncionarios(categoriaActual);

    let data = datosConsulta.d.results;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    if (currentPage < totalPages) {
        currentPage++;

        numPagina.innerText = currentPage;

        // Ocultar elementos anteriores
        const previousItems = document.querySelectorAll(".card");
        previousItems.forEach(item => {
            item.classList.add("hide");
        });

        showCurrentPage(datosConsulta);

    }
});