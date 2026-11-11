# Weather

Aplicativo de previsão do tempo com busca de cidades, clima atual e previsão para os próximos 5 dias, usando a API do [OpenWeather](https://openweathermap.org/api).

🔗 **Demo:** https://myweathercities.netlify.app

## Funcionalidades

- Busca de cidades com sugestões (debounce, navegação por teclado e cancelamento de requisições antigas)
- Botão "usar minha localização" (Geolocation API)
- Clima atual com ícone e fundo de acordo com a condição e com dia/noite no fuso da cidade
- Detalhes do dia: sensação térmica, chance de chuva, vento (km/h) e umidade
- Previsão de 5 dias agrupada por dia (mínima, máxima e condição predominante)
- Estados de carregamento (skeleton) e de erro com opção de tentar novamente
- Layout responsivo; links compartilháveis (`/weather?lat=..&lon=..&name=..`)

## Stack

React 18 · TypeScript · Redux Toolkit (`createAsyncThunk`) · React Router · Axios · Tailwind CSS · Framer Motion · Vite

## Estrutura

```
src/
  lib/weatherApi.ts     # chamadas à API e normalização dos dados
  lib/visuals.ts        # código de ícone da API -> ilustração e fundo
  lib/format.ts         # datas no fuso horário da cidade
  features/weatherSlice.ts
  components/           # SearchBox, CurrentWeatherCard, TodayDetails, Forecast, Logo
  pages/                # Home e Weather
```

## Rodando localmente

1. Crie uma chave gratuita em https://home.openweathermap.org/api_keys
2. Crie o arquivo `.env.local` na raiz:

   ```bash
   VITE_APP_ID=sua_chave_aqui
   ```

3. Instale e rode:

   ```bash
   npm install
   npm run dev
   ```

> A chave fica embutida no bundle do front-end (é uma app 100% client-side), então use uma chave do plano gratuito, sem dados de cobrança.
