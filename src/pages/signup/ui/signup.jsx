import { AuthStoreContext } from "@/entities/auth";
import { useStore } from "@/shared/model";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Spinner } from "@telegram-apps/telegram-ui";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SingUpPinWidget } from "@/widgets/pin/signup";

export const SignUp = observer(() => {
  const initDataRaw = useLaunchParams().initDataRaw;
  const authStore = useStore(AuthStoreContext);
  const [pin, setPin] = useState("");
  const [pinRepeat, setPinRepeat] = useState("");
  const [step, setStep] = useState(1);

  const handleForm = () => {
    if (pin.every((value, index) => value !== pinRepeat[index])) {
      toast.error("Вы неверно повторили пин");
      setPin("");
      setPinRepeat("");
      setStep(1);
      return;
    }

    authStore.signUp(pin, initDataRaw);
  };

  useEffect(() => {
    if (pin.length === 4) {
      setStep(2);
    }
  }, [pin]);

  useEffect(() => {
    if (pinRepeat.length === 4) {
      handleForm();
    }
  }, [pinRepeat]);

  if (authStore.registered === false && step == 1) {
    return (
      <SingUpPinWidget
        value={pin}
        onChange={(e) => setPin(e)}
        label="Придумайте пароль"
      />
    );
  }

  if (authStore.registered === false && step == 2) {
    return (
      <SingUpPinWidget
        value={pinRepeat}
        onChange={(e) => setPinRepeat(e)}
        label="Повторите пароль"
      />
    );
  }

  return <Spinner />;
});
