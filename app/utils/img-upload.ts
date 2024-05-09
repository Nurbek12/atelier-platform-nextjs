import ImageKit from 'imagekit'

export const imgkit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUB_KEY!,
    privateKey: process.env.IMAGEKIT_PPV_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_END!
})