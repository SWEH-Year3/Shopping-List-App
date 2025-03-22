import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, Flex } from "@radix-ui/themes";
import { QRCodeSVG } from "qrcode.react";

export default function Share({ openDialog, onOpenChange, object }) {
    const [qrCodeData, setQrCodeData] = useState("");
    useEffect(() => {
        if (object.items) {
            let data = { ...object, items: object.items.map(item => { return { name:item.name, quantity:item.quantity, price: item.price,  description:item.description, checked: item.checked }; })};
        setQrCodeData(JSON.stringify(data));
      }
    else if (object) {
            let data = { ...object , img:''};
        setQrCodeData(JSON.stringify(data));
      }
    }, [object]);
  return (
    <Dialog.Root open={openDialog} onOpenChange={onOpenChange} >
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            inset: 0,
          }}
        />
        <Dialog.Content
          style={{
            maxWidth: "450px",
            zIndex: 10000,
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
            >
            <Dialog.Title></Dialog.Title>
          <Dialog.Description>
            Scan this QR code to share the content.
          </Dialog.Description>
          <Flex direction="column" gap="3" justify={"center"}>
            <QRCodeSVG value={object ? qrCodeData : "No Data"} />
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
