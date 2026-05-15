
gdacsRequest(); 

function gdacsRequest() {

     const urlgdacs = 'https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH';
        fetch( urlgdacs )
        .then( function (urlgdacs) { 
               console.log( 'Resposta:', urlgdacs );
               return urlgdacs.json();
          })
          .then( function(dados) {
               console.log( 'Dados:', dados );
               casos = dados;
               //console.log( 'Passou na Linha 38', playlist );
               processaResposta_do_gdacs( casos );
          })
  
}

function processaResposta_do_gdacs( dados )
{
    console.log( 'Dados da resposta do GDACS:', dados );
    console.log( 'Array de eventos:', dados.features );
    console.log( 'dados.features[0].properties.eventtype:', dados.features[0].properties.eventtype );

}

