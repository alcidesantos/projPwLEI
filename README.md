# projPwLEI
Projecto para disciplina de Programação para a Web da licenciatura em Engenharia de Informática

***Autor:*** *Alcides Santos*

***Aluno Número:*** *250000693*

## Objectivo
- Pretende-se uma página que mostre as situações de catástrofe natural no mundo.

## Detalhe das Alterações

### 4 de Maio
- Início do projecto. 
- Pesquisa inicial sobre o que existe. 
- Criação de projecto no GitHub.

### 5 de Maio
- Pesquisa sobre os repositórios existentes. Uns mostram só terramotos, outros, só incêndios, outros outra informação. Há vários que são licenciados. 
- No entanto, o da organização GDACS (Globas Disaster Awareness and Coordination System, que é uma cooperação entre as Nações Unidas, a Comissão Europeia e outros gestores de desastres) disponibiliza sem custo informação sobre terremotos, inundações, ciclones tropicais, vulcões, incêndios florestais e secas.

### 16 de Maio
- Primeiros testes com os dados existentes. Como existem vários, a dificuldade é escolher.

### 17 de Maio
- Decidido quais os dados a usar. Contem informação sobre os últimos 13 meses.
https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH
- Pesquisa de uma imagem. Esta imagem deve representar a totalidade do globo e tem que existir uma regra para a conversão de qualquer coordenada num pixel dessa imagem. 

### 18 de Maio
- Encontrada uma imagem em
https://www.naturalearthdata.com/downloads/50m-natural-earth
que é um projecto liderado por Nathaniel Vaughn Kelso and Tom Patterson. - Existem várias versões, tendo obtado pela de menor definição (50 metros) e que tenha o mar a branco. Mesmo assim, a imagem tem 39MB. Como vinha em tif converti para png e reduzi para 10MB.
- Obtidos os primeiros resultados. Aparecem pontos em função das coordenadas (0,180; 0,0; 0,-180; 90,0; -90,0; Santarém). Os pontos aparecem mas não é deterministico. Professor ajudou. 
- Passaram a aparecer a totalidade dos pontos.
- A cor dos pontos depende do tipo de evento.

### 19 de Maio
- Escreve na página, abaixo da imagem, detalhes do evento ao qual o rato esteja a passar.
- Os mesmos dados apssaram a aprecer numa caixa ao lado do evento ao qual o rato esteja a passar.
- Adicionada legenda.

### 20 de Maio
- Permite filtrar os eventos a aparecer em função de um clic na cor ou texto da legenda.
- Permite também filtrar os eventos a aparecer em função do mês do mesmo. Para tal clica-se no mês correspondente na caixa ao lado da legenda.
- Actualizado README.
- Terminada a primeira versão.

## A realizar numa nova versão.
- Obter a mesma funcionalidade no google maps. 

## Link para o Projecto
https://alcidesantos.github.io/projPwLEI/