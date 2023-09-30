class UsuariosDAO {
    autenticar(nome_usuario, senha) {
        return {nome: nome_usuario};
    }
}

module.exports = UsuariosDAO;