/*
 Requisitos conforme email:
 
 Preciso que você implemente um algoritmo de busca em largura, percorrendo todos os Nós do grafo representado pela estrutura que está em anexo grafo.json.

Os Nós podem ser encontrados dentro de "nodes". Cada um deles possui uma ou várias portas de entrada e de saída, representados dentro da propriedade "ports".

Dentro de "ports", cada objeto possui uma propriedade chamada "links" que contém o ID da aresta associada à porta em questão. Para descobrir a quem o nó está conectado naquela porta, basta procurar pelo ID da aresta dentro da propriedade "links" que está na raiz do objeto.

Na propriedade "links" da raiz do objeto, cada entrada representa uma aresta do grafo. O atributo "source" representa o nó de entrada e o atributo "target"  representa o nó de saída.

O algoritmo de busca em largura deve imprimir o id dos nós na sequência em que foram visitados.Assim que finalizar o teste, favor enviar para um repositório de sua escolha. É necessário uma breve descrição de como executar o algoritmo. 
 */

var grafoJson = require('./grafo.json'); // objeto vindo do json

var links = grafoJson.links; // lista de arestas
var nodes = grafoJson.nodes; // lista de nodos

// pega o obj link apartir de seu id
// string linkId -> link object
var GetLinkObject = function(linkId){
    //console.log("Buscando pelo linkId: " + linkId);
    for(link of links){
        if(link.id === linkId){
            return link;
        }
    }
    return null;
}

// pega o obj nodo apartir de seu id
// string nodeId -> node object
var GetNodeObject = function(nodeId){
    //console.log("Buscando pelo nodeId: " + nodeId);
    for(node of nodes){
        if(node.id === nodeId){
            return node;
        }
    }
    return null;
}

// pega lista de obj link apartir de um obj nodo
// node object -> array link object
var GetLinksDeNode = function(node){
    //console.log("Vai buscar todos os links nos ports do node: " + node.id);
    var retorno = [];
    for(port of node.ports){
        retorno.push(GetLinkObject(port.links[0]));
    }
    return retorno;
}

// pega lista de obj nodos adjacentes de um obj nodo
// node object -> array node object
var GetAdjacentNodes = function(node){
    var nodeLinks = GetLinksDeNode(node);
    var retorno = [];
    
    for(link of nodeLinks){
        if(link.source === node.id) retorno.push(GetNodeObject(link.target));
        else if(link.target === node.id) retorno.push(GetNodeObject(link.source));
    }
    
    return retorno;
    
}

// procura em um array de obj nodos se tem algum nodo não marcado
// se tiver, o marca e o retorna
// caso contrário, retorna null
var ProcuraNodeNaoMarcado = function(nodeArray){
    for(node of nodeArray){
        if(!node.marcado){
            node.marcado = true;
            return node;
        }
    }
    return null;
}

// Visita o nodo
var Visita = function(node){
    console.log("Nodo visitado: " + node.id);
}

// Visita cada nodo do grafo em "largura" e apartir de um dado nodo inicial
var percorreEmLargura = function(startNode){
    var filaVisitas = []
    startNode.marcado = true;
    filaVisitas.push(startNode);
    while(filaVisitas.length > 0){
        var temp = filaVisitas.shift();
        Visita(temp);
        var adjacentesTemp = GetAdjacentNodes(temp);
        while(temp2 = ProcuraNodeNaoMarcado(adjacentesTemp)){
            filaVisitas.push(temp2);
        }
        
        
    }
    
}

// basta escolher qual nodo começar
// nodes[0], nodes[1], nodes[2], etc...
percorreEmLargura(nodes[0]);
