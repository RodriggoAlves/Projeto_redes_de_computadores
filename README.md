# 🌐 Projeto de Redes: Visualizador de Resolução DNS

## 💡 Ideia Central
Desenvolver uma **aplicação web educacional** que demonstra, de forma interativa, o **processo de resolução de nomes do Sistema de Nomes de Domínio (DNS)** passo a passo.

A ferramenta permitirá ao usuário compreender como o DNS converte um nome de domínio (como `www.exemplo.com`) em um endereço IP, revelando visualmente as consultas que ocorrem nos bastidores.

---

## 🎯 Objetivo
O objetivo principal é **desmistificar o funcionamento do DNS**, mostrando de forma didática e visual o fluxo completo das consultas, desde o servidor raiz até o servidor autoritativo, culminando na obtenção do endereço IP final.

---

## ⚙️ Funcionalidades Principais

### 1. 🧭 Interface do Usuário
- Campo de entrada simples para o usuário digitar o nome de domínio a ser resolvido.
- Botão para iniciar o processo de resolução.
- Área visual interativa (ou de log) exibindo as etapas da resolução em tempo real.

### 2. 🔍 Visualização do Processo
O sistema exibirá as etapas de resolução recursiva:

1. **Consulta ao Servidor Raiz (Root Server)**  
   O servidor raiz responde com o endereço do servidor de Top-Level Domain (TLD) apropriado (ex: `.com`, `.org`, `.br`).

2. **Consulta ao Servidor TLD**  
   O servidor TLD fornece o endereço do **servidor autoritativo** para o domínio específico.

3. **Consulta ao Servidor Autoritativo**  
   O servidor autoritativo retorna o **registro final** (ex: Registro A ou AAAA) contendo o **endereço IP** do domínio.

Cada etapa será exibida de forma visual (com setas, animações ou logs explicativos), ajudando o usuário a entender o caminho percorrido.

### 3. 🧾 Exibição do Resultado
- Mostra o(s) endereço(s) IP encontrado(s).
- Pode incluir informações adicionais, como **tempo de resposta**, **cache DNS**, e **TTL (Time To Live)**.

---

## 🧠 Considerações Técnicas

### 🖥️ Frontend
- **Tecnologias:** HTML, CSS e JavaScript.  
- **Função:** Capturar o domínio digitado e exibir visualmente o progresso da resolução DNS.  
- **Interface:** Responsiva, intuitiva e com foco educacional.

### ⚙️ Backend
- **Tecnologia:** Node.js (com biblioteca `dns` ou `dns2`) ou Python (com biblioteca `dnspython`).  
- **Função:** Executar as consultas DNS de baixo nível, retornando ao frontend as etapas e resultados obtidos.  
- **Fluxo:**
  1. Recebe o domínio do frontend via API REST.
  2. Realiza as consultas DNS passo a passo.
  3. Retorna ao frontend um JSON contendo cada etapa e seu resultado.

---

### ⚙️ Link para acesso

https://projeto-redes-de-computadores.vercel.app/

## 📡 Fluxo de Operação (Resumo)
1. Usuário digita um domínio → `frontend`.
2. Frontend envia a requisição ao backend.
3. Backend realiza:
   - Consulta ao servidor raiz;
   - Consulta ao TLD;
   - Consulta ao servidor autoritativo.
4. Backend retorna as informações passo a passo.
5. Frontend exibe o processo de forma animada e didática.

---

## 🧩 Possíveis Extensões Futuras
- Exibir outros tipos de registros DNS (MX, CNAME, TXT, etc.).
- Simular falhas de resolução (ex: domínio inexistente).
- Adicionar modo “passo a passo” interativo com explicações teóricas.
- Incluir mapa geográfico dos servidores consultados.

---

