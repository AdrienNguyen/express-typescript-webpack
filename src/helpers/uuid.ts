const { randomBytes } = require('crypto')

let SIZE = 4096,
    IDX = 0,
    BUFFER,
    HEX = []

// HEX = [00 01 02 .... ff]
for (let i = 0; i < 256; i++) {
    HEX[i] = (i + 256).toString(16).substring(1)
}

export const uuid = (): string => {
    if (!BUFFER || IDX + 16 > SIZE) {
        // <Buffer 6d 73 a4 03 ..... > SIZE bytes
        BUFFER = randomBytes(SIZE)
        IDX = 0
    }

    let i = 0,
        tmp,
        out = ''
    for (i = 0; i < 16; i++) {
        tmp = BUFFER[i + IDX]

        if (i == 6) {
            out += HEX[(tmp & 15) | 64]
        } else if (i == 8) {
            out += HEX[(tmp & 63) | 128]
        } else {
            out += HEX[tmp]
        }

        if (i === 3 || i === 5 || i === 7 || i == 9) {
            out += '-'
        }
    }
    IDX++
    return out
}
