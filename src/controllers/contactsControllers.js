exports.contacts = (req, res) => {
    res.send(`
    <form action = "/contatos" method = "POST">
    Telefone: <input type = "text" name = "tel"><br>
    Endereco: <input type = "text" name = "endereco">
    <button>Enviar</button>
    </form>
    `);
};

exports.sendContacts = (req, res) => {
    res.send(`Telefone: ${req.body.tel}`);
}