import React from "react";
import Modal from "react-responsive-modal";
import "./ConfirmDelet.css";
interface CardConfirmDeletProp {
  open: boolean;
  setOpen: (type: boolean) => void;
  functionExecute: (props: any) => void;
  Possibleidtodelete?: string;
  // DataFromApi?: any | null;
  // openFromEdit?: boolean | null;
}

function CardConfirmDelet({
  open,
  setOpen,
  functionExecute,
  Possibleidtodelete,
}: CardConfirmDeletProp) {
  return (
    <div>
      <Modal
        closeIcon={null}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        classNames={{
          overlay: "customOverlayDelet",
          modal: "customModalDelet",
        }}
      >
        <div className=" bodyDelet">
          Realmente deseja apagar?
          <div className="AreabutonBodyDelet">
            <span
              className="buttonBodyDelet"
              onClick={() => {
                functionExecute(Possibleidtodelete as string | undefined);
              }}
            >
              Confirmar
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CardConfirmDelet;
