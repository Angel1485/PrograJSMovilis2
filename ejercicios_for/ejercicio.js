function listarNumeros()
{
    for (let i=0 ; i<=3; i++)
    {
        console.log(i); 
    }
}

function ejecutar(numEjercicio)
{
    if (numEjercicio === 1)
    {
        listarNumeros(); 
    }
    if (numEjercicio === 2)
    {
        listarNumerosReversa(); 
    }
    if (numEjercicio === 3)
    {
        listarPares(); 
    }
     if (numEjercicio === 4)
    {
        listarImpares(); 
    }
}

function listarNumerosReversa()
{
    for (let i=3 ; i>0; i--)
    {
        console.log(i);
    }
}

function listarPares()
{
    for (let i=0 ; i<10; i+=2)  /// operador abreviado
    {
        console.log(i);
    }
}

function listarImpares()
{
    for (let i=1 ; i<=7; i+=2)  /// operador abreviado
    {
        console.log(i);
    }
}