import { formatDate } from "@/utils/dates";
import { List, Section, Timeline, Text } from "@telegram-apps/telegram-ui";
import { useParams } from "react-router-dom";

const history = [
  {
    id: 1090,
    created_date: "2024-10-08T00:24:34.197856Z",
    type: "recharge",
    amount: 100,
    currency: "$",
  },
  {
    id: 1089,
    created_date: "2024-10-07T00:24:34.197856Z",
    type: "recharge",
    amount: 100,
    currency: "$",
  },
  {
    id: 100,
    created_date: "2024-10-04T00:24:34.197856Z",
    type: "recharge",
    amount: 100,
    currency: "$",
  },
  {
    id: 0,
    created_date: "2024-09-16T14:24:34.197856Z",
    type: "recharge",
    amount: 100,
    currency: "$",
  },
  {
    id: 1,
    created_date: "2024-09-15T14:24:34.197856Z",
    type: "withdrawal",
    amount: 10,
    currency: "$",
  },
  {
    id: 2,
    created_date: "2024-09-15T13:24:34.197856Z",
    type: "transfer",
    amount: 10,
    currency: "$",
  },
  {
    id: 3,
    created_date: "2024-09-14T14:24:34.197856Z",
    type: "recharge",
    amount: 10,
    currency: "$",
  },
  {
    id: 4,
    created_date: "2024-09-14T13:24:34.197856Z",
    type: "recharge",
    amount: 10,
    currency: "$",
  },
  {
    id: 5,
    created_date: "2024-09-14T12:24:34.197856Z",
    type: "withdrawal",
    amount: 10,
    currency: "$",
  },
];

const types = {
  recharge: "Пополнение",
  payment: "Оплата",
  transfer: "Перевод",
  fulfillment: "Выполнение",
  withdrawal: "Вывод",
  refund: "Возврат",
  code: "Купон",
  referral: "Реферал",
};

export const TransactionsDetail = () => {
  const { cardId } = useParams();
  const groupedByDate = history.reduce((acc, item) => {
    const formattedDate = formatDate(item.created_date);
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(item);
    return acc;
  }, {});

  return (
    <>
      <List
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Section.Header large>
          {"История операций по карте:" + " " + cardId}
        </Section.Header>
        {/* <Text>История операций по карте: {cardId}</Text> */}
        {Object.keys(groupedByDate).map((date, index) => (
          <Section header={date} key={date}>
            <Timeline active={index + 1}>
              {groupedByDate[date].map((item) => (
                <Timeline.Item header={types[item.type]} key={item.id}>
                  {item.type == "recharge" ? "+" : "-"}
                  {item.amount} {item.currency}
                </Timeline.Item>
              ))}
            </Timeline>
          </Section>
        ))}
      </List>
    </>
  );
};
