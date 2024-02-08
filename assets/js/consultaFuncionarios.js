//Funcion general de consulta de funcionarios
export async function consumirDatosFuncionarios(categoria) {
    const folder = "DirectorioFuncionarios",
        params = ["IdFuncionario", "LinkFilename", "NombreFuncionario", "Categoria", "CargoFuncionario"];

    let ulrFetch = `${location.protocol}//${location.host}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}`;

    if (categoria && categoria != "Todas las categorias") {
        ulrFetch += `&$filter=Categoria eq '${categoria}'`; // Agregar filtro por categoría si se proporciona un valor
    }

    try {
        let data = await fetch(ulrFetch, {
            method: "GET",
            headers: {
                Accept: "application/json; odata=verbose",
            },
        });
        let resp = await data.json();
        
        return resp;
    } catch (error) {

    }
};

//Funcion de consulta filtrando por categoria
export async function funcionarioFiltradoCategoria(categoria) {
    const folder = "DirectorioFuncionarios",
        params = ["IdFuncionario", "LinkFilename", "NombreFuncionario", "Categoria", "CargoFuncionario"];

    let ulrFetch = `${location.protocol}//${location.host}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}`;

    if(categoria != "Todas las categorias"){
        ulrFetch += `&$filter=Categoria eq '${categoria}'`;
    }

    try {
        let data = await fetch(ulrFetch, {
            method: "GET",
            headers: {
                Accept: "application/json; odata=verbose",
            },
        });
        let resp = await data.json();
        
        return resp;
    } catch (error) {

    }
};

//Funcion de consulta filtrando por id del funcionario
export async function consultaInfoModal(idFuncionario) {
    const folder = "DirectorioFuncionarios",
        params = ["IdFuncionario", "LinkFilename", "NombreFuncionario", "Categoria", "CargoFuncionario", "InformacionBasica", "ExperienciaLaboral", "EstudiosFuncionario", "emailFuncionario", "telefonoFuncionario"];

    let ulrFetch = `${location.protocol}//${location.host}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$filter=IdFuncionario eq '${idFuncionario}'`;

    try {
        let data = await fetch(ulrFetch, {
            method: "GET",
            headers: {
                Accept: "application/json; odata=verbose",
            },
        });
        let resp = await data.json();
        
        return resp;
    } catch (error) {

    }
};

//Funcion para consultar las categorias disponibles
export async function consultaCategoriasSlider() {
    const folder = "DirectorioFuncionarios"

    let ulrFetch = `${location.protocol}//${location.host}/_api/web/lists/getbytitle('${folder}')/fields?$filter=EntityPropertyName eq 'Categoria'`;

    try {
        let data = await fetch(ulrFetch, {
            method: "GET",
            headers: {
                Accept: "application/json; odata=verbose",
            },
        });

        let resp = await data.json();
        
        const choiceField = resp.d.results[0];

        if (choiceField) {
            const choices = choiceField.Choices.results;
            
            return choices;

        } else {
            console.log('No se encontró la columna especificada.');
        }

    } catch (error) {

    }
};

//Consulta por busqueda
export async function consultaBusquedaInput(input) {
    const folder = "DirectorioFuncionarios",
        params = ["IdFuncionario", "LinkFilename", "NombreFuncionario", "Categoria", "CargoFuncionario"];

    let ulrFetch = `${location.protocol}//${location.host}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$top=2000&$filter=substringof('${input}',NombreFuncionario) or substringof('${input}',CargoFuncionario)`;

    try {
        let data = await fetch(ulrFetch, {
            method: "GET",
            headers: {
                Accept: "application/json; odata=verbose",
            },
        });
        let resp = await data.json();
        
        return resp;
    } catch (error) {

    }
};