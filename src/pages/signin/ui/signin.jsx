import { AuthStoreContext } from "@/entities/auth";
import { useStore } from "@/shared/model";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SingUpPinWidget } from "@/widgets/pin/signup";

export const SignIn = observer(() => {
  const initDataRaw = useLaunchParams().initDataRaw;
  const authStore = useStore(AuthStoreContext);
  const [pin, setPin] = useState("");

  const handleForm = () => {
    authStore.signIn(pin, initDataRaw, toast);
  };

  useEffect(() => {
    if (pin.length === 4) {
      handleForm();
    }
  }, [pin]);

  return (
    <SingUpPinWidget
      value={pin}
      onChange={(e) => setPin(e)}
      label="Введите пароль"
    />
  );
});
