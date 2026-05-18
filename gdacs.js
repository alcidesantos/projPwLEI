
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

function coordenadasToPixel(latitude, longitude, largura, altura) {
     const x = ((longitude + 180) / 360) * largura;
     const y = ((90 - latitude) / 180) * altura;
     return { x: x, y: y };
}

function desenharPonto(xIn, yIn) {
     const { x, y } = coordenadasToPixel(xIn, yIn, larguraNaPagina, alturaNaPagina);
     ctx.beginPath();
     ctx.arc(x, y, 5, 0, 2 * Math.PI);
     ctx.fillStyle = 'red';
     ctx.fill();
}

function pintaCoisas(larguraNaPagina, alturaNaPagina) {
     canvas.width = larguraNaPagina;
     canvas.height = alturaNaPagina;
     canvas.style.width = larguraNaPagina + 'px';
     canvas.style.height = alturaNaPagina + 'px';
     ctx.clearRect(0, 0, larguraNaPagina, alturaNaPagina);
     desenharPonto(39.23379, -8.68617);
     desenharPonto(0, 0);
     desenharPonto(90, 0);
     desenharPonto(-90, 0);
     desenharPonto(0, 180);
     desenharPonto(0, -180);
}

const larguraImagem = 10800; // Largura da imagem em pixels
const alturaImagem = 5400; // Altura da imagem em pixels 

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imagem = document.getElementById('mapaImagem');
const imgAltura = imagem.height;
mapaImagem.src = "NE2_50M_SR_reduzido.png";
mapaImagem.onload = function() {
     larguraNaPagina = 1200; // Largura da imagem na página em pixels
     alturaNaPagina = (alturaImagem / larguraImagem) * larguraNaPagina;
     ctx.drawImage(imagem, 0, 0, larguraNaPagina, alturaNaPagina);
     console.log( 'Imagem carregada e desenhada no canvas.' );
     pintaCoisas(larguraNaPagina, alturaNaPagina);
}
        

