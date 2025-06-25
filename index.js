import express from 'express';
const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  const data = req.body?.data;
  if (!data) return res.json({ valid: false, mensagem: "Data não fornecida" });

  const [dia, mes, ano] = data.split('/');
  if (!dia || !mes || !ano) {
    return res.json({ valid: false, mensagem: "Formato inválido" });
  }

  const nascimento = new Date(`${ano}-${mes}-${dia}`);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;

  const valid = idade >= 21;

  return res.json({
    valid,
    idade,
    mensagem: valid ? "Maior de 21 anos" : "Menor de 21 anos"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
