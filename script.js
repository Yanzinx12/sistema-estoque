let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let produtoEditando = null;

let entradas = JSON.parse(localStorage.getItem("entradas")) || [];
let saidas = JSON.parse(localStorage.getItem("saidas")) || [];
let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

let itensVenda = [];


// ==================================================
// PRODUTOS
// ==================================================

function mostrarProdutos() {

    document.querySelector("main").innerHTML = `

        <h2>Produtos</h2>

        <button onclick="novoProduto()">
            + Novo Produto
        </button>

        <table>

            <thead>
                <tr>
                    <th>Código</th>
                    <th>Produto</th>
                    <th>Fornecedor</th>
                    <th>Categoria</th>
                    <th>Custo</th>
                    <th>Venda</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody id="tabelaProdutos"></tbody>

        </table>
    `;

    const tabela =
        document.getElementById("tabelaProdutos");

    produtos.forEach(function(produto, indice) {

        tabela.innerHTML += `

            <tr>

                <td>${produto.codigo}</td>

                <td>${produto.nome}</td>

                <td>${produto.fornecedor}</td>

                <td>${produto.categoria}</td>

                <td>
                    R$ ${Number(produto.precoCusto).toFixed(2)}
                </td>

                <td>
                    R$ ${Number(produto.precoVenda).toFixed(2)}
                </td>

                <td>

                    <button onclick="editarProduto(${indice})">
                        ✏️
                    </button>

                    <button onclick="excluirProduto(${indice})">
                        🗑️
                    </button>

                </td>

            </tr>
        `;
    });
}


function novoProduto() {

    let proximoCodigo = 1;

    if (produtos.length > 0) {

        const codigosNumericos =
            produtos
                .map(function(produto) {
                    return Number(produto.codigo);
                })
                .filter(function(codigo) {
                    return !isNaN(codigo) && codigo > 0;
                });

        if (codigosNumericos.length > 0) {
            proximoCodigo =
                Math.max(...codigosNumericos) + 1;
        }
    }

    document.querySelector("main").innerHTML = `

        <h2>Novo Produto</h2>

        <label>Código:</label>
        <input
            type="text"
            id="codigo"
            value="${proximoCodigo}"
        >

        <label>Nome do produto:</label>
        <input type="text" id="nome">

        <label>Fornecedor:</label>
        <input type="text" id="fornecedor">

        <label>Categoria:</label>
        <input type="text" id="categoria">

        <label>Preço de custo:</label>
        <input type="number" id="precoCusto">

        <label>Preço de venda:</label>
        <input type="number" id="precoVenda">

        <label>Estoque mínimo:</label>
        <input type="number" id="estoqueMinimo">

        <br><br>

        <button onclick="salvarProduto()">
            Salvar Produto
        </button>

        <button onclick="mostrarProdutos()">
            Cancelar
        </button>
    `;
}


function salvarProduto() {

    const produto = {

        codigo:
            document.getElementById("codigo").value.trim(),

        nome:
            document.getElementById("nome").value.trim(),

        fornecedor:
            document.getElementById("fornecedor").value.trim(),

        categoria:
            document.getElementById("categoria").value.trim(),

        precoCusto:
            document.getElementById("precoCusto").value,

        precoVenda:
            document.getElementById("precoVenda").value,

        estoqueMinimo:
            document.getElementById("estoqueMinimo").value
    };

    if (produto.codigo === "") {
        alert("Informe o código do produto.");
        return;
    }

    if (produto.nome === "") {
        alert("Informe o nome do produto.");
        return;
    }

    if (produto.fornecedor === "") {
        alert("Informe o fornecedor.");
        return;
    }

    if (produto.categoria === "") {
        alert("Informe a categoria.");
        return;
    }

    if (produto.precoCusto === "") {
        alert("Informe o preço de custo.");
        return;
    }

    if (produto.precoVenda === "") {
        alert("Informe o preço de venda.");
        return;
    }

    if (produto.estoqueMinimo === "") {
        alert("Informe o estoque mínimo.");
        return;
    }

    const codigoExistente =
        produtos.find(function(item, indice) {

            return (
                item.codigo === produto.codigo &&
                indice !== produtoEditando
            );

        });

    if (codigoExistente) {

        alert(
            "Já existe um produto com esse código."
        );

        return;
    }

    if (produtoEditando === null) {

        produtos.push(produto);

    } else {

        produtos[produtoEditando] = produto;
        produtoEditando = null;
    }

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

    alert("Produto salvo com sucesso!");

    mostrarProdutos();
}


function editarProduto(indice) {

    produtoEditando = indice;

    const produto = produtos[indice];

    document.querySelector("main").innerHTML = `

        <h2>Editar Produto</h2>

        <label>Código:</label>

        <input
            type="text"
            id="codigo"
            value="${produto.codigo}"
        >

        <label>Nome do produto:</label>

        <input
            type="text"
            id="nome"
            value="${produto.nome}"
        >

        <label>Fornecedor:</label>

        <input
            type="text"
            id="fornecedor"
            value="${produto.fornecedor}"
        >

        <label>Categoria:</label>

        <input
            type="text"
            id="categoria"
            value="${produto.categoria}"
        >

        <label>Preço de custo:</label>

        <input
            type="number"
            id="precoCusto"
            value="${produto.precoCusto}"
        >

        <label>Preço de venda:</label>

        <input
            type="number"
            id="precoVenda"
            value="${produto.precoVenda}"
        >

        <label>Estoque mínimo:</label>

        <input
            type="number"
            id="estoqueMinimo"
            value="${produto.estoqueMinimo}"
        >

        <br><br>

        <button onclick="salvarProduto()">
            Salvar Alterações
        </button>

        <button onclick="mostrarProdutos()">
            Cancelar
        </button>
    `;
}


function excluirProduto(indice) {

    const confirmar =
        confirm(
            "Deseja realmente excluir este produto?"
        );

    if (!confirmar) {
        return;
    }

    produtos.splice(indice, 1);

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

    mostrarProdutos();
}


// ==================================================
// ENTRADAS
// ==================================================

function mostrarEntrada() {

    document.querySelector("main").innerHTML = `

        <h2>Entrada de Produtos</h2>

        <label>Produto:</label>

        <input
            type="text"
            id="pesquisaProdutoEntrada"
            placeholder="Digite nome ou código do produto..."
            autocomplete="off"
        >

        <div
            id="resultadoProdutosEntrada"
            class="pdv-resultados"
        ></div>

        <div id="produtoSelecionadoEntrada"></div>

        <input
            type="hidden"
            id="produtoEntrada"
        >

        <label>Quantidade:</label>

        <input
            type="number"
            id="quantidadeEntrada"
            min="1"
            step="1"
        >

        <label>Data da entrada:</label>

        <input
            type="date"
            id="dataEntrada"
        >

        <label>Fornecedor:</label>

        <input
            type="text"
            id="fornecedorEntrada"
        >

        <label>Observação:</label>

        <textarea
            id="observacaoEntrada"
        ></textarea>

        <br><br>

        <button onclick="registrarEntrada()">
            Registrar Entrada
        </button>

        <button onclick="mostrarEntradas()">
            Ver Entradas
        </button>
    `;

    const dataAtual =
        new Date()
            .toISOString()
            .split("T")[0];

    document.getElementById(
        "dataEntrada"
    ).value = dataAtual;


    // PESQUISA DA ENTRADA

    document.getElementById(
        "pesquisaProdutoEntrada"
    ).addEventListener(
        "input",
        buscarProdutoEntrada
    );
}


function buscarProdutoEntrada() {

    const campo =
        document.getElementById(
            "pesquisaProdutoEntrada"
        );

    const resultado =
        document.getElementById(
            "resultadoProdutosEntrada"
        );

    if (!campo || !resultado) {
        return;
    }

    const texto =
        campo.value
            .toLowerCase()
            .trim();

    resultado.innerHTML = "";

    if (texto === "") {
        return;
    }

    const produtosEncontrados =
        produtos.filter(function(produto) {

            const nome =
                String(produto.nome)
                    .toLowerCase();

            const codigo =
                String(produto.codigo)
                    .toLowerCase();

            return (
                nome.includes(texto) ||
                codigo.includes(texto)
            );
        });


    if (produtosEncontrados.length === 0) {

        resultado.innerHTML = `

            <div class="pdv-produto-resultado">

                Nenhum produto encontrado.

            </div>

        `;

        return;
    }


    produtosEncontrados.forEach(
        function(produto) {

            const div =
                document.createElement("div");

            div.className =
                "pdv-produto-resultado";

            div.innerHTML = `

                <strong>
                    ${produto.nome}
                </strong>

                <br>

                <small>
                    Código: ${produto.codigo}
                </small>

                <br>

                <small>
                    Fornecedor:
                    ${produto.fornecedor || "-"}
                </small>

            `;

            div.addEventListener(
                "click",
                function() {

                    selecionarProdutoEntrada(
                        produto.codigo
                    );

                }
            );

            resultado.appendChild(div);
        }
    );
}


function selecionarProdutoEntrada(codigo) {

    const produto =
        produtos.find(function(item) {

            return String(item.codigo) ===
                String(codigo);

        });

    if (!produto) {

        alert("Produto não encontrado.");

        return;
    }

    const campo =
        document.getElementById(
            "pesquisaProdutoEntrada"
        );

    const produtoHidden =
        document.getElementById(
            "produtoEntrada"
        );

    const resultado =
        document.getElementById(
            "resultadoProdutosEntrada"
        );

    const selecionado =
        document.getElementById(
            "produtoSelecionadoEntrada"
        );

    const fornecedor =
        document.getElementById(
            "fornecedorEntrada"
        );


    if (
        !campo ||
        !produtoHidden ||
        !resultado ||
        !selecionado ||
        !fornecedor
    ) {
        return;
    }


    produtoHidden.value =
        produto.codigo;

    campo.value =
        produto.codigo +
        " - " +
        produto.nome;

    resultado.innerHTML = "";


    selecionado.innerHTML = `

        <div class="pdv-produto-selecionado">

            <strong>
                ${produto.nome}
            </strong>

            <span>
                Código: ${produto.codigo}
            </span>

            <br>

            <span>
                Fornecedor:
                ${produto.fornecedor || "Não informado"}
            </span>

        </div>

    `;


    fornecedor.value =
        produto.fornecedor || "";
}


function registrarEntrada() {

    const produto =
        document.getElementById(
            "produtoEntrada"
        ).value;

    const quantidade =
        document.getElementById(
            "quantidadeEntrada"
        ).value;

    const data =
        document.getElementById(
            "dataEntrada"
        ).value;

    const fornecedor =
        document.getElementById(
            "fornecedorEntrada"
        ).value.trim();

    const observacao =
        document.getElementById(
            "observacaoEntrada"
        ).value.trim();


    if (produto === "") {

        alert("Selecione um produto.");

        return;
    }


    if (quantidade === "") {

        alert("Informe a quantidade.");

        return;
    }


    if (Number(quantidade) <= 0) {

        alert(
            "A quantidade deve ser maior que zero."
        );

        return;
    }


    if (data === "") {

        alert("Informe a data da entrada.");

        return;
    }


    if (fornecedor === "") {

        alert("Informe o fornecedor.");

        return;
    }


    const entrada = {

        produto: produto,

        quantidade:
            Number(quantidade),

        data: data,

        fornecedor:
            fornecedor,

        observacao:
            observacao
    };


    entradas.push(entrada);


    localStorage.setItem(
        "entradas",
        JSON.stringify(entradas)
    );


    alert(
        "Entrada registrada com sucesso!"
    );


    mostrarEntrada();
}


function mostrarEntradas() {

    document.querySelector("main").innerHTML = `

        <h2>Entradas Registradas</h2>

        <button onclick="mostrarEntrada()">
            + Nova Entrada
        </button>

        <table>

            <thead>

                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Data</th>
                    <th>Fornecedor</th>
                    <th>Observação</th>
                    <th>Ações</th>
                </tr>

            </thead>

            <tbody id="tabelaEntradas"></tbody>

        </table>
    `;


    const tabela =
        document.getElementById(
            "tabelaEntradas"
        );


    if (entradas.length === 0) {

        tabela.innerHTML = `

            <tr>

                <td colspan="6">
                    Nenhuma entrada registrada.
                </td>

            </tr>

        `;

        return;
    }


    entradas.forEach(
        function(entrada, indice) {

            const produtoEncontrado =
                produtos.find(
                    function(produto) {

                        return String(
                            produto.codigo
                        ) === String(
                            entrada.produto
                        );

                    }
                );


            let nomeProduto =
                entrada.produto;


            if (produtoEncontrado) {

                nomeProduto =
                    produtoEncontrado.codigo +
                    " - " +
                    produtoEncontrado.nome;
            }


            tabela.innerHTML += `

                <tr>

                    <td>
                        ${nomeProduto}
                    </td>

                    <td>
                        ${entrada.quantidade}
                    </td>

                    <td>
                        ${entrada.data}
                    </td>

                    <td>
                        ${entrada.fornecedor}
                    </td>

                    <td>
                        ${entrada.observacao || "-"}
                    </td>

                    <td>

                        <button
                            onclick="editarEntrada(${indice})"
                        >
                            ✏️
                        </button>

                        <button
                            onclick="excluirEntrada(${indice})"
                        >
                            🗑️
                        </button>

                    </td>

                </tr>

            `;
        }
    );
}


function editarEntrada(indice) {

    const entrada =
        entradas[indice];


    if (!entrada) {

        alert("Entrada não encontrada.");

        return;
    }


    document.querySelector("main").innerHTML = `

        <h2>Editar Entrada</h2>

        <label>Produto:</label>

        <select id="produtoEntrada">

            <option value="">
                Selecione um produto
            </option>

        </select>


        <label>Quantidade:</label>

        <input
            type="number"
            id="quantidadeEntrada"
            min="1"
            step="1"
            value="${entrada.quantidade}"
        >


        <label>Data da entrada:</label>

        <input
            type="date"
            id="dataEntrada"
            value="${entrada.data}"
        >


        <label>Fornecedor:</label>

        <input
            type="text"
            id="fornecedorEntrada"
            value="${entrada.fornecedor || ""}"
        >


        <label>Observação:</label>

        <textarea
            id="observacaoEntrada"
        >${entrada.observacao || ""}</textarea>


        <br><br>


        <button
            onclick="salvarEdicaoEntrada(${indice})"
        >
            Salvar Alterações
        </button>

        <button onclick="mostrarEntradas()">
            Cancelar
        </button>
    `;


    const selectProduto =
        document.getElementById(
            "produtoEntrada"
        );


    produtos.forEach(function(produto) {

        selectProduto.innerHTML += `

            <option value="${produto.codigo}">
                ${produto.codigo} - ${produto.nome}
            </option>

        `;
    });


    selectProduto.value =
        entrada.produto;


    selectProduto.addEventListener(
        "change",
        function() {

            const produtoSelecionado =
                produtos.find(function(produto) {

                    return String(
                        produto.codigo
                    ) === String(
                        selectProduto.value
                    );

                });


            if (produtoSelecionado) {

                document.getElementById(
                    "fornecedorEntrada"
                ).value =
                    produtoSelecionado.fornecedor;

            }
        }
    );
}


function salvarEdicaoEntrada(indice) {

    const produto =
        document.getElementById(
            "produtoEntrada"
        ).value;

    const quantidade =
        document.getElementById(
            "quantidadeEntrada"
        ).value;

    const data =
        document.getElementById(
            "dataEntrada"
        ).value;

    const fornecedor =
        document.getElementById(
            "fornecedorEntrada"
        ).value.trim();

    const observacao =
        document.getElementById(
            "observacaoEntrada"
        ).value.trim();


    if (produto === "") {

        alert("Selecione um produto.");

        return;
    }


    if (quantidade === "") {

        alert("Informe a quantidade.");

        return;
    }


    if (Number(quantidade) <= 0) {

        alert(
            "A quantidade deve ser maior que zero."
        );

        return;
    }


    if (data === "") {

        alert("Informe a data da entrada.");

        return;
    }


    if (fornecedor === "") {

        alert("Informe o fornecedor.");

        return;
    }


    entradas[indice] = {

        produto:
            produto,

        quantidade:
            Number(quantidade),

        data:
            data,

        fornecedor:
            fornecedor,

        observacao:
            observacao
    };


    localStorage.setItem(
        "entradas",
        JSON.stringify(entradas)
    );


    alert(
        "Entrada atualizada com sucesso!"
    );


    mostrarEntradas();
}


function excluirEntrada(indice) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta entrada?"
        );


    if (!confirmar) {
        return;
    }


    entradas.splice(
        indice,
        1
    );


    localStorage.setItem(
        "entradas",
        JSON.stringify(entradas)
    );


    alert(
        "Entrada excluída com sucesso!"
    );


    mostrarEntradas();
}


// ==================================================
// ESTOQUE
// ==================================================

function mostrarEstoque() {

    document.querySelector("main").innerHTML = `

        <h2>Estoque</h2>

        <table>

            <thead>

                <tr>
                    <th>Código</th>
                    <th>Produto</th>
                    <th>Estoque Atual</th>
                    <th>Estoque Mínimo</th>
                    <th>Status</th>
                </tr>

            </thead>

            <tbody id="tabelaEstoque"></tbody>

        </table>
    `;


    const tabela =
        document.getElementById(
            "tabelaEstoque"
        );


    produtos.forEach(function(produto) {

        let quantidadeEntradas = 0;
        let quantidadeSaidas = 0;


        entradas.forEach(function(entrada) {

            if (
                String(entrada.produto) ===
                String(produto.codigo)
            ) {

                quantidadeEntradas +=
                    Number(entrada.quantidade);
            }
        });


        saidas.forEach(function(saida) {

            if (
                String(saida.produto) ===
                String(produto.codigo)
            ) {

                quantidadeSaidas +=
                    Number(saida.quantidade);
            }
        });


        const quantidadeEstoque =
            quantidadeEntradas -
            quantidadeSaidas;


        let status = "Normal";


        if (
            quantidadeEstoque <
            Number(produto.estoqueMinimo)
        ) {

            status =
                "⚠️ Estoque baixo";
        }


        tabela.innerHTML += `

            <tr>

                <td>${produto.codigo}</td>

                <td>${produto.nome}</td>

                <td>${quantidadeEstoque}</td>

                <td>${produto.estoqueMinimo}</td>

                <td>${status}</td>

            </tr>
        `;
    });
}


// ==================================================
// SAÍDAS
// ==================================================

function mostrarSaida() {

    document.querySelector("main").innerHTML = `

        <h2>Saída de Produtos</h2>

        <label>Produto:</label>

        <input
            type="text"
            id="pesquisaProdutoSaida"
            placeholder="Digite nome ou código do produto..."
            autocomplete="off"
        >

        <div
            id="resultadoProdutosSaida"
            class="pdv-resultados"
        ></div>

        <div id="produtoSelecionadoSaida"></div>

        <input
            type="hidden"
            id="produtoSaida"
        >

        <label>Quantidade:</label>

        <input
            type="number"
            id="quantidadeSaida"
            min="1"
            step="1"
        >

        <label>Data da saída:</label>

        <input
            type="date"
            id="dataSaida"
        >

        <label>Observação:</label>

        <textarea
            id="observacaoSaida"
        ></textarea>

        <br><br>

        <button onclick="registrarSaida()">
            Registrar Saída
        </button>

        <button onclick="mostrarSaidas()">
            Ver Saídas
        </button>
    `;


    const dataAtual =
        new Date()
            .toISOString()
            .split("T")[0];


    document.getElementById(
        "dataSaida"
    ).value =
        dataAtual;


    document.getElementById(
        "pesquisaProdutoSaida"
    ).addEventListener(
        "input",
        buscarProdutoSaida
    );
}


function buscarProdutoSaida() {

    const campo =
        document.getElementById(
            "pesquisaProdutoSaida"
        );

    const resultado =
        document.getElementById(
            "resultadoProdutosSaida"
        );


    if (!campo || !resultado) {
        return;
    }


    const texto =
        campo.value
            .toLowerCase()
            .trim();


    resultado.innerHTML = "";


    if (texto === "") {
        return;
    }


    const produtosEncontrados =
        produtos.filter(function(produto) {

            const nome =
                String(produto.nome)
                    .toLowerCase();

            const codigo =
                String(produto.codigo)
                    .toLowerCase();


            return (
                nome.includes(texto) ||
                codigo.includes(texto)
            );
        });


    if (
        produtosEncontrados.length === 0
    ) {

        resultado.innerHTML = `

            <div class="pdv-produto-resultado">

                Nenhum produto encontrado.

            </div>

        `;

        return;
    }


    produtosEncontrados.forEach(
        function(produto) {

            let estoque = 0;


            entradas.forEach(function(entrada) {

                if (
                    String(entrada.produto) ===
                    String(produto.codigo)
                ) {

                    estoque +=
                        Number(
                            entrada.quantidade
                        );
                }
            });


            saidas.forEach(function(saida) {

                if (
                    String(saida.produto) ===
                    String(produto.codigo)
                ) {

                    estoque -=
                        Number(
                            saida.quantidade
                        );
                }
            });


            const div =
                document.createElement("div");


            div.className =
                "pdv-produto-resultado";


            div.innerHTML = `

                <strong>
                    ${produto.nome}
                </strong>

                <br>

                <small>
                    Código: ${produto.codigo}
                </small>

                <br>

                <small>
                    Estoque: ${estoque}
                </small>

                <br>

                <small>
                    Preço:
                    R$ ${Number(
                        produto.precoVenda
                    ).toFixed(2)}
                </small>

            `;


            div.addEventListener(
                "click",
                function() {

                    selecionarProdutoSaida(
                        produto.codigo
                    );

                }
            );


            resultado.appendChild(div);

        }
    );
}


function selecionarProdutoSaida(codigo) {

    const produto =
        produtos.find(function(item) {

            return String(item.codigo) ===
                String(codigo);

        });


    if (!produto) {

        alert(
            "Produto não encontrado."
        );

        return;
    }


    document.getElementById(
        "produtoSaida"
    ).value =
        produto.codigo;


    document.getElementById(
        "pesquisaProdutoSaida"
    ).value =
        produto.codigo +
        " - " +
        produto.nome;


    document.getElementById(
        "resultadoProdutosSaida"
    ).innerHTML = "";


    let estoque = 0;


    entradas.forEach(function(entrada) {

        if (
            String(entrada.produto) ===
            String(produto.codigo)
        ) {

            estoque +=
                Number(
                    entrada.quantidade
                );
        }
    });


    saidas.forEach(function(saida) {

        if (
            String(saida.produto) ===
            String(produto.codigo)
        ) {

            estoque -=
                Number(
                    saida.quantidade
                );
        }
    });


    document.getElementById(
        "produtoSelecionadoSaida"
    ).innerHTML = `

        <div class="pdv-produto-selecionado">

            <strong>
                ${produto.nome}
            </strong>

            <span>
                Código: ${produto.codigo}
            </span>

            <br>

            <span>
                Preço de venda:
                R$ ${Number(
                    produto.precoVenda
                ).toFixed(2)}
            </span>

            <br>

            <span>
                Estoque disponível:
                <strong>
                    ${estoque}
                </strong>
                unidades
            </span>

        </div>

    `;
}


function registrarSaida() {

    const produto =
        document.getElementById(
            "produtoSaida"
        ).value;


    const quantidade =
        document.getElementById(
            "quantidadeSaida"
        ).value;


    const data =
        document.getElementById(
            "dataSaida"
        ).value;


    const observacao =
        document.getElementById(
            "observacaoSaida"
        ).value.trim();


    if (produto === "") {

        alert(
            "Selecione um produto."
        );

        return;
    }


    if (quantidade === "") {

        alert(
            "Informe a quantidade."
        );

        return;
    }


    if (Number(quantidade) <= 0) {

        alert(
            "A quantidade deve ser maior que zero."
        );

        return;
    }


    if (data === "") {

        alert(
            "Informe a data da saída."
        );

        return;
    }


    let quantidadeEstoque = 0;


    entradas.forEach(function(entrada) {

        if (
            String(entrada.produto) ===
            String(produto)
        ) {

            quantidadeEstoque +=
                Number(
                    entrada.quantidade
                );
        }
    });


    saidas.forEach(function(saida) {

        if (
            String(saida.produto) ===
            String(produto)
        ) {

            quantidadeEstoque -=
                Number(
                    saida.quantidade
                );
        }
    });


    if (
        Number(quantidade) >
        quantidadeEstoque
    ) {

        alert(

            "Estoque insuficiente.\n\n" +

            "Estoque disponível: " +
            quantidadeEstoque

        );

        return;
    }


    const saida = {

        produto:
            produto,

        quantidade:
            Number(quantidade),

        data:
            data,

        observacao:
            observacao
    };


    saidas.push(saida);


    localStorage.setItem(
        "saidas",
        JSON.stringify(saidas)
    );


    alert(
        "Saída registrada com sucesso!"
    );


    mostrarSaida();
}


function mostrarSaidas() {

    document.querySelector("main").innerHTML = `

        <h2>Saídas Registradas</h2>

        <button onclick="mostrarSaida()">
            + Nova Saída
        </button>

        <table>

            <thead>

                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Data</th>
                    <th>Observação</th>
                    <th>Ações</th>
                </tr>

            </thead>

            <tbody id="tabelaSaidas"></tbody>

        </table>
    `;


    const tabela =
        document.getElementById(
            "tabelaSaidas"
        );


    if (saidas.length === 0) {

        tabela.innerHTML = `

            <tr>

                <td colspan="5">
                    Nenhuma saída registrada.
                </td>

            </tr>

        `;

        return;
    }


    saidas.forEach(function(saida, indice) {

        const produtoEncontrado =
            produtos.find(function(produto) {

                return String(
                    produto.codigo
                ) === String(
                    saida.produto
                );

            });


        let nomeProduto =
            saida.produto;


        if (produtoEncontrado) {

            nomeProduto =
                produtoEncontrado.codigo +
                " - " +
                produtoEncontrado.nome;
        }


        tabela.innerHTML += `

            <tr>

                <td>
                    ${nomeProduto}
                </td>

                <td>
                    ${saida.quantidade}
                </td>

                <td>
                    ${saida.data}
                </td>

                <td>
                    ${saida.observacao || "-"}
                </td>

                <td>

                    <button
                        onclick="editarSaida(${indice})"
                    >
                        ✏️
                    </button>

                    <button
                        onclick="excluirSaida(${indice})"
                    >
                        🗑️
                    </button>

                </td>

            </tr>
        `;
    });
}


function editarSaida(indice) {

    const saida =
        saidas[indice];


    if (!saida) {

        alert(
            "Saída não encontrada."
        );

        return;
    }


    document.querySelector("main").innerHTML = `

        <h2>Editar Saída</h2>

        <label>Produto:</label>

        <select id="produtoSaida">

            <option value="">
                Selecione um produto
            </option>

        </select>


        <label>Quantidade:</label>

        <input
            type="number"
            id="quantidadeSaida"
            min="1"
            step="1"
            value="${saida.quantidade}"
        >


        <label>Data da saída:</label>

        <input
            type="date"
            id="dataSaida"
            value="${saida.data}"
        >


        <label>Observação:</label>

        <textarea
            id="observacaoSaida"
        >${saida.observacao || ""}</textarea>


        <br><br>


        <button
            onclick="salvarEdicaoSaida(${indice})"
        >
            Salvar Alterações
        </button>

        <button onclick="mostrarSaidas()">
            Cancelar
        </button>
    `;


    const selectProduto =
        document.getElementById(
            "produtoSaida"
        );


    produtos.forEach(function(produto) {

        selectProduto.innerHTML += `

            <option value="${produto.codigo}">
                ${produto.codigo} - ${produto.nome}
            </option>

        `;
    });


    selectProduto.value =
        saida.produto;
}


function salvarEdicaoSaida(indice) {

    const produto =
        document.getElementById(
            "produtoSaida"
        ).value;


    const quantidade =
        document.getElementById(
            "quantidadeSaida"
        ).value;


    const data =
        document.getElementById(
            "dataSaida"
        ).value;


    const observacao =
        document.getElementById(
            "observacaoSaida"
        ).value.trim();


    if (produto === "") {

        alert(
            "Selecione um produto."
        );

        return;
    }


    if (quantidade === "") {

        alert(
            "Informe a quantidade."
        );

        return;
    }


    if (Number(quantidade) <= 0) {

        alert(
            "A quantidade deve ser maior que zero."
        );

        return;
    }


    if (data === "") {

        alert(
            "Informe a data da saída."
        );

        return;
    }


    let quantidadeEstoque = 0;


    entradas.forEach(function(entrada) {

        if (
            String(entrada.produto) ===
            String(produto)
        ) {

            quantidadeEstoque +=
                Number(
                    entrada.quantidade
                );
        }
    });


    saidas.forEach(
        function(saida, indiceSaida) {

            if (
                indiceSaida !== indice &&
                String(saida.produto) ===
                String(produto)
            ) {

                quantidadeEstoque -=
                    Number(
                        saida.quantidade
                    );
            }
        }
    );


    if (
        Number(quantidade) >
        quantidadeEstoque
    ) {

        alert(

            "Estoque insuficiente.\n\n" +

            "Estoque disponível para esta alteração: " +
            quantidadeEstoque

        );

        return;
    }


    saidas[indice] = {

        produto:
            produto,

        quantidade:
            Number(quantidade),

        data:
            data,

        observacao:
            observacao,

        ...(saidas[indice].numeroVenda
            ? {
                numeroVenda:
                    saidas[indice].numeroVenda
            }
            : {})
    };


    localStorage.setItem(
        "saidas",
        JSON.stringify(saidas)
    );


    alert(
        "Saída atualizada com sucesso!"
    );


    mostrarSaidas();
}


function excluirSaida(indice) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta saída?"
        );


    if (!confirmar) {
        return;
    }


    saidas.splice(
        indice,
        1
    );


    localStorage.setItem(
        "saidas",
        JSON.stringify(saidas)
    );


    alert(
        "Saída excluída com sucesso!"
    );


    mostrarSaidas();
}


// ==================================================
// VENDAS
// ==================================================

function mostrarVendas() {

    document.querySelector("main").innerHTML = `

        <h2>Vendas</h2>

        <button onclick="novaVenda()">
            + Nova Venda
        </button>

        <button onclick="mostrarHistoricoVendas()">
            Ver Vendas
        </button>
    `;
}


function novaVenda() {

    itensVenda = [];


    const numerosVendas =
        vendas
            .map(function(venda) {
                return Number(venda.numero);
            })
            .filter(function(numero) {
                return !isNaN(numero) && numero > 0;
            });


    const proximoNumero =
        numerosVendas.length > 0
            ? Math.max(...numerosVendas) + 1
            : vendas.length + 1;


    const numeroFormatado =
        String(proximoNumero).padStart(4, "0");


    document.querySelector("main").innerHTML = `

        <h2>
            🧾 Nova Venda #${numeroFormatado}
        </h2>

        <p style="color:#666;">
            Venda em andamento
        </p>


        <div class="pdv">


            <div class="pdv-produtos">

                <h3>
                    🔎 Selecionar Produto
                </h3>


                <input
                    type="text"
                    id="pesquisaProdutoVenda"
                    class="pdv-pesquisa"
                    placeholder="Digite nome ou código do produto..."
                    autocomplete="off"
                >


                <div
                    id="resultadoProdutosVenda"
                    class="pdv-resultados"
                ></div>


                <div
                    id="estoqueDisponivelVenda"
                ></div>


                <input
                    type="hidden"
                    id="produtoVenda"
                >


                <div class="pdv-quantidade">

                    <input
                        type="number"
                        id="quantidadeVenda"
                        min="1"
                        step="1"
                        placeholder="Quantidade"
                    >


                    <button
                        onclick="adicionarProdutoVenda()"
                    >
                        ➕ Adicionar
                    </button>

                </div>


                <button
                    onclick="mostrarVendas()"
                >
                    ❌ Cancelar Venda
                </button>

            </div>


            <div class="pdv-carrinho">

                <h3>
                    🛒 Carrinho
                </h3>


                <div id="itensVenda">

                    <div style="
                        text-align:center;
                        padding:30px 10px;
                        color:#777;
                    ">

                        Nenhum produto adicionado.

                    </div>

                </div>


                <div class="pdv-pagamento">

                    <label>
                        Forma de pagamento:
                    </label>


                    <select id="formaPagamento">

                        <option value="">
                            Selecione
                        </option>

                        <option value="Dinheiro">
                            Dinheiro
                        </option>

                        <option value="Pix">
                            Pix
                        </option>

                        <option value="Cartão de débito">
                            Cartão de débito
                        </option>

                        <option value="Cartão de crédito">
                            Cartão de crédito
                        </option>

                    </select>

                </div>

            </div>

        </div>
    `;


    // PESQUISA DA VENDA

    document.getElementById(
        "pesquisaProdutoVenda"
    ).addEventListener(
        "input",
        buscarProdutoVenda
    );
}


function selecionarProdutoVenda(codigo) {

    const produto =
        produtos.find(function(item) {

            return String(item.codigo) ===
                String(codigo);

        });


    if (!produto) {

        alert(
            "Produto não encontrado."
        );

        return;
    }


    document.getElementById(
        "produtoVenda"
    ).value =
        produto.codigo;


    document.getElementById(
        "pesquisaProdutoVenda"
    ).value =
        produto.codigo +
        " - " +
        produto.nome;


    document.getElementById(
        "resultadoProdutosVenda"
    ).innerHTML = "";


    let estoque = 0;


    entradas.forEach(function(entrada) {

        if (
            String(entrada.produto) ===
            String(produto.codigo)
        ) {

            estoque +=
                Number(
                    entrada.quantidade
                );
        }
    });


    saidas.forEach(function(saida) {

        if (
            String(saida.produto) ===
            String(produto.codigo)
        ) {

            estoque -=
                Number(
                    saida.quantidade
                );
        }
    });


    itensVenda.forEach(function(item) {

        if (
            String(item.produto) ===
            String(produto.codigo)
        ) {

            estoque -=
                Number(
                    item.quantidade
                );
        }
    });


    document.getElementById(
        "estoqueDisponivelVenda"
    ).innerHTML = `

        <div class="pdv-produto-selecionado">

            <strong>
                ${produto.nome}
            </strong>

            <span>
                Código: ${produto.codigo}
            </span>

            <br>

            <span>
                Preço:
                R$ ${Number(
                    produto.precoVenda
                ).toFixed(2)}
            </span>

            <br>

            <span>
                Estoque disponível:
                <strong>
                    ${estoque}
                </strong>
                unidades
            </span>

        </div>
    `;
}


// ==================================================
// PESQUISAR PRODUTO NA VENDA
// ==================================================

function buscarProdutoVenda() {

    const campo =
        document.getElementById(
            "pesquisaProdutoVenda"
        );


    const resultado =
        document.getElementById(
            "resultadoProdutosVenda"
        );


    if (!campo || !resultado) {
        return;
    }


    const texto =
        campo.value
            .toLowerCase()
            .trim();


    resultado.innerHTML = "";


    if (texto === "") {
        return;
    }


    const produtosEncontrados =
        produtos.filter(function(produto) {

            const nome =
                String(produto.nome)
                    .toLowerCase();


            const codigo =
                String(produto.codigo)
                    .toLowerCase();


            return (
                nome.includes(texto) ||
                codigo.includes(texto)
            );
        });


    if (
        produtosEncontrados.length === 0
    ) {

        resultado.innerHTML = `

            <div class="pdv-produto-resultado">

                🔎

                <strong>
                    Nenhum produto encontrado.
                </strong>

            </div>
        `;

        return;
    }


    produtosEncontrados.forEach(
        function(produto) {

            let estoque = 0;


            entradas.forEach(function(entrada) {

                if (
                    String(entrada.produto) ===
                    String(produto.codigo)
                ) {

                    estoque +=
                        Number(
                            entrada.quantidade
                        );
                }
            });


            saidas.forEach(function(saida) {

                if (
                    String(saida.produto) ===
                    String(produto.codigo)
                ) {

                    estoque -=
                        Number(
                            saida.quantidade
                        );
                }
            });


            itensVenda.forEach(function(item) {

                if (
                    String(item.produto) ===
                    String(produto.codigo)
                ) {

                    estoque -=
                        Number(
                            item.quantidade
                        );
                }
            });


            const div =
                document.createElement("div");


            div.className =
                "pdv-produto-resultado";


            div.innerHTML = `

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:15px;
                ">

                    <div>

                        <div style="
                            font-size:16px;
                            font-weight:bold;
                            margin-bottom:5px;
                        ">

                            ${produto.nome}

                        </div>

                        <div style="
                            color:#666;
                            font-size:13px;
                        ">

                            Código:
                            ${produto.codigo}

                        </div>

                    </div>


                    <div style="
                        text-align:right;
                        white-space:nowrap;
                    ">

                        <div style="
                            font-size:16px;
                            font-weight:bold;
                        ">

                            R$
                            ${Number(
                                produto.precoVenda
                            ).toFixed(2)}

                        </div>


                        <div style="
                            color:#666;
                            font-size:13px;
                            margin-top:4px;
                        ">

                            Estoque:
                            <strong>
                                ${estoque}
                            </strong>

                        </div>

                    </div>

                </div>
            `;


            div.addEventListener(
                "click",
                function() {

                    selecionarProdutoVenda(
                        produto.codigo
                    );

                }
            );


            resultado.appendChild(div);
        }
    );
}


// ==================================================
// ADICIONAR PRODUTO À VENDA
// ==================================================

function adicionarProdutoVenda() {

    const produto =
        document.getElementById(
            "produtoVenda"
        ).value;


    const quantidade =
        document.getElementById(
            "quantidadeVenda"
        ).value;


    if (produto === "") {

        alert(
            "Selecione um produto."
        );

        return;
    }


    if (quantidade === "") {

        alert(
            "Informe a quantidade."
        );

        return;
    }


    if (Number(quantidade) <= 0) {

        alert(
            "A quantidade deve ser maior que zero."
        );

        return;
    }


    const produtoEncontrado =
        produtos.find(function(item) {

            return String(item.codigo) ===
                String(produto);

        });


    if (!produtoEncontrado) {

        alert(
            "Produto não encontrado."
        );

        return;
    }


    let estoqueAtual = 0;


    entradas.forEach(function(entrada) {

        if (
            String(entrada.produto) ===
            String(produto)
        ) {

            estoqueAtual +=
                Number(
                    entrada.quantidade
                );
        }
    });


    saidas.forEach(function(saida) {

        if (
            String(saida.produto) ===
            String(produto)
        ) {

            estoqueAtual -=
                Number(
                    saida.quantidade
                );
        }
    });


    itensVenda.forEach(function(item) {

        if (
            String(item.produto) ===
            String(produto)
        ) {

            estoqueAtual -=
                Number(
                    item.quantidade
                );
        }
    });


    if (
        Number(quantidade) >
        estoqueAtual
    ) {

        alert(

            "Estoque insuficiente!\n\n" +

            "Disponível: " +
            estoqueAtual +

            "\nSolicitado: " +
            quantidade

        );

        return;
    }


    const itemExistente =
        itensVenda.find(function(item) {

            return String(item.produto) ===
                String(produto);

        });


    if (itemExistente) {

        itemExistente.quantidade +=
            Number(quantidade);

    } else {

        itensVenda.push({

            produto:
                produto,

            nome:
                produtoEncontrado.nome,

            quantidade:
                Number(quantidade),

            preco:
                Number(
                    produtoEncontrado.precoVenda
                )
        });
    }


    mostrarItensVenda();


    document.getElementById(
        "produtoVenda"
    ).value = "";


    document.getElementById(
        "pesquisaProdutoVenda"
    ).value = "";


    document.getElementById(
        "quantidadeVenda"
    ).value = "";


    document.getElementById(
        "resultadoProdutosVenda"
    ).innerHTML = "";


    document.getElementById(
        "estoqueDisponivelVenda"
    ).innerHTML = "";
}


// ==================================================
// MOSTRAR ITENS DA VENDA
// ==================================================

function mostrarItensVenda() {

    const area =
        document.getElementById(
            "itensVenda"
        );


    let totalVenda = 0;


    if (itensVenda.length === 0) {

        area.innerHTML = `

            <div style="
                margin-top:20px;
                padding:20px;
                text-align:center;
                border:1px solid #ddd;
                border-radius:8px;
                background:#f9f9f9;
            ">

                <p>
                    Nenhum produto adicionado à venda.
                </p>

            </div>
        `;

        return;
    }


    itensVenda.forEach(function(item) {

        totalVenda +=
            Number(item.quantidade) *
            Number(item.preco);

    });


    let tabela = `

        <div style="
            margin-top:25px;
            overflow-x:auto;
        ">

            <table>

                <thead>

                    <tr>

                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço Unitário</th>
                        <th>Total</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>
    `;


    itensVenda.forEach(function(item, indice) {

        const totalItem =
            Number(item.quantidade) *
            Number(item.preco);


        tabela += `

            <tr>

                <td>
                    ${item.nome}
                </td>

                <td>
                    ${item.quantidade}
                </td>

                <td>
                    R$ ${Number(
                        item.preco
                    ).toFixed(2)}
                </td>

                <td>
                    R$ ${totalItem.toFixed(2)}
                </td>

                <td>

                    <button
                        onclick="editarItemVenda(${indice})"
                    >
                        ✏️
                    </button>

                    <button
                        onclick="removerItemVenda(${indice})"
                    >
                        🗑️
                    </button>

                </td>

            </tr>
        `;
    });


    tabela += `

                </tbody>

            </table>

        </div>


        <div class="pdv-total">

            <span>
                Total da Venda:
            </span>

            <span>
                R$ ${totalVenda.toFixed(2)}
            </span>

        </div>


        <button
            class="pdv-finalizar"
            onclick="finalizarVenda()"
        >
            💰 Finalizar Venda
        </button>
    `;


    area.innerHTML =
        tabela;
}


// ==================================================
// EDITAR ITEM DA VENDA
// ==================================================

function editarItemVenda(indice) {

    const item =
        itensVenda[indice];


    if (!item) {

        alert(
            "Item não encontrado."
        );

        return;
    }


    const novaQuantidade =
        prompt(
            "Informe a nova quantidade:",
            item.quantidade
        );


    if (novaQuantidade === null) {
        return;
    }


    if (!/^\d+$/.test(novaQuantidade)) {

        alert(
            "Informe apenas números."
        );

        return;
    }


    if (Number(novaQuantidade) <= 0) {

        alert(
            "A quantidade deve ser maior que zero."
        );

        return;
    }


    const quantidadeNova =
        Number(novaQuantidade);


    let quantidadeEntradas = 0;
    let quantidadeSaidas = 0;


    entradas.forEach(function(entrada) {

        if (
            String(entrada.produto) ===
            String(item.produto)
        ) {

            quantidadeEntradas +=
                Number(
                    entrada.quantidade
                );
        }
    });


    saidas.forEach(function(saida) {

        if (
            String(saida.produto) ===
            String(item.produto)
        ) {

            quantidadeSaidas +=
                Number(
                    saida.quantidade
                );
        }
    });


    const estoqueDisponivel =
        quantidadeEntradas -
        quantidadeSaidas;


    if (
        quantidadeNova >
        estoqueDisponivel
    ) {

        alert(

            "Estoque insuficiente!\n\n" +

            "Estoque disponível: " +
            estoqueDisponivel +

            "\nQuantidade informada: " +
            quantidadeNova

        );

        return;
    }


    itensVenda[indice].quantidade =
        quantidadeNova;


    mostrarItensVenda();
}


// ==================================================
// REMOVER ITEM DA VENDA
// ==================================================

function removerItemVenda(indice) {

    const item =
        itensVenda[indice];


    if (!item) {

        alert(
            "Item não encontrado."
        );

        return;
    }


    const confirmar =
        confirm(

            "Deseja remover este produto da venda?\n\n" +

            item.nome +

            "\nQuantidade: " +
            item.quantidade

        );


    if (!confirmar) {
        return;
    }


    itensVenda.splice(
        indice,
        1
    );


    mostrarItensVenda();
}


// ==================================================
// FINALIZAR VENDA
// ==================================================

function finalizarVenda() {

    const formaPagamento =
        document.getElementById(
            "formaPagamento"
        ).value;


    if (formaPagamento === "") {

        alert(
            "Selecione a forma de pagamento."
        );

        return;
    }


    if (itensVenda.length === 0) {

        alert(
            "Adicione pelo menos um produto à venda."
        );

        return;
    }


    for (
        let i = 0;
        i < itensVenda.length;
        i++
    ) {

        const item =
            itensVenda[i];


        let estoqueDisponivel = 0;


        entradas.forEach(function(entrada) {

            if (
                String(entrada.produto) ===
                String(item.produto)
            ) {

                estoqueDisponivel +=
                    Number(
                        entrada.quantidade
                    );
            }
        });


        saidas.forEach(function(saida) {

            if (
                String(saida.produto) ===
                String(item.produto)
            ) {

                estoqueDisponivel -=
                    Number(
                        saida.quantidade
                    );
            }
        });


        if (
            item.quantidade >
            estoqueDisponivel
        ) {

            alert(

                "Estoque insuficiente para " +
                item.nome +

                ".\n\n" +

                "Estoque disponível: " +
                estoqueDisponivel +

                "\nQuantidade solicitada: " +
                item.quantidade

            );

            return;
        }
    }


    const numerosVendas =
        vendas
            .map(function(venda) {
                return Number(venda.numero);
            })
            .filter(function(numero) {

                return (
                    !isNaN(numero) &&
                    numero > 0
                );

            });


    const proximoNumero =
        numerosVendas.length > 0
            ? Math.max(...numerosVendas) + 1
            : vendas.length + 1;


    const venda = {

        numero:
            proximoNumero,

        data:
            new Date()
                .toISOString()
                .split("T")[0],

        formaPagamento:
            formaPagamento,

        itens:
            itensVenda.map(function(item) {

                return {

                    produto:
                        item.produto,

                    nome:
                        item.nome,

                    quantidade:
                        item.quantidade,

                    preco:
                        item.preco
                };

            }),

        total:
            itensVenda.reduce(
                function(total, item) {

                    return total +
                        (
                            item.quantidade *
                            item.preco
                        );

                },
                0
            )
    };


    vendas.push(venda);


    localStorage.setItem(
        "vendas",
        JSON.stringify(vendas)
    );


    venda.itens.forEach(function(item) {

        saidas.push({

            produto:
                item.produto,

            quantidade:
                item.quantidade,

            data:
                venda.data,

            observacao:
                "Venda #" +
                String(
                    venda.numero
                ).padStart(4, "0"),

            numeroVenda:
                venda.numero
        });
    });


    localStorage.setItem(
        "saidas",
        JSON.stringify(saidas)
    );


    alert(
        "Venda registrada com sucesso!"
    );


    itensVenda = [];


    mostrarVendas();
}


// ==================================================
// HISTÓRICO DE VENDAS
// ==================================================

function mostrarHistoricoVendas() {

    document.querySelector("main").innerHTML = `

        <h2>Vendas Registradas</h2>

        <button onclick="mostrarVendas()">
            Voltar
        </button>

        <table>

            <thead>

                <tr>

                    <th>Venda</th>
                    <th>Data</th>
                    <th>Itens</th>
                    <th>Pagamento</th>
                    <th>Total</th>
                    <th>Ações</th>

                </tr>

            </thead>

            <tbody id="tabelaVendas"></tbody>

        </table>
    `;


    const tabela =
        document.getElementById(
            "tabelaVendas"
        );


    if (vendas.length === 0) {

        tabela.innerHTML = `

            <tr>

                <td colspan="6">
                    Nenhuma venda registrada.
                </td>

            </tr>
        `;

        return;
    }


    vendas.forEach(function(venda, indice) {

        let quantidadeItens = 0;


        venda.itens.forEach(function(item) {

            quantidadeItens +=
                Number(
                    item.quantidade
                );
        });


        tabela.innerHTML += `

            <tr>

                <td>
                    #${String(
                        venda.numero ||
                        indice + 1
                    ).padStart(4, "0")}
                </td>

                <td>
                    ${venda.data}
                </td>

                <td>
                    ${quantidadeItens}
                </td>

                <td>
                    ${venda.formaPagamento || "-"}
                </td>

                <td>
                    R$ ${Number(
                        venda.total
                    ).toFixed(2)}
                </td>

                <td>

                    <button
                        onclick="verDetalhesVenda(${indice})"
                    >
                        👁️
                    </button>

                    <button
                        onclick="excluirVenda(${indice})"
                    >
                        🗑️
                    </button>

                </td>

            </tr>
        `;
    });
}


// ==================================================
// DETALHES DA VENDA
// ==================================================

function verDetalhesVenda(indice) {

    const venda =
        vendas[indice];


    if (!venda) {

        alert(
            "Venda não encontrada."
        );

        return;
    }


    document.querySelector("main").innerHTML = `

        <h2>
            Detalhes da Venda
            #${String(
                venda.numero ||
                indice + 1
            ).padStart(4, "0")}
        </h2>


        <p>
            <strong>Data:</strong>
            ${venda.data}
        </p>


        <p>
            <strong>Forma de pagamento:</strong>
            ${venda.formaPagamento || "-"}
        </p>


        <table>

            <thead>

                <tr>

                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Total</th>

                </tr>

            </thead>


            <tbody id="tabelaDetalhesVenda"></tbody>

        </table>


        <h3>
            Total da Venda:
            R$ ${Number(
                venda.total
            ).toFixed(2)}
        </h3>


        <button onclick="mostrarHistoricoVendas()">
            Voltar
        </button>
    `;


    const tabela =
        document.getElementById(
            "tabelaDetalhesVenda"
        );


    venda.itens.forEach(function(item) {

        const totalItem =
            Number(item.quantidade) *
            Number(item.preco);


        tabela.innerHTML += `

            <tr>

                <td>
                    ${item.nome}
                </td>

                <td>
                    ${item.quantidade}
                </td>

                <td>
                    R$ ${Number(
                        item.preco
                    ).toFixed(2)}
                </td>

                <td>
                    R$ ${totalItem.toFixed(2)}
                </td>

            </tr>
        `;
    });
}


// ==================================================
// EXCLUIR VENDA
// ==================================================

function excluirVenda(indice) {

    const venda =
        vendas[indice];


    if (!venda) {

        alert(
            "Venda não encontrada."
        );

        return;
    }


    const numeroVenda =
        venda.numero;


    const confirmar =
        confirm(

            "Deseja realmente excluir a venda #" +

            String(
                numeroVenda
            ).padStart(4, "0") +

            "?\n\n" +

            "Essa ação também devolverá " +
            "os produtos ao estoque."

        );


    if (!confirmar) {
        return;
    }


    saidas =
        saidas.filter(function(saida) {

            return (
                saida.numeroVenda !==
                numeroVenda
            );
        });


    vendas.splice(
        indice,
        1
    );


    localStorage.setItem(
        "vendas",
        JSON.stringify(vendas)
    );


    localStorage.setItem(
        "saidas",
        JSON.stringify(saidas)
    );


    alert(
        "Venda excluída com sucesso!"
    );


    mostrarHistoricoVendas();
}


// ==================================================
// DASHBOARD
// ==================================================

function mostrarDashboard() {

    let totalVendas = 0;

    let vendasPorDia = {};


    vendas.forEach(function(venda) {

        totalVendas +=
            Number(
                venda.total
            );


        if (!vendasPorDia[venda.data]) {

            vendasPorDia[venda.data] =
                0;
        }


        vendasPorDia[venda.data] +=
            Number(
                venda.total
            );
    });


    const quantidadeVendas =
        vendas.length;


    const quantidadeProdutos =
        produtos.length;


    let valorEstoque = 0;

    let produtosEstoqueBaixo = 0;

    let listaEstoqueBaixo = [];


    produtos.forEach(function(produto) {

        let quantidadeEntradas = 0;

        let quantidadeSaidas = 0;


        entradas.forEach(function(entrada) {

            if (
                String(entrada.produto) ===
                String(produto.codigo)
            ) {

                quantidadeEntradas +=
                    Number(
                        entrada.quantidade
                    );
            }
        });


        saidas.forEach(function(saida) {

            if (
                String(saida.produto) ===
                String(produto.codigo)
            ) {

                quantidadeSaidas +=
                    Number(
                        saida.quantidade
                    );
            }
        });


        const estoqueAtual =
            quantidadeEntradas -
            quantidadeSaidas;


        valorEstoque +=
            estoqueAtual *
            Number(
                produto.precoCusto
            );


        if (
            estoqueAtual <
            Number(
                produto.estoqueMinimo
            )
        ) {

            produtosEstoqueBaixo++;


            listaEstoqueBaixo.push({

                nome:
                    produto.nome,

                estoque:
                    estoqueAtual,

                minimo:
                    Number(
                        produto.estoqueMinimo
                    )
            });
        }
    });


    document.querySelector("main").innerHTML = `

        <h2>Dashboard</h2>


        <div class="dashboard-cards">


            <div class="dashboard-card">

                <h3>
                    Produtos Cadastrados
                </h3>

                <p>
                    ${quantidadeProdutos}
                </p>

            </div>


            <div class="dashboard-card">

                <h3>
                    Valor do Estoque
                </h3>

                <p>
                    R$ ${valorEstoque.toFixed(2)}
                </p>

            </div>


            <div class="dashboard-card">

                <h3>
                    Total em Vendas
                </h3>

                <p>
                    R$ ${totalVendas.toFixed(2)}
                </p>

            </div>


            <div class="dashboard-card">

                <h3>
                    Quantidade de Vendas
                </h3>

                <p>
                    ${quantidadeVendas}
                </p>

            </div>


            <div class="dashboard-card">

                <h3>
                    Produtos com Estoque Baixo
                </h3>

                <p>
                    ${produtosEstoqueBaixo}
                </p>

            </div>

        </div>


        <div class="dashboard-card">

            <h3>
                Lista de Estoque Baixo
            </h3>


            <table>

                <thead>

                    <tr>

                        <th>Produto</th>
                        <th>Estoque</th>
                        <th>Mínimo</th>

                    </tr>

                </thead>


                <tbody>

                    ${
                        listaEstoqueBaixo
                            .slice(0, 5)
                            .map(function(item) {

                                return `

                                    <tr>

                                        <td>
                                            ${item.nome}
                                        </td>

                                        <td>
                                            ${item.estoque}
                                        </td>

                                        <td>
                                            ${item.minimo}
                                        </td>

                                    </tr>

                                `;

                            })
                            .join("")
                    }

                </tbody>

            </table>

        </div>


        <div class="dashboard-card">

            <h3>
                Vendas por Dia
            </h3>


            <canvas
                id="graficoVendas"
            ></canvas>

        </div>
    `;


    const canvas =
        document.getElementById(
            "graficoVendas"
        );


    const ctx =
        canvas.getContext("2d");


    const todasAsDatas =
        Object.keys(
            vendasPorDia
        );


    const ultimasDatas =
        todasAsDatas.slice(-7);


    const datas =
        ultimasDatas;


    const valores =
        datas.map(function(data) {

            return vendasPorDia[data];

        });


    canvas.width = 700;
    canvas.height = 300;


    if (datas.length === 0) {

        ctx.font =
            "16px Arial";


        ctx.fillText(

            "Ainda não existem vendas para mostrar.",

            20,
            40

        );

        return;
    }


    const maiorValor =
        Math.max(...valores);


    ctx.font =
        "12px Arial";


    for (
        let i = 0;
        i <= 4;
        i++
    ) {

        const valor =
            (maiorValor / 4) * i;


        const y =
            250 -
            (220 / 4) * i;


        ctx.fillText(

            "R$ " +
            valor.toFixed(2),

            5,
            y
        );
    }


    for (
        let i = 0;
        i <= 4;
        i++
    ) {

        const y =
            250 -
            (220 / 4) * i;


        ctx.beginPath();


        ctx.moveTo(
            40,
            y
        );


        ctx.lineTo(
            680,
            y
        );


        ctx.stroke();
    }


    const larguraBarra = 50;

    const espacamento = 30;


    datas.forEach(function(data, indice) {

        const altura =
            maiorValor > 0
                ? (
                    valores[indice] /
                    maiorValor
                ) * 220
                : 0;


        const x =
            50 +
            indice *
            (
                larguraBarra +
                espacamento
            );


        const y =
            250 -
            altura;


        ctx.fillRect(

            x,
            y,
            larguraBarra,
            altura

        );


        ctx.font =
            "12px Arial";


        ctx.fillText(

            data,

            x,
            270

        );


        ctx.fillText(

            "R$ " +
            valores[indice].toFixed(2),

            x - 10,
            y - 10

        );
    });
}