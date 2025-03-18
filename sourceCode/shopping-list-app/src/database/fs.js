import { Filesystem, Directory } from '@capacitor/filesystem';

/*
1. create image folder externally
2. save image method
3. delete image method
4. get image method
*/

const createImageFolder = async () => {
    await Filesystem.mkdir({
        path: 'images',
        directory: Directory.External,
    });
};

const saveImage = async (name, data) => {
    await Filesystem.writeFile({
        path: `images/${name}`,
        directory: Directory.External,
        data,
    });
};

const deleteImage = async (name) => {
    await Filesystem.deleteFile({
        path: `images/${name}`,
        directory: Directory.External,
    });
};

const getImage = async (name) => {
    return await Filesystem.readFile({
        path: `images/${name}`,
        directory: Directory.External,
    });
};

const updateImage = async (name, data) => {
    await Filesystem.writeFile({
        path: `images/${name}`,
        directory: Directory.External,
        data,
    });
};

export { createImageFolder, saveImage, deleteImage, getImage };