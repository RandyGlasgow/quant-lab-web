import { API_URL } from "@/constants/endpoints";

export const getEodTopStocks = async () => {
  return await fetch(
    `${API_URL}/eod/latest?symbols=MSFT,AAPL,GOOGL,AMZN,FB,TSLA,NVDA,INTC,ADBE,AMD,CRM,ORCL,IBM,ACN,AVGO,SHOP,UBER,LYFT,SNAP,SPOT,ROKU,DIS,CMCSA,FOXA,DISCA,VIAC,AMC,GME,PLTR,SNOW,DOCU,CRWD,NET,DDOG,ZM,OKTA,COIN,UPST`
  );
};
