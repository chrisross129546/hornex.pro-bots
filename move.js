const TAU = Math.PI * 2;

const getLocalMovement = angle => {
    let encoded = angle % TAU;
    if (encoded < 0) encoded += TAU;
    
    return Math.round(encoded / TAU * 255);
};

const generateMovementAngle = () => {
    const x = Math.floor(Math.random() * 1300) - 1920;
    const y = Math.floor(Math.random() * 910) - 911;
    
    const distance = Math.hypot(x, y);
    const angle = Math.atan2(y, x);
    
    const localMovementAngle = getLocalMovement(distance, angle < 50 ? angle / 100 : 1);
    return [localMovementAngle, angle];
};

export const writeU8Angle = () => {
    const [local, angle] = generateMovementAngle();
    return new Uint8Array([216, local, Math.round(angle * 255)]);
};