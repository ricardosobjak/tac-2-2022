let a = 4;
var b = 5;
c = a + b;

function teste() {
    if(true) {
        let x =2;
        var y =3;
    }
    console.log(x); //Error
    console.log(y); // ok
}

var cidades = [
    { nome: 'MEdianeira', uf: 'PR', populacao: 50000 },
    { nome: 'Missal', uf: 'PR', populacao: 10000 },
    { nome: 'Cascavel', uf: 'PR', populacao: 350000 },
    { nome: 'São Paulo', uf: 'SP', populacao: 12000000 },
    { nome: 'Campinas', uf: 'SP', populacao: 1500000 },
    { nome: 'Chapeco', uf: 'SC', populacao: 250000 },
];

class Cidade {
    nome; // Atributos
    uf;
    populacao;

    constructor(nome, uf = "", populacao = 0) {
        this.nome = nome;
        this.uf = uf;
        this.populacao = populacao;
    }
}

const curitiba = new Cidade("Curitiba", "PR");
const floripa = new Cidade("Florianópolis", 'SC', 600000)

console.log(cidades);
console.log(curitiba);
console.log(floripa);

console.log(new Cidade())

cidades.push(curitiba); // Adiciona no final do array
cidades.unshift(floripa); // Adiciona no início do array

console.log(cidades);

cidades.pop(); // Retira um elemento do final do array
cidades.shift(); // Retira um elemento do início array

console.log(cidades)

cidades.splice(1, 1); // Remove o elemento da posição 1

// Percorrendo array com forEach

function mostrarElementoEIndice(elemento, indice, todoArray) {
    console.log(`Posição ${indice}=`, elemento, todoArray);
}

cidades.forEach(  mostrarElementoEIndice );


// Aplicando FIlter (filtrar cidades >= 100000)

const maiores = cidades.filter(function (e, i, a) {
    return e.populacao >= 100000;
} );

console.table(maiores);

//const xxx = (a,b,c,d) => {c};


console.log( 0 == '0' ); // true
console.log( 0 === '0' ); // false

const pr = cidades.filter( (e) => {
    return e.uf == "PR";
} );
console.table(pr);


const pr2 = cidades.filter( e => e.uf == "PR" );
console.table(pr2);

// Mapeamento -> Extrair somente a população das cidades
const populacoes = cidades.map( e => e.populacao);
console.log(populacoes);

const total = populacoes.reduce((soma, e) => soma + e );
console.log("Total", total);


const total2 = cidades.map(e => e.populacao)
    .filter( e => e >= 100000)
    .reduce( (acc, e) => acc+e, 0);

    console.log(total2)

    console.table(cidades);