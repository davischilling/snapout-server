# Definição das metas do usuário

## Referências

<https://www.hipertrofia.org/blog/2019/04/29/calculadora-de-macros/#results>
<https://www.omnicalculator.com/health>

> ## Dados do Usuário

* gender: "M" / "F"
* age
* height
* objective
  * type: "Bulking - 1 / 2 / 3" / "Cutting - 1 / 2 / 3" / "maintain"
  * macroNutrientsRatio: fat, carbohydrate, protein
  * amountInGramsOfTheDay: fat, carbohydrate, protein
  * basalMetabolicRate
  * physicalActivityLevel: 1 / 2 / 3 / 4 / 5 / 6
  * totalCaloriesForTheDay
  * currentBodyFat
  * currentHeight
  * initialDate
  * finalDate

create objective: POST -> api/users/:id/objectives

(Fluxo após login/cadastro)

> ## Fluxo Primário: Usuário sabe o bodyFat

1. Usuário informa: sexo, idade, altura, peso, percentual de gordura (se souber)
2. App calcula a taxa metabolica basal com a fórmula Katch-McArdle (ver **fórmula Katch-McArdle**)
3. Usuário informa o seu nível de atividade física (ver **Níveis de atividade física**)
4. App calcula o gasto energético total diário com a fórmula TDEE (ver **TDEE fórmula**)
5. Usuário informa seu objetivo com a dieta -> Bulking, Cutting ou manter peso (ver **Subcategorias dos objetivos**)
6. Usuário informa as proporções de macronutrientes -> Proteína e gordura (ver **proporções de macronutrientes**)
7. App calcula as seguintes informações do objetivo -> quantidade em gramas de proteína e gordura para um dia e o total de calorias que devem ser consumidas em um dia
8. Usuário confirma o objetivo com seus respectivos valores
9. App pergunta de quanto em quanto tempo o objetivo deve ser revisado
10. Usuário escolhe entre as opções: Semanal, duas semanas ou mensal

> ## Fluxo Alternativo1: Usuário não sabe bodyFat

...
2. App calcula a taxa metabolica basal com a fórmula Mifflin St Jeor (ver **fórmula Mifflin St Jeor**)
3. -> 3. Fluxo Primário

> ## Fluxo Alternativo2: Usuário não confirma informações do objetivo e deseja fazer alterações

...
8. Usuário clica em alterar objetivo
9. Usuário edita as proporções de macronutrientes -> Proteína e gordura (ver **proporções de macronutrientes**)
10. -> 7. Fluxo Primário

### Proporções de macronutrientes

* Proteína -> 1.6 - 2.2
* Gordura -> 0.5 - 1.2

### Conversão de macronutientes g -> kcal

* Proteína -> x4
* Gordura -> x9
* Carbohidrato -> x4

### Katch-McArdle formula para calcular a taxa metabolica basal COM o percentual de gordura fornecido -> BMR (basal metabolic rate)

* Calcula a quantidade de massa magra
  > LBM = (Weight[kg] * (100 - Body Fat %)/100
* Com a massa magra calcula a taxa metabolica basal
  > BMR = 370 + (21.6 * Lean Body Mass[kg])

### Mifflin St Jeor formula para calcular a taxa metabolica basal SEM o percentual de gordura -> BMR (basal metabolic rate)

* Calcula a taxa metabolica basal
  > BMR (kcal / day) = 10 *weight (kg) + 6.25* height (cm) – 5 * age (y) + s (kcal / day),
  > where s is +5 for males and -161 for females.

### Níveis de atividade física

* physical activity level - PAL:
  > pouco / nenhum exercício (estilo de vida sedentário): 1.2,
  > exercícios leves 1-2 vezes / semana: 1.375,
  > exercício moderado 2-3 vezes / semana: 1.55,
  > exercício pesado 4-5 vezes / semana: 1.725,
  > trabalho físico ou exercício pesado de 6 a 7 vezes / semana: 1.9,
  > atleta profissional: 2.4.

### TDEE fórmula para calcular o gasto energético total diário

* Calculo do gasto energético total diário
  > TDEE (kcal/day) = BMR * PAL

### Subcategorias dos objetivos

* Bulking
  > Limpo (5% de superávit calórico) - Recomendado
  > Tradicional (10% de superávit calórico)
  > Sujo (15% de superávit calórico)

* Cutting
  > 220g a 250g por semana - Recomendado
  > 500g por semana
  > Até 1kg por semana

* Manter peso
  > Sem subcategorias
