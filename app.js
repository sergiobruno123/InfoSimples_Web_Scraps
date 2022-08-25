// Bibliotecas que nós instalamos manualmente
const cheerio = require('cheerio');
const request = require('request');
// Bibliotecas nativas do Node.js
const fs = require('fs');
// URL do site
const url = 'https://storage.googleapis.com/infosimples-public/commercia/case/product.html';
// Objeto contendo a resposta final
const respostaFinal = {};
// Faz o request e manipula o corpo de resposta
request(url, function (error, response, body) {
const parsedHtml = cheerio.load(body);
// Vamos pegar o título do produto, na tag H2, com ID "product_title"
respostaFinal['title'] = parsedHtml('h2#product_title').text();
respostaFinal['brand'] = parsedHtml('.brand').text();
respostaFinal['categories'] = parsedHtml('.current-category').text();
respostaFinal['description'] = parsedHtml('.product-details').text();
respostaFinal['skus'] = {'skuOne': {'nome':parsedHtml('.sku-name').text(), 'current_price':parsedHtml('#product_S0002202.sku-current-price').text(), 'old_price':parsedHtml('.sku-old-price').text()}}
respostaFinal['properties'] = parsedHtml('.pure-table pure-table-bordered').text();
respostaFinal['reviews'] = parsedHtml('#comments').text();
respostaFinal['reviews_average_score'] = parsedHtml('.review-stars').text() != '' ? true:false ;
respostaFinal['url'] = url;
/// Aqui você adiciona os outros campos...
// Gera string JSON com a resposta final
const jsonRespostaFinal = JSON.stringify(respostaFinal);
console.log(jsonRespostaFinal)
    // Salva o arquivo JSON com a resposta final
    fs.writeFile('produto.json', jsonRespostaFinal, function (err) {
        if (err) {
        // Loga o erro (caso ocorra)
        console.log(err);
        } else {
        console.log('Arquivo salvo com sucesso!');
        }
    });
});