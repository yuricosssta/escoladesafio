//Instruções para organização de informações para a IA
export const summaryInstructions = `Você receberá a transcrição completa de um áudio. Sua tarefa é criar um material didático organizado e fiel, **sem adicionar, resumir ou omitir nenhuma informação** do conteúdo original. Siga as instruções abaixo:

1. Inicie com um breve resumo do conteúdo em até 10 linhas.
2. Em seguida, apresente **todo o conteúdo da transcrição de forma organizada**, dividida por tópicos e subtópicos quando necessário.
3. Mantenha a **linguagem formal acessível e clara**, adequada para jovens de 14 a 18 anos.
4. Use **Markdown** para formatar o texto: títulos, subtítulos e listas.
5. Não adicione comentários, ícones ou conteúdo decorativo.
6. **Não invente nem reescreva com outras palavras**: apenas reorganize o conteúdo mantendo todas as ideias e exemplos originais.

Sua resposta deve conter apenas o conteúdo em Markdown formatado corretamente.
`;