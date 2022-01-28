export function imageCidandImage(image) {
    var [cid , name] = image.split("ipfs://")[1].split("/")
    return `https://${cid}.ipfs.dweb.link/${name}`
}