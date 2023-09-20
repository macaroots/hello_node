class EstudantesDAO {
    getEstudantes() {
        if (this.estudantes == null) {
            this.estudantes = [];
        }
        return this.estudantes;
    }
    validar(estudante) {
        if (!estudante.nome) {
            throw new Error('Nome não pode ser em branco');
        }
        if (estudante.nota1 < 0 || estudante.nota1 > 10 ||
            estudante.nota2 < 0 || estudante.nota2 > 10) {
            throw new Error('Notas devem estar entre 0 e 10');
        }
    }
    inserir(estudante) {
        let estudantes = this.getEstudantes();
        this.validar(estudante);
        estudantes.push(estudante);
        return estudantes.length;
    }
    listar() {
        return this.getEstudantes();
    }
    alterar(id, estudante) {
        this.validar(estudante);
        this.getEstudantes()[id - 1] = estudante;
    }
    apagar(id) {
        this.getEstudantes().splice(id - 1, 1);
    }
    procurar(id) {
        return this.getEstudantes()[id - 1];
    }
}

module.exports = EstudantesDAO;