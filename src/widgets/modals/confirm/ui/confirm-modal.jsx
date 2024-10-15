import * as Dialog from "@radix-ui/react-dialog";
import { Modal, Placeholder } from "@telegram-apps/telegram-ui";
import styles from "./confirm-modal.module.css";

export const ConfirmModal = ({
  isActive,
  setIsActive,
  title,
  description,
  children,
}) => {
  return (
    <Modal
      onOpenChange={(e) => setIsActive(e)}
      open={isActive}
      header={<Modal.Header></Modal.Header>}
    >
      <Placeholder
        action={<div className={styles.actions}>{children}</div>}
        description={<Dialog.Description>{description}</Dialog.Description>}
        header={<Dialog.Title>{title}</Dialog.Title>}
      ></Placeholder>
    </Modal>
  );
};
