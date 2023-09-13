class Estudante {
    constructor(nome, nota1, nota2) {
        this.nome = nome;
        this.nota1 = nota1;
        this.nota2 = nota2;
    }

    getMedia() {
        return (this.nota1 + this.nota2) / 2;;
    }
    
    getSituacao() {
        let situacao;
        let media = this.getMedia();
        if (media >= 6) {
            situacao = 'aprovado';
        }
        else if (media >= 3) {
            situacao = 'exame';
        }
        else {
            situacao = 'reprovado';
        }
        return situacao;
    }

}

module.exports = Estudante;