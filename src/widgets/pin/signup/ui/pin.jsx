import { PinInput } from "@telegram-apps/telegram-ui";
import { observer } from "mobx-react-lite";

export const SingUpPinWidget = observer(
  ({ value = [], onChange, label = "" }) => {
    return (
      <PinInput value={value} onChange={onChange} label={label} pinCount={4} />
    );
  }
);
