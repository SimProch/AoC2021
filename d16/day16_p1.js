import { d16_data, d16_test_data, d16_test_data_v2, d16_test_data_v3, d16_test_data_v4, d16_test_data_v5, d16_test_data_v6 } from "./input.js";

// https://adventofcode.com/2021/day/16
function assert(a,b) { 
    if (a !== b) console.error("didnt pass");
};
assert(daySixteen(d16_test_data), 9);
assert(daySixteen(d16_test_data_v2), 14);
assert(daySixteen(d16_test_data_v3), 16);
assert(daySixteen(d16_test_data_v4), 12);
assert(daySixteen(d16_test_data_v5), 23);
assert(daySixteen(d16_test_data_v6), 31);

console.log(daySixteen(d16_data));

function daySixteen(hex) {
    const binary = hex2bin(hex);
    const parsed = parsePacket(binary);
    const versionSum = getPacketVersionSum(parsed, 0);
    return versionSum;
}

function getPacketVersionSum(parsedPacket) {
    if (typeof parsedPacket.value == 'number') return parsedPacket.packetVersion;
    let result = 0;
    parsedPacket.value.forEach(i => {
        result += getPacketVersionSum(i);
    })
    result += parsedPacket.packetVersion
    return result;
}

function parsePacket(binary, maxLengthInBits) {
    const packetVersion = getPacketVersion(binary);
    const packetTypeId = getPacketTypeId(binary);
    const lengthTypeId = getLengthTypeId(binary);
    const packetIsLiteral = packetTypeId === 4
    if (packetIsLiteral) {
        const toParse = binary.slice(6);
        return parseLiteralPacket(toParse);
    }
    const nextPacketLength = lengthTypeId === 1 ? 11 : 15;
    return parseOperatorPacket(maxLengthInBits);

    function parseLiteralPacket(toParse) {
        let resultToParse = "";
        let isLast = toParse === 0;
        let numberOfIterations = 0;
        while (!isLast) {
            const valueToParse = toParse.slice(1, 5);
            isLast = toParse[0] === "0";
            resultToParse += valueToParse;
            toParse = toParse.slice(5);
            numberOfIterations++;
        }
        const result = parseInt(resultToParse, 2);
        const packet = {
            packetVersion,
            packetTypeId,
            lengthTypeId,
            value: result,
            length: numberOfIterations * 5 + 6
        };
        return packet;
    }

    function parseOperatorPacket(maxLengthInBits) {
        const nextPacket = binary.slice(7, 7 + nextPacketLength);
        if (lengthTypeId === 1) return parseWithPacketCount(maxLengthInBits);
        return parseWithPacketLength(maxLengthInBits);


        function parseWithPacketLength(maxLengthInBits) {
            let packetsLength = parseInt(nextPacket.padStart(16, "0"), 2);
            let binaryToParse = binary.slice(7 + nextPacketLength);
            const subPackets = [];
            while (packetsLength > 0 && binary) {
                const maxLength = maxLengthInBits ? Math.min(packetsLength, maxLengthInBits) : packetsLength;
                const packet = parsePacket(binaryToParse, maxLength)
                binaryToParse = binaryToParse.slice(packet.length)
                packetsLength -= packet.length;
                subPackets.push(packet);
                if (maxLengthInBits) {
                    maxLengthInBits -= packet.length;
                    if (maxLengthInBits <= 0) break;
                }
            }
            const subPacketsLength = subPackets.reduce((x, y) => x + y.length, 0)
            const packet = {
                packetVersion,
                packetTypeId,
                lengthTypeId,
                value: subPackets,
                length: subPacketsLength + 7 + nextPacketLength
            };
            return packet;
        }

        function parseWithPacketCount(maxLengthInBits) {
            const numberOfPackets = parseInt(nextPacket, 2);
            let binaryToParse = binary.slice(7 + nextPacketLength);
            const subPackets = [];
            for (let i = 0; i < numberOfPackets; i++) {
                const packet = parsePacket(binaryToParse, maxLengthInBits)
                binaryToParse = binaryToParse.slice(packet.length)
                subPackets.push(packet);
                if (maxLengthInBits) {
                    maxLengthInBits -= packet.length;
                    if (maxLengthInBits <= 0) break;
                }
            }
            const subPacketsLength = subPackets.reduce((x, y) => x + y.length, 0)
            const packet = {
                packetVersion,
                packetTypeId,
                lengthTypeId,
                value: subPackets,
                length: subPacketsLength + 7 + nextPacketLength
            };
            return packet;
        }
    }
}


function getPacketVersion(binary) {
    const packetVersion = binary.slice(0, 3).padStart(4, "0");
    return parseInt(packetVersion, 2);
}

function getPacketTypeId(binary) {
    const packetVersion = binary.slice(3, 6).padStart(4, "0");
    return parseInt(packetVersion, 2);
}

function getLengthTypeId(binary) {
    return +binary.slice(6, 7);
}

function hex2bin(hex) {
    let result = "";
    hex.split("").forEach(i => result += parseInt(i, 16).toString(2).padStart(4, "0"))
    return result
}