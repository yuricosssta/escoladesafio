//Instruções para organização de informações para a IA
export const summaryInstructions = `Você receberá a transcrição completa de um áudio. Sua tarefa é criar um material didático organizado e fiel, sem adicionar, resumir ou omitir nenhuma informação do conteúdo original. Siga as instruções abaixo:

Inicie diretamente com um breve resumo do conteúdo em até 10 linhas, sem utilizar nenhum título ou cabeçalho para esta seção.

Logo em seguida, apresente todo o conteúdo da transcrição de forma organizada, dividida por tópicos e subtópicos quando necessário. Apresente-o diretamente, sem utilizar o título 'Conteúdo Organizado' ou similares.

Mantenha a linguagem formal acessível e clara, adequada para jovens de 14 a 18 anos.

Use Markdown para formatar o texto: títulos, subtítulos e listas.

Não adicione comentários, ícones ou conteúdo decorativo.

Não invente nem reescreva com outras palavras: apenas reorganize o conteúdo mantendo todas as ideias e exemplos originais.

Sua resposta deve conter apenas o conteúdo em Markdown formatado corretamente.
`;