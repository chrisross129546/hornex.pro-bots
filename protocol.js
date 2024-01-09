const getRandomIdentifier = () => crypto.randomUUID();

export let publicIdentifier = 0;
export const generateInitialiserPacket = () => {
    const identifier = getRandomIdentifier();
    const { length } = identifier;
    
    const buffer = new ArrayBuffer(3 + length);
    const view = new DataView(buffer);
    let offset = 0;
    
    view.setUint8(offset, 0);
    offset += 1;
    
    view.setUint16(offset, 237);
    offset += 2;
    
    for (let index = 0, { length } = identifier; index < length; index++)
        view.setUint8(offset++, identifier.charCodeAt(length - index - 1) ^ 237);
    
    publicIdentifier = view.getUint8(3 + 237 % length);
    
    // const u8 = new Uint8Array(buffer);
    //
    // for (let index = 0, { length } = u8; index < length; index++)
    //     u8[index] ^= publicIdentifier;
    //
    // const mod = 237 % u8.length;
    // const first = u8[0];
    //
    // u8[0] = u8[mod];
    // u8[mod] = first;
    
    return view;
};