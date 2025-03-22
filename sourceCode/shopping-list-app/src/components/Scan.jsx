import React, { useRef, useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Flex, Button } from "@radix-ui/themes";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";

export default function Scan({ openDialog, onOpenChange, objectSetter }) {
  const [scannedData, setScannedData] = useState("");
  const [scannerActive, setScannerActive] = useState(false);
  const readerRef = useRef(null);
  const scannerRef = useRef(null);
  const fileInputCameraRef = useRef(null);
  const fileInputGalleryRef = useRef(null);

  // --- Camera scanning functions ---
  const startScanner = () => {
    if (!readerRef.current) return;
    if (scannerActive) return; // already scanning

    const scanner = new Html5QrcodeScanner(readerRef.current.id, {
      fps: 10,
      qrbox: 250,
    });
    scannerRef.current = scanner;
    setScannerActive(true);

    scanner.render(
      (decodedText) => {
        setScannedData(decodedText);
        handleScanSuccess(decodedText);
      },
      (errorMessage) => {
        console.log("QR Code Scan Error:", errorMessage);
      }
    );
  };

  const stopScanner = () => {
    if (!scannerRef.current) return;
    scannerRef.current
      .clear()
      .then(() => {
        scannerRef.current = null;
        setScannerActive(false);
        console.log("Camera scanning stopped.");
      })
      .catch((err) => {
        console.error("Error stopping scanner:", err);
      });
  };

  const handleScanSuccess = (decodedText) => {
    try {
      const parsed = JSON.parse(decodedText);
      objectSetter(parsed);
    } catch (err) {
      console.error("JSON parse error:", err);
    //   objectSetter(decodedText, true);
    }
    // Optionally stop scanning after a successful scan
    stopScanner();
  };

  // --- File scanning function ---
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      // Create a raw Html5Qrcode instance for scanning a file
      const html5QrCode = new Html5Qrcode("reader-file");
      const result = await html5QrCode.scanFile(file, true);
      console.log("Scanned from file:", result);
      setScannedData(result);
      handleScanSuccess(result);
      // Cleanup instance
      html5QrCode.clear();
    } catch (error) {
      console.error("Error scanning file:", error);
    }
  };

  // --- Handlers for file inputs ---
  const handleCameraFileClick = () => {
    if (fileInputCameraRef.current) {
      fileInputCameraRef.current.value = null; // reset
      fileInputCameraRef.current.click();
    }
  };

  const handleGalleryFileClick = () => {
    if (fileInputGalleryRef.current) {
      fileInputGalleryRef.current.value = null;
      fileInputGalleryRef.current.click();
    }
  };

  // --- Cleanup on dialog close ---
  const handleDialogClose = (isOpen) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      stopScanner();
    }
  };

  // --- Render the Dialog and scanner container ---
  return (
    <Dialog.Root open={openDialog} onOpenChange={handleDialogClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            inset: 0,
            zIndex: 9998,
          }}
        />
        <Dialog.Content
          style={{
            zIndex: 9999,
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            position: "fixed",
            width: "90%",
            maxWidth: "450px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Dialog.Title style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            Scan QR Code
          </Dialog.Title>
          <Dialog.Description style={{ marginBottom: "3rem" }}>
            Choose a method to scan the QR code.
          </Dialog.Description>
          <Flex direction="column" gap="3" justify="center">
            {/* Container for camera scanning */}
            <div
              id="reader"
              ref={readerRef}
              style={{
                width: "100%",
                height: scannerActive ? "320px" : "0px",
                transition: "height 0.3s ease",
                overflow: "hidden",
                border: scannerActive ? "1px solid #ccc" : "none",
                borderRadius: "8px",
                marginBottom: scannerActive ? "1rem" : "0",
              }}
            ></div>

            {/* Hidden div for file scanning (used by Html5Qrcode.scanFile) */}
            <div id="reader-file" style={{ display: "none" }}></div>

            
            {/* Buttons for camera and file scanning */}
                      {/* <Button hidden={true} onClick={startScanner} color="violet" variant="soft" style={{position: "relative"}}>
              {scannerActive ? "Scanning..." : "Request Camera"}
            </Button> */}

           
            <Button onClick={handleCameraFileClick} color="gray" variant="soft" style={{position: "relative" , marginBottom: "1rem"}}>
              Take Photo (Camera)
            </Button>
            
            <Button
              onClick={handleGalleryFileClick}
              color="gray"
            variant="soft"
            style={{position: "relative"}}
            >
              Choose from Gallery
            </Button>

            {/* Two hidden file inputs: one for camera capture, one for gallery */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputCameraRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputGalleryRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// import React, { useRef, useState } from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Flex } from "@radix-ui/themes";
// import { Html5QrcodeScanner } from "html5-qrcode";

// export default function Scan({ openDialog, onOpenChange, objectSetter }) {
//   const [scannedData, setScannedData] = useState("");
//   const readerRef = useRef(null); // Reference to the div inside the Dialog
//   const scannerRef = useRef(null); // Keep track of the scanner instance

//   // Called after the dialog content is mounted, but before focus is moved
//   const handleOpenAutoFocus = (event) => {
//     // If you don't want to move focus, you could do event.preventDefault();
//     if (!readerRef.current) return;

//     // Create and render the scanner
//     const scanner = new Html5QrcodeScanner(readerRef.current.id, {
//       fps: 10,
//       qrbox: 250,
//     });
//     scannerRef.current = scanner;

//     scanner.render(
//       (decodedText) => {
//         setScannedData(decodedText);
//         try {
//           const parsed = JSON.parse(decodedText);
//           objectSetter(parsed, true);
//         } catch (e) {
//           console.error("JSON parse error:", e);
//         }
//         // Optionally stop scanning after a successful scan
//         scanner
//           .clear()
//           .then(() => {
//             console.log("Scanning stopped.");
//           })
//           .catch((err) => {
//             console.error("Unable to stop scanning", err);
//           });
//       },
//       (errorMessage) => {
//         console.log("QR Code Scan Error:", errorMessage);
//       }
//     );
//   };

//   // Called when the dialog is closed or unmounted
//   const handleDialogClose = (open) => {
//     onOpenChange(open); // Pass the new state to the parent if needed

//     if (!open && scannerRef.current) {
//       // Stop and clear the scanner
//       scannerRef.current
//         .clear()
//         .then(() => {
//           scannerRef.current = null;
//         })
//         .catch((err) => {
//           console.error("Error stopping scanner:", err);
//         });
//     }
//   };

//   return (
//     <Dialog.Root open={openDialog} onOpenChange={handleDialogClose}>
//       <Dialog.Portal>
//         <Dialog.Overlay
//           style={{
//             background: "rgba(0, 0, 0, 0.5)",
//             position: "fixed",
//             inset: 0,
//           }}
//         />
//         <Dialog.Content
//           forceMount
//           onOpenAutoFocus={handleOpenAutoFocus}
//           style={{
//             maxWidth: "850px",
//             zIndex: 10000,
//             backgroundColor: "white",
//             borderRadius: "8px",
//             padding: "10px",
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         >
//           <Dialog.Title>Scan QR Code</Dialog.Title>
//           <Dialog.Description>
//             Scan this QR code to get the content.
//           </Dialog.Description>
//           <Flex direction="column" gap="3" justify="center">
//             {/* Div inside the dialog, guaranteed to exist when onOpenAutoFocus runs */}
//             <div
//               id="reader"
//               ref={readerRef}
//               style={{ width: "100%", height: "400px" }}
//             ></div>
//           </Flex>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }
