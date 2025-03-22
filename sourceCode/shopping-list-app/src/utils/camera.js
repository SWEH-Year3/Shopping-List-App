import { Camera , CameraResultType} from '@capacitor/camera';

/*
1. take photo into base64 string
2. take normal photo for qrcode scanning
*/

export async function takeItemPhoto() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
    });

    return image.base64String;
}

export async function takeQrcodePhoto() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
    });

    return image.webPath;
}
