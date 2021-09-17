# Autenticação com facebook

> ## Dados

* Dados do usuário

> ## Fluxo Primário

1. App pergunta quantas dietas diferentes a pessoa deseja por semana (1 - 7)
    - A quantidade de dietas diferentes é limitada de acordo com a quantidade de receitas já cadastradas.
3. Usuário informa quantidade de dietas por semana
2. Usuário informa peso do usuário
4. Usuário informa objetivo
5. Usuário informa lista de produtos e receitas
6. App gera dietas:
    - Margens de calculo da dieta:
        - calorias finais (+-50)
        - fat (0.6 - 1.2)
        - protein (1.4 - 2.2)