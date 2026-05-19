
const cores = new Map();
cores.set('EQ', 'brown');     // termor de terra: castanho
cores.set('FL', 'blue');      // inundação: azul
cores.set('TC', 'DodgerBlue');          // ciclone: azul
cores.set('VO', 'orange');          // vulcão: laranja
cores.set('WF', 'red');          // incendio: vermelho
cores.set('DR', 'yellow');          // seca: amarelo

let pontos = [];  

const larguraImagem = 10800; // Largura da imagem em pixels
const alturaImagem = 5400; // Altura da imagem em pixels 

const canvas = document.getElementById('canvas');
const imagem = document.getElementById('mapaImagem');
let pontoActual = document.getElementById('pontoActual');
let countryTxt = document.getElementById('country');
let descriptionTxt = document.getElementById('description');
let eventtypeTxt = document.getElementById('eventtype');
let episodealertlevelTxt = document.getElementById('episodealertlevel');
let eventidTxt = document.getElementById('eventid');
let fromdateTxt = document.getElementById('fromdate');
let nomeEventoTxt = document.getElementById('nomeEvento');
let imgAltura = imagem.height;
let ctx = canvas.getContext('2d');

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
     
     for (const feature of dados.features) {
          y = feature.geometry.coordinates[0];
          x = feature.geometry.coordinates[1];
          
          country = feature.properties.country;
          description = feature.properties.description;
          eventtype = feature.properties.eventtype;
          episodealertlevel = feature.properties.episodealertlevel;
          eventid = feature.properties.eventid;
          fromdate = feature.properties.fromdate;
          nomeEvento = feature.properties.name;
          cor = feature.properties.eventtype;
          //console.log("cor", cor);
          //console.log("x:", x);
          //console.log("y:", y);
          pontos.push({ 
               x: x, 
               y: y, 
               raio: 5, 
               cor: cores.get(cor), 
               hover: false,
               country: country,
               description: description,
               eventtype: eventtype,
               episodealertlevel: episodealertlevel,
               eventid: episodealertlevel,
               fromdate: fromdate,
               nomeEvento: nomeEvento
          })
          desenharPonto(x, y, cores.get(cor));
     }

}

function coordenadasToPixel(latitude, longitude, largura, altura) {
     const x = ((longitude + 180) / 360) * largura;
     const y = ((90 - latitude) / 180) * altura;
     return { x: x, y: y };
}

function desenharPonto(xIn, yIn, cor) {
     const { x, y } = coordenadasToPixel(xIn, yIn, larguraNaPagina, alturaNaPagina);
     ctx.beginPath();
     ctx.arc(x, y, 5, 0, 2 * Math.PI);
     ctx.fillStyle = cor;
     ctx.fill(); 
}

function encontrarPontoSobMouse(mouseX, mouseY) {
     //const { x, y } = coordenadasToPixel(mouseX, mouseY, larguraNaPagina, alturaNaPagina);
     for (let i = pontos.length - 1; i >= 0; i--) {
          const p = pontos[i];
          const { x, y } = coordenadasToPixel(p.x, p.y, larguraNaPagina, alturaNaPagina);
          const dx = mouseX - x; //p.x;
          const dy = mouseY - y; //p.y;
          if (Math.sqrt(dx*dx + dy*dy) <= p.raio) {
               return p;
          }
     }
     return null;
}

canvas.addEventListener('mousemove', (e) => {
     const rect = canvas.getBoundingClientRect();
     const scaleX = canvas.width / rect.width;
     const scaleY = canvas.height / rect.height;
  
     const mouseX = (e.clientX - rect.left) * scaleX;
     const mouseY = (e.clientY - rect.top) * scaleY;
  
     const pontoSobMouse = encontrarPontoSobMouse(mouseX, mouseY);
  
     // Atualiza estados de hover
     pontos.forEach(p => {
          const estavaHover = p.hover;
          p.hover = (p === pontoSobMouse);
    
          if (p.hover && !estavaHover) {
               console.log(`Mouse sobre ponto em (${p.x}, ${p.y})`);
               console.log("p: " + p);
               console.log("p.country:" + p.country);
               countryTxt.textContent = p.country;
               descriptionTxt.textContent = p.description;
               eventtypeTxt.textContent = p.eventtype;
               episodealertlevelTxt.textContent = p.episodealertlevel;
               eventidTxt.textContent = p.eventid;
               fromdateTxt.textContent = p.fromdate;
               nomeEventoTxt.textContent = p.nomeEvento;
               
          }
     })
});

function pintaCoisas(larguraNaPagina, alturaNaPagina) {
     canvas.width = larguraNaPagina;
     canvas.height = alturaNaPagina;
     canvas.style.width = larguraNaPagina + 'px';
     canvas.style.height = alturaNaPagina + 'px';
     ctx.clearRect(0, 0, larguraNaPagina, alturaNaPagina);
     //desenharPonto(39.23379, -8.68617);
     //desenharPonto(0, 0);
     //desenharPonto(90, 0);
     //desenharPonto(-90, 0);
     //desenharPonto(0, 180);
     //desenharPonto(0, -180);
}


mapaImagem.src = "NE2_50M_SR_reduzido.png";
mapaImagem.onload = function() {
     larguraNaPagina = 1200; // Largura da imagem na página em pixels
     alturaNaPagina = (alturaImagem / larguraImagem) * larguraNaPagina;
     ctx.drawImage(imagem, 0, 0, larguraNaPagina, alturaNaPagina);
     console.log( 'Imagem carregada e desenhada no canvas.' );
     pintaCoisas(larguraNaPagina, alturaNaPagina);
}
        

console.log(pontos);