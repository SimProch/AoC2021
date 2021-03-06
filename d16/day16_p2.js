import { d16_data } from "./input.js";

// https://adventofcode.com/2021/day/16

function assert(a,b) { 
    if (a !== b) console.error("didnt pass");
};

assert(daySixteen("C200B40A82"), 3);
assert(daySixteen("04005AC33890"), 54);
assert(daySixteen("880086C3E88112"), 7);
assert(daySixteen("CE00C43D881120"), 9);
assert(daySixteen("D8005AC2A8F0"), 1);
assert(daySixteen("F600BC2D8F"), 0);
assert(daySixteen("9C005AC2F8F0"), 0);
assert(daySixteen("9C0141080250320F1802104A08"), 1);
console.log(daySixteen(d16_data));

function daySixteen(hex) {
    const binary = hex2bin(hex);
    const parsed = parsePacket(binary);
    return parsed.value;
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
                children: subPackets,
                length: subPacketsLength + 7 + nextPacketLength
            };
            const value = getPacketValue(packet);
            packet.value = value;
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
                children: subPackets,
                length: subPacketsLength + 7 + nextPacketLength
            };
            const value = getPacketValue(packet);
            packet.value = value;
            return packet;
        }

        function getPacketValue(packet) {
            const { packetTypeId } = packet;
            if (packetTypeId > 4) return getBinaryPacketValue();
            return getNonBinaryPacketValue() ;


            function getBinaryPacketValue() {
                if (packetTypeId === 5) return packet.children[0].value > packet.children[1].value ? 1 : 0;
                if (packetTypeId === 6) return packet.children[0].value < packet.children[1].value ? 1 : 0;
                if (packetTypeId === 7) return packet.children[0].value == packet.children[1].value ? 1 : 0;
            }
            
            function getNonBinaryPacketValue() {
                if (packetTypeId === 0) return packet.children.reduce((x,y) => x + y.value, 0);
                if (packetTypeId === 1) return packet.children.reduce((x,y) => x * y.value, 1);
                if (packetTypeId === 2) return Math.min(...packet.children.map(i => i.value))
                if (packetTypeId === 3) return Math.max(...packet.children.map(i => i.value))
            }

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