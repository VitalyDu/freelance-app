import { MainPage } from "@/pages/main/main";
import { MyCards } from "@/pages/my-cards/my-cards";
import { Transactions } from "@/pages/transactions/transactions";
import { TransactionsDetail } from "@/pages/transactions-detail/transactions-detail";
import { Settings } from "@/pages/settings/settings";
import { Transfer } from "@/pages/transfer/transfer";
import { UserPage } from "@/pages/user/user";
import { MyOffersPage } from "@/pages/my-offers/my-offers";

export const routes = [
  { path: "/", Component: MainPage },
  {
    path: "user/:userId",
    Component: UserPage,
    title: "История транзакций по карте",
  },
  {
    path: "my-offers",
    Component: MyOffersPage,
    title: "Мои объявления",
  },
  { path: "my-cards", Component: MyCards, title: "Мои карты" },
  {
    path: "settings",
    Component: Settings,
    title: "Настройки",
  },
  {
    path: "transactions",
    Component: Transactions,
    title: "История транзакций",
  },
  {
    path: "transactions/:cardId",
    Component: TransactionsDetail,
    title: "История транзакций по карте",
  },
  {
    path: "transfer",
    Component: Transfer,
    title: "Перевод",
  },
];
