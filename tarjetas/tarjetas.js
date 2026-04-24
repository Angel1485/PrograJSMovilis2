// function crearTarjetas()
// {
//     let contenido = "";
//     let divTarjetas = document.getElementById("divTarjetas");
//     for (let i=0 ; i<=5; i++)
//     {
//         contenido =  contenido + "<div class = 'item'>" + i + "</div>"
//         divTarjetas.innerHTML =  contenido;
//     }
// }

function crearTarjetas()
{
    let contenido = "";
    let desde = document.getElementById("txtDesde").value;
    let hasta = document.getElementById("txtHasta").value;
    let salto = document.getElementById("txtSalto").value;
    let inicio = parseInt(desde);
    let fin = parseInt(hasta);
    let salta = parseInt(salto);

    for (let i=inicio ; i<=fin; i += salta)
    {
        contenido =  contenido + "<div class = 'item'>" + i + "</div>"
        divTarjetas.innerHTML =  contenido;
    }
}
